import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getName, setName } from '../../redux/app';
import { withStyles } from '@material-ui/core/styles';
import Notes from '../notes/Notes';
import Login from '../login/Login';
import * as NotesApi from '../../api/notes';

const styles = {
  root: {
    padding: '60px 10px 0 10px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  },
};

export class App extends Component {
  state = {};

  componentDidMount() {
    const { getName, name, dispatch } = this.props;
    console.log(dispatch(setName('Boris')), name);
    NotesApi.fetchNotes().then(res => console.log(res));
    NotesApi.deleteNote(1);
    //NotesApi.addNote('Make a cake', '2020-05-30', 'for myself');
    NotesApi.editNote(
      'Käy poimimassa marjoja',
      '2020-06-02',
      'etenkin mustikoita ja mansikoita',
      4
    );
  }
  render() {
    const { name, classes } = this.props;
    return <div className={classes.root}>{true ? <Notes /> : <Login />}</div>;
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
