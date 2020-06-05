import { combineReducers } from 'redux';
import notesReducer from './notes';
import authReducer from './auth';

const rootReducer = combineReducers({
  notes: notesReducer,
  auth: authReducer,
});

export default rootReducer;
