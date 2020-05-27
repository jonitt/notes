import { fork, call, put, spawn, take, select, all } from 'redux-saga/effects';
import { watchApp } from './app';
import { watchNotes } from './notes';

export default function* rootSaga() {
  yield all([watchApp(), watchNotes()]);
}
