const params = {
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
}

const baseUrl = process.env.SERVER_URL + 'api/v1/'

export const checkAuthenticated = () =>
  fetch(`${baseUrl}authenticated`, params)
    .then(res => {console.log(res); return res.json() })
    .catch(err => console.log(err))

export const login = (username, password) =>
  fetch(`${baseUrl}login`, {
    ...params,
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
    .then(res => res.json())
    .catch(err => console.log(err))

export const logout = () =>
  fetch(`${baseUrl}logout`, {
    ...params,
    method: 'POST',
  })
    .then(res => res.json())
    .catch(err => console.log(err))

export const register = (username, password, passwordRepeat) =>
  fetch(`${baseUrl}register`, {
    ...params,
    method: 'POST',
    body: JSON.stringify({ username, password, passwordRepeat }),
  })
    .then(res => res.json())
    .catch(err => console.log(err))
