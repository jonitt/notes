import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Note from './Note';
import NoteEdit from './NoteEdit';
import NoteEditActions from './NoteEditActions';
import { getNotes } from '../../redux/notes';

const styles = {
  notes: { position: 'relative', maxWidth: '540px', margin: '0 70px 0 70px' },
};

export class Notes extends Component {
  state = {};

  componentDidMount() {
    const { getNotes, dispatch } = this.props;
    dispatch(getNotes());
  }

  render() {
    const { classes ,notes} = this.props;
    console.log('notes in the hööd', notes)
    return (
      <div>
        <Grid container className={classes.notes}>
          <NoteEditActions />
          <NoteEdit />
          <Note />
          <Note />
          <Note />
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({ notes: state.notes.notes }),
  dispatch => ({
    getNotes: bindActionCreators(getNotes, dispatch),
    dispatch,
  })
)(withStyles(styles)(Notes));
