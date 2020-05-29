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
  editOpen: false,
  selectedIndex: -1,
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
    setSelectedIndex: (state, action) => ({
      ...state,
      selectedIndex: action.payload,
    }),
    setEditOpen: (state, action) => ({ ...state, editOpen: action.payload }),
    openEdit: (state, action) => ({ ...state }),
  },
});

export const {
  getNotes,
  setNotes,
  setSelectedIndex,
  setEditOpen,
  openEdit,
} = notesSlice.actions;

const notesReducer = notesSlice.reducer;
export default notesReducer;

//########################################################################
//############################# SAGAS ####################################
//########################################################################

export function* openEditSaga(action) {
  const index = action.payload;
  console.log(index, action);
  try {
    yield put({ type: setSelectedIndex.type, payload: index });
    yield put({ type: setEditOpen.type, payload: true });
  } catch (err) {
    console.log(err);
  }
}

export function* getNotesSaga() {
  try {
    const notes = yield call(NotesApi.fetchNotes);
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
function* watchOpenEdit() {
  try {
    yield takeLatest(openEdit.type, openEditSaga);
  } catch (e) {
    console.log(e);
  }
}

export function* watchNotes() {
  yield all([watchGetNotes(), watchOpenEdit()]);
}

//########################################################################
//########################### SELECTORS ##################################
//########################################################################

export const getNotesSelect = state => state.notes.notes;
