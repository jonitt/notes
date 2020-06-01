import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Notes from '../containers/notes/Notes';
import Login from '../containers/login/Login';

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact>
          {true ? <Redirect to='/login' /> : <Notes />}
        </Route>
        <Route path='/notes' component={Notes} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Login} />
      </Switch>
    );
  }
}

export default Router;
