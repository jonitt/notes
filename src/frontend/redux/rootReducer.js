import { combineReducers } from 'redux';
import appReducer from './app';
import notesReducer from './notes';
import authReducer from './auth';

const rootReducer = combineReducers({
  app: appReducer, //naming affects state name, now state name is app
  notes: notesReducer,
  auth: authReducer,
});

export default rootReducer;
