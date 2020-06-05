import { combineReducers } from 'redux';
import { createAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { delay, takeEvery } from 'redux-saga';
import {
  fork,
  call,
  put,
  spawn,
  take,
  select,
  all,
  takeLatest,
} from 'redux-saga/effects';
import * as loginApi from '../api/login';
import history from '../router/history';

//INITIAL STATE

const initialState = {
  loginSuccess: false,
  loginError: '',
  registerError: '',
  finishedLoading: false,
};

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
  },
});

export const {
  login,
  setLoginSuccess,
  setLoginError,
  setRegisterError,
  register,
  checkAuthenticated,
  setFinishedLoading,
} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;

//########################################################################
//############################# SAGAS ####################################
//########################################################################

export function* checkAuthenticatedSaga() {
  const res = yield call(loginApi.checkAuthenticated);
  console.log('cjecl auht, ', res);
  //if authenticated, redirect to main content page
  if (res.redirect) {
    history.push(res.redirect);
  } else yield put(setFinishedLoading.type, true);
}

export function* loginSaga(action) {
  try {
    const { username, password } = action.payload;
    const res = yield call(loginApi.login, username, password);
    if (!res.error) {
      yield put({ type: setLoginError.type, payload: '' });
      history.push('/notes');
      //yield put({ type: setLoginSuccess.type, payload: true });
    } else {
      yield put({ type: setLoginError.type, payload: res.message });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* registerSaga(action) {
  try {
    const { username, password, passwordRepeat } = action.payload;
    const res = yield call(
      loginApi.register,
      username,
      password,
      passwordRepeat
    );
    if (!res.error) {
      yield put({ type: setRegisterError.type, payload: '' });
      history.push('/login');
      console.log(url);
      //yield put({ type: setLoginSuccess.type, payload: true });
    } else {
      yield put({ type: setRegisterError.type, payload: res.message });
    }
  } catch (err) {
    console.log(err);
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
  ]);
}

//########################################################################
//########################### SELECTORS ##################################
//########################################################################
