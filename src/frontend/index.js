import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './containers/app/App';
import rootReducer from './redux/rootReducer';
import { appReducer } from './redux/app';
import rootSaga from './redux/rootSaga';
import { getNameSaga, watchApp } from './redux/app';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import './styles.css';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
//window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
