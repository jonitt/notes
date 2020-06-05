import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Note from './Note';
import NoteEdit from './NoteEdit';
import NoteAddButton from './NoteAddButton';
import { theme } from '../../theme';
import {
  getNotes,
  setEditOpen,
  setSelectedIndex,
  openEdit,
  closeEdit,
  deleteNote,
  submitNote,
} from '../../redux/notes';
import { logout } from '../../redux/auth';

const styles = {
  root: {
    width: '100%',
    position: 'relative',
  },
  notes: {
    position: 'relative',
    maxWidth: '540px',
    minWidth: '300px',
    margin: '0 70px 0 70px',
    [theme.breakpoints.down('xs')]: {
      margin: '0 ',
      width: '100%',
      maxWidth: '1000px',
    },
  },
  logout: {
    position: 'absolute',
    left: 0,
    top: -55,
    left: -5,
    zIndex: 10,
    [theme.breakpoints.down('xs')]: {
      top: -5,
    },
  },
  emptyText: {
    [theme.breakpoints.down('xs')]: {
      padding: 5,
      paddingTop: '50px',
    },
  }
};

export class Notes extends Component {
  state = {};

  componentDidMount() {
    const { getNotes, dispatch } = this.props;
    dispatch(getNotes());
  }

  makeNoteComponents = notes => {
    const { openEdit, editOpen, selectedIndex } = this.props;
    let noteComps = [];
    for (let i = notes.length - 1; i >= 0; i--) {
      let note = notes[i];
      noteComps.push(
        <Note
          editOpen={editOpen}
          note={note.note}
          date={note.date}
          info={note.info}
          key={note.id}
          index={i}
          openEdit={openEdit}
        />
      );
    }
    return noteComps.length > 0 ? noteComps : null;
  };

  render() {
    const {
      classes,
      notes,
      editOpen,
      selectedIndex,
      closeEdit,
      deleteNote,
      openEdit,
      submitNote,
      finishedLoading,
      logout,
    } = this.props;
    const selectedNote = notes[selectedIndex];
    return finishedLoading ? (
      <div className={classes.root}>
        <Button onClick={() => logout()} className={classes.logout}>
          <Typography variant='button'>LOG OUT</Typography>
        </Button>
        <Grid container className={classes.notes}>
          <NoteEdit
            open={editOpen}
            note={selectedNote ? selectedNote.note.trim() : null}
            info={
              selectedNote && selectedNote.info
                ? selectedNote.info.trim()
                : null
            }
            date={selectedNote ? selectedNote.date : null}
            id={selectedNote ? selectedNote.id : null}
            closeEdit={closeEdit}
            deleteNote={() => deleteNote(selectedIndex)}
            isNewNote={selectedIndex < 0}
            submitNote={submitNote}
          />
          <NoteAddButton editOpen={editOpen} openEdit={() => openEdit()} />
          {this.makeNoteComponents(notes) || (
            <Grid className={classes.emptyText} item container xs={12} justify='center'>
              <Typography  variant='caption'>
                Add your first note by clicking the green plus :)
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>
    ) : null;
  }
}

export default connect(
  state => ({
    notes: state.notes.notes,
    editOpen: state.notes.editOpen,
    selectedIndex: state.notes.selectedIndex,
    finishedLoading: state.notes.finishedLoading,
  }),
  dispatch => ({
    openEdit: bindActionCreators(openEdit, dispatch),
    closeEdit: bindActionCreators(closeEdit, dispatch),
    getNotes: bindActionCreators(getNotes, dispatch),
    setSelectedIndex: bindActionCreators(setSelectedIndex, dispatch),
    setEditOpen: bindActionCreators(setEditOpen, dispatch),
    deleteNote: bindActionCreators(deleteNote, dispatch),
    submitNote: bindActionCreators(submitNote, dispatch),
    logout: bindActionCreators(logout, dispatch),
    dispatch,
  })
)(withStyles(styles)(Notes));
