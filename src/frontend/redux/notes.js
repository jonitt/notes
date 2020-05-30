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
    openEdit: state => ({ ...state }),
    closeEdit: state => state,
    deleteNote: (state, action) => ({ ...state }),
    addNote: (state, action) => state,
    submitNote: (state, action) => state,
  },
});

export const {
  getNotes,
  setNotes,
  setSelectedIndex,
  setEditOpen,
  openEdit,
  closeEdit,
  deleteNote,
  addNote,
  submitNote,
} = notesSlice.actions;

const notesReducer = notesSlice.reducer;
export default notesReducer;

//########################################################################
//############################# SAGAS ####################################
//########################################################################

export function* submitNoteSaga(action) {
  try {
    const { note, date, info, id } = action.payload;
    let notes = yield select(getNotesSelect);
    if (id) {
      const index = yield select(getSelectedIndexSelect);
      console.log(
        'HERE THE SHEEET',
        notes.slice(0, index).push({ note, date, info, id })
      );
      yield call(NotesApi.editNote, note, date, info, id);
      let newNotes = notes.slice(0, index);
      newNotes.push({ note, date, info, id });
      newNotes = newNotes.concat(notes.slice(index + 1));
      yield put({ type: setNotes.type, payload: newNotes });
    } else {
      yield call(NotesApi.addNote, note, date, info);
      yield put({ type: getNotes.type });
    }
    yield put({ type: setSelectedIndex.type, payload: -1 });
    yield put({ type: setEditOpen.type, payload: false });
  } catch (err) {
    console.log(err);
  }
}

export function* deleteNoteSaga(action) {
  try {
    const index = action.payload;
    let notes = yield select(getNotesSelect);

    const note = notes[index];
    //notes.splice(index, 1);
    notes = notes.slice(0, index).concat(notes.slice(index + 1));
    yield call(NotesApi.deleteNote, note.id);
    yield put({ type: setNotes.type, payload: notes });
    yield put({ type: setSelectedIndex.type, payload: -1 });
    yield put({ type: setEditOpen.type, payload: false });
  } catch (err) {
    console.log(err);
  }
}

export function* addNoteSaga() {
  try {
    yield put({ type: setEditOpen.type, payload: false });
  } catch (err) {
    console.log(err);
  }
}

export function* openEditSaga(action) {
  try {
    const index = action.payload;
    if (index >= 0) {
      yield put({ type: setSelectedIndex.type, payload: index });
    } else {
      yield put({ type: setSelectedIndex.type, payload: -1 });
    }
    yield put({ type: setEditOpen.type, payload: true });
  } catch (err) {
    console.log(err);
  }
}

export function* closeEditSaga() {
  try {
    yield put({ type: setSelectedIndex.type, payload: -1 });
    yield put({ type: setEditOpen.type, payload: false });
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

export function* watchNotes() {
  yield all([
    takeLatest(submitNote.type, submitNoteSaga),
    takeLatest(getNotes.type, getNotesSaga),
    takeLatest(openEdit.type, openEditSaga),
    takeLatest(closeEdit.type, closeEditSaga),
    takeLatest(deleteNote.type, deleteNoteSaga),
  ]);
}

//########################################################################
//########################### SELECTORS ##################################
//########################################################################

export const getNotesSelect = state => state.notes.notes;
export const getSelectedIndexSelect = state => state.notes.selectedIndex;
