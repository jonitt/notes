const params = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
}

const baseUrl = process.env.SERVER_URL + 'api/v1/'

export const fetchNotes = () =>
  fetch(`${baseUrl}notes`, params)
    .then(res => res.json())
    .catch(err => console.log(err))

export const deleteNote = id =>
  fetch(`${baseUrl}notes/${id}`, {
    ...params,
    method: 'DELETE',
    body: JSON.stringify({ id }),
  })
    .then(res => res.json())
    .catch(err => console.log(err))

export const addNote = (note, date, info) =>
  fetch(`${baseUrl}notes`, {
    ...params,
    method: 'POST',
    body: JSON.stringify({ note, date, info }),
  })
    .then(res => res.json())
    .catch(err => console.log(err))

export const editNote = (note, date, info, id) =>
  fetch(`${baseUrl}notes/${id}`, {
    ...params,
    method: 'PUT',
    body: JSON.stringify({ note, date, info }),
  })
    .then(res => res.json())
    .catch(err => console.log(err))
