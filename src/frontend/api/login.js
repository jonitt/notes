const URL_BASE = 'http://localhost:3000/';

export const login = (username, password) =>
  fetch(`${URL_BASE}login`, {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const register = (username, password, passwordRepeat) =>
  fetch(`${URL_BASE}register`, {
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify({ username, password, passwordRepeat }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .catch(err => console.log(err));
