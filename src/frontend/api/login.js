const URL_BASE = 'http://localhost:3000/';

const params = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const checkAuthenticated = () =>
  fetch(`${URL_BASE}login`, params)
    .then(res => res.json())
    .catch(err => console.log(err));

export const login = (username, password) =>
  fetch(`${URL_BASE}login`, {
    ...params,
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const logout = () =>
  fetch(`${URL_BASE}logout`, {
    ...params,
    method: 'POST',
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const register = (username, password, passwordRepeat) =>
  fetch(`${URL_BASE}register`, {
    ...params,
    method: 'POST',
    body: JSON.stringify({ username, password, passwordRepeat }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
