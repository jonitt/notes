import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Note from './Note';
import NoteEdit from './NoteEdit';
import NoteEditActions from './NoteEditActions';

const styles = {
  notes: { position: 'relative', maxWidth: '540px', margin: '0 70px 0 70px' },
};

export class Notes extends Component {
  state = {};

  render() {
    const { classes } = this.props;
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
  state => ({ name: state.app.name }),
  dispatch => ({
    dispatch,
  })
)(withStyles(styles)(Notes));
