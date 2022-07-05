import { createSlice } from '@reduxjs/toolkit'
import { call, put, all, takeLatest } from 'redux-saga/effects'
import * as loginApi from '../api/login'
import history from '../router/history'
import { setFinishedLoading as notesSetFinishedLoading } from './notes'

const initialState = {
  loginSuccess: false,
  loginError: '',
  registerError: '',
  finishedLoading: false,
}

//########################################################################
//############################ REDUCERS ##################################
//########################################################################

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: state => state,
    setLoginSuccess: (state, action) => ({
      ...state,
      loginSuccess: action.payload,
    }),
    setLoginError: (state, action) => ({
      ...state,
      loginError: action.payload,
    }),
    setRegisterError: (state, action) => ({
      ...state,
      registerError: action.payload,
    }),
    register: (state, action) => ({
      ...state,
    }),
    checkAuthenticated: state => ({
      ...state,
    }),
    setFinishedLoading: (state, action) => ({
      ...state,
      finishedLoading: action.payload,
    }),
    logout: state => ({
      ...state,
    }),
  },
})

export const {
  login,
  setLoginSuccess,
  setLoginError,
  setRegisterError,
  register,
  checkAuthenticated,
  setFinishedLoading,
  logout,
} = authSlice.actions

const authReducer = authSlice.reducer
export default authReducer

//########################################################################
//############################# SAGAS ####################################
//########################################################################

export function* checkAuthenticatedSaga() {
  const res = yield call(loginApi.checkAuthenticated)
  //if authenticated, redirect to main content page
    console.log("tasdasdasdäääl mä ooon login saga", res)
  if (res.redirect) {
    history.push(res.redirect)
  } else yield put({ type: setFinishedLoading.type, payload: true })
}

export function* loginSaga(action) {
  try {
    const { username, password } = action.payload
    const res = yield call(loginApi.login, username, password)
    if (!res.error) {
      yield put({ type: setLoginError.type, payload: '' })
      history.push('/notes')
      //yield put({ type: setLoginSuccess.type, payload: true });
    } else {
      console.log(res.error)
      yield put({ type: setLoginError.type, payload: res.message })
    }
  } catch (err) {
    console.log(err)
  }
}

export function* logoutSaga() {
  try {
    const res = yield call(loginApi.logout)
    //redirect after log out
    if (res.redirect) {
      yield put({ type: notesSetFinishedLoading.type, payload: false })
      history.push(res.redirect)
    }
  } catch (err) {
    console.log(err)
  }
}

export function* registerSaga(action) {
  try {
    const { username, password, passwordRepeat } = action.payload
    const res = yield call(
      loginApi.register,
      username,
      password,
      passwordRepeat
    )
    if (!res.error) {
      yield put({ type: setRegisterError.type, payload: '' })
      history.push('/login')
    } else {
      yield put({ type: setRegisterError.type, payload: res.message })
    }
  } catch (err) {
    console.log(err)
  }
}

//########################################################################
//############################ WATCHERS ##################################
//########################################################################

export function* watchAuth() {
  yield all([
    takeLatest(checkAuthenticated.type, checkAuthenticatedSaga),
    takeLatest(login.type, loginSaga),
    takeLatest(register.type, registerSaga),
    takeLatest(logout.type, logoutSaga),
  ])
}

//########################################################################
//########################### SELECTORS ##################################
//########################################################################
