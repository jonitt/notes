import BASE_URL from '../utils/baseurl';

const params = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const fetchNotes = () =>
  fetch(`${BASE_URL}notesall`, params)
    .then(res => res.json())
    .catch(err => console.log(err));

export const deleteNote = id =>
  fetch(`${BASE_URL}notes/${id}`, {
    ...params,
    method: 'DELETE',
    body: JSON.stringify({ id }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const addNote = (note, date, info) =>
  fetch(`${BASE_URL}notes`, {
    ...params,
    method: 'POST',
    body: JSON.stringify({ note, date, info }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const editNote = (note, date, info, id) =>
  fetch(`${BASE_URL}notes/${id}`, {
    ...params,
    method: 'PUT',
    body: JSON.stringify({ note, date, info }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
