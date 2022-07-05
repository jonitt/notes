import { all } from 'redux-saga/effects'
import { watchNotes } from './notes'
import { watchAuth } from './auth'

export default function* rootSaga() {
  yield all([watchNotes(), watchAuth()])
}
