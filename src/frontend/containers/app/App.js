import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getName, setName } from '../../redux/app';
import { withStyles } from '@material-ui/core/styles';
import Notes from '../notes/Notes';
import Login from '../login/Login';
import * as NotesApi from '../../api/notes';
import { theme } from '../../theme';
import Router from '../../router/Router';

const styles = {
  root: {
    padding: '60px 10px 40px 10px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      padding: '5px',
    },
  },
};

export class App extends Component {
  state = {};

  componentDidMount() {
    const { getName, name, dispatch } = this.props;
    //NotesApi.addNote('Make a cake', '2020-05-30', 'for myself');
  }
  render() {
    const { name, classes } = this.props;
    return (
      <div className={classes.root}>
        <Router />
      </div>
    );
  }
}

export default connect(
  state => ({ name: state.app.name }),
  dispatch => ({
    getName: bindActionCreators(getName, dispatch),
    setName: bindActionCreators(setName, dispatch),
    dispatch,
  })
)(withStyles(styles)(App));
