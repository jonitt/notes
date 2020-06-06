import BASE_URL from '../utils/baseurl';

const params = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const checkAuthenticated = () =>
  fetch(`${BASE_URL}login`, params)
    .then(res => res.json())
    .catch(err => console.log(err));

export const login = (username, password) =>
  fetch(`${BASE_URL}login`, {
    ...params,
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const logout = () =>
  fetch(`${BASE_URL}logout`, {
    ...params,
    method: 'POST',
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export const register = (username, password, passwordRepeat) =>
  fetch(`${BASE_URL}register`, {
    ...params,
    method: 'POST',
    body: JSON.stringify({ username, password, passwordRepeat }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
