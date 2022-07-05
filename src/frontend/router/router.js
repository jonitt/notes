import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Notes from '../containers/notes/Notes'
import Login from '../containers/login/Login'

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact>
          <Redirect to='/login' />
        </Route>
        <Route path='/notes' component={() => <Notes />} />
        <Route path='/login' component={() => <Login />} />
        <Route path='/register' component={() => <Login registering />} />
      </Switch>
    )
  }
}

export default Router
