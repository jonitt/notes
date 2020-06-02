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

const initialState = {};

//########################################################################
//############################ REDUCERS ##################################
//########################################################################

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: state => state,
  },
});

export const { login } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;

//########################################################################
//############################# SAGAS ####################################
//########################################################################

export function* loginSaga(action) {
  try {
    const { username, password } = action.payload;
    const res = yield call(loginApi.login, username, password);
    if (res.success) {
      history.push('/notes');
    }
  } catch (err) {
    console.log(err);
  }
}

//########################################################################
//############################ WATCHERS ##################################
//########################################################################

export function* watchAuth() {
  yield all([takeLatest(login.type, loginSaga)]);
}

//########################################################################
//########################### SELECTORS ##################################
//########################################################################
