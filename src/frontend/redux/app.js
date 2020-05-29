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

const initialState = {
  name: 'Bob',
};

//########################################################################
//############################ REDUCERS ##################################
//########################################################################

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    getName: state => state,
    setName: (state, action) => 
      ({...state, name: action.payload })
    ,
  },
});

export const { getName, setName } = appSlice.actions;
/*
export const getName = createAction('app/GET_NAME');
export const setName = createAction('app/SET_NAME');

export const nameReducer = createReducer(0, {
  [getName]: state => state,
  [setName]: (name, state) => ({ ...state, name }),
});
*/
/*
export const nameReducer = (state = initialState, action) => {
  //console.log('reducer called', action);
  switch (action.type) {
    case getName.type:
      return { ...state };
    case setName.type:
      return { ...state, name: action.payload.name };
    default:
      return initialState;
  }
};
*/
/*
export const appReducer = combineReducers({
  nameReducer,
});*/

const appReducer = appSlice.reducer;
export default appReducer;

//########################################################################
//############################# SAGAS ####################################
//########################################################################


export function* getNameSaga() {
  // const asd = yield select(actions.getName);
  const asd = yield select(getNameSelect);
  console.log(asd);
}

export function* setNameSaga() {
  // const asd = yield select(actions.getName);
  const asd = yield select(getNameSelect);
  console.log(asd);
}

//########################################################################
//############################ WATCHERS ##################################
//########################################################################

function* watchGetName() {
  try {
    yield takeLatest(getName.type, getNameSaga);
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
function* watchSetName() {
  try {
    yield takeLatest(setName.type, setNameSaga);
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

export function* watchApp() {
  console.log('watchapp');
  yield all([watchGetName(), watchSetName()]);
}

//########################################################################
//########################### SELECTORS ##################################
//########################################################################

export const getNameSelect = state => state.app.name;
