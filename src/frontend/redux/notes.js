import { createSlice } from '@reduxjs/toolkit'
import { call, put, select, all, takeLatest } from 'redux-saga/effects'
import * as notesApi from '../api/notes'
import history from '../router/history'

//INITIAL STATE

const initialState = {
  notes: [],
  editOpen: false,
  selectedIndex: -1,
  finishedLoading: false,
}

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
    setFinishedLoading: (state, action) => ({
      ...state,
      finishedLoading: action.payload,
    }),
  },
})

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
  setFinishedLoading,
} = notesSlice.actions

const notesReducer = notesSlice.reducer
export default notesReducer

//########################################################################
//############################# SAGAS ####################################
//########################################################################

export function* submitNoteSaga(action) {
  try {
    const { note, date, info, id } = action.payload
    let notes = yield select(getNotesSelect)
    if (id) {
      const index = yield select(getSelectedIndexSelect)
      yield call(notesApi.editNote, note, date, info, id)
      let newNotes = notes.slice(0, index)
      newNotes.push({ note, date, info, id })
      newNotes = newNotes.concat(notes.slice(index + 1))
      yield put({ type: setNotes.type, payload: newNotes })
    } else {
      yield call(notesApi.addNote, note, date, info)
      yield put({ type: getNotes.type })
    }
    yield put({ type: setSelectedIndex.type, payload: -1 })
    yield put({ type: setEditOpen.type, payload: false })
  } catch (err) {
    console.log(err)
  }
}

export function* deleteNoteSaga(action) {
  try {
    const index = action.payload
    let notes = yield select(getNotesSelect)

    const note = notes[index]
    notes = notes.slice(0, index).concat(notes.slice(index + 1))
    yield call(notesApi.deleteNote, note.id)
    yield put({ type: setNotes.type, payload: notes })
    yield put({ type: setSelectedIndex.type, payload: -1 })
    yield put({ type: setEditOpen.type, payload: false })
  } catch (err) {
    console.log(err)
  }
}

export function* addNoteSaga() {
  try {
    yield put({ type: setEditOpen.type, payload: false })
  } catch (err) {
    console.log(err)
  }
}

export function* openEditSaga(action) {
  try {
    const index = action.payload
    if (index >= 0) {
      yield put({ type: setSelectedIndex.type, payload: index })
    } else {
      yield put({ type: setSelectedIndex.type, payload: -1 })
    }
    yield put({ type: setEditOpen.type, payload: true })
  } catch (err) {
    console.log(err)
  }
}

export function* closeEditSaga() {
  try {
    yield put({ type: setSelectedIndex.type, payload: -1 })
    yield put({ type: setEditOpen.type, payload: false })
  } catch (err) {
    console.log(err)
  }
}

export function* getNotesSaga() {
  try {
    const res = yield call(notesApi.fetchNotes)
    if (res.redirect) {
      //history.push(res.redirect)
    } else {
      yield put({ type: setNotes.type, payload: res.notes })
      yield put({ type: setFinishedLoading.type, payload: true })
    }
  } catch (err) {
    console.log(err)
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
  ])
}

//########################################################################
//########################### SELECTORS ##################################
//########################################################################

export const getNotesSelect = state => state.notes.notes
export const getSelectedIndexSelect = state => state.notes.selectedIndex
