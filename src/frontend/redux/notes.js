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
import * as NotesApi from '../api/notes';

const initialState = {
  notes: [],
};

//########################################################################
//############################ REDUCERS ##################################
//########################################################################

const notesSlice = createSlice({
  name: 'notes',
  initialState: initialState,
  reducers: {
    getNotes: state => state,
    setNotes: (state, action) => ({ ...state, notes: action.payload }),
    /*setName: (state, action) => 
      ({...state, name: action.payload })
    ,*/
  },
});

export const { getNotes, setNotes } = notesSlice.actions;

const notesReducer = notesSlice.reducer;
export default notesReducer;

//########################################################################
//############################# SAGAS ####################################
//########################################################################

export function* getNotesSaga() {
  try {
    const notes = yield call(NotesApi.fetchNotes);
    console.log('luikauksella getnotes saga')
    yield put({ type: setNotes.type, payload: notes });
  } catch (err) {
    console.log(err);
  }
}

//########################################################################
//############################ WATCHERS ##################################
//########################################################################

function* watchGetNotes() {
  try {
    yield takeLatest(getNotes.type, getNotesSaga);
    /*while (true) {
    console.log('so saga get name neithwr');
    /*
    const {fullName} = yield take(actions.LOAD_MORE_STARGAZERS)
    yield fork(loadStargazers, fullName, true)
    
    const { name } = yield take(GET_NAME);
    yield fork(getNameSagan, name);
  }*/
  } catch (e) {
    console.log(e);
  }
}

export function* watchNotes() {
  yield all([watchGetNotes()]);
}

//########################################################################
//########################### SELECTORS ##################################
//########################################################################

export const getNotesSelect = state => state.notes.notes;
