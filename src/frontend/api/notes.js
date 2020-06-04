const URL_BASE = 'http://localhost:3000/';

const params = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const fetchNotes = () =>
  fetch(`${URL_BASE}notes`, params)
    .then(res => res.json())
    .catch(err => console.log(err));

export const deleteNote = id =>
  fetch(`${URL_BASE}notes/${id}`, {
    ...params,
    method: 'DELETE',
    body: JSON.stringify({ id }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const addNote = (note, date, info) =>
  fetch(`${URL_BASE}notes`, {
    ...params,
    method: 'POST',
    body: JSON.stringify({ note, date, info }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const editNote = (note, date, info, id) =>
  fetch(`${URL_BASE}notes/${id}`, {
    ...params,
    method: 'PUT',
    body: JSON.stringify({ note, date, info }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
