import { combineReducers } from 'redux';
import appReducer from './app';

const rootReducer = combineReducers({
  app: appReducer, //naming affects state name, now state name is app
});

export default rootReducer;
