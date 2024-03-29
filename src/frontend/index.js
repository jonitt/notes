import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import createSagaMiddleware from 'redux-saga'
import App from './containers/app/App'
import rootReducer from './redux/rootReducer'
import rootSaga from './redux/rootSaga'
import { Provider } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import './styles.css'
import { ThemeProvider } from '@material-ui/styles'
import { theme } from './theme'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import history from './router/history'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), sagaMiddleware],
})
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)
