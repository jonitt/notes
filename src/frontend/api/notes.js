const URL_BASE = 'http://localhost:3000/';

export const fetchNotes = () =>
  fetch(`${URL_BASE}notes`)
    .then(res => res.json())
    .catch(err => console.log(err));
