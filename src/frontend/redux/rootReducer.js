import { combineReducers } from 'redux';
import appReducer from './app';
import notesReducer from './notes';

const rootReducer = combineReducers({
  app: appReducer, //naming affects state name, now state name is app
  notes: notesReducer
});

export default rootReducer;
