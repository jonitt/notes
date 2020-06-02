const URL_BASE = 'http://localhost:3000/';

export const fetchNotes = () =>
  fetch(`${URL_BASE}notes`, { mode: 'cors' })
    .then(res => res.json())
    .catch(err => console.log(err));

export const deleteNote = id =>
  fetch(`${URL_BASE}notes/${id}`, {
    mode: 'cors',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const addNote = (note, date, info) =>
  fetch(`${URL_BASE}notes`, {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({ note, date, info }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const editNote = (note, date, info, id) =>
  fetch(`${URL_BASE}notes/${id}`, {
    mode: 'cors',
    method: 'PUT',
    body: JSON.stringify({ note, date, info }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err));
