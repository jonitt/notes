import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Note from './Note';
import NoteEdit from './NoteEdit';
import NoteAddButton from './NoteAddButton';
import {
  getNotes,
  setEditOpen,
  setSelectedIndex,
  openEdit,
  closeEdit,
  deleteNote,
  submitNote,
} from '../../redux/notes';

const styles = {
  notes: { position: 'relative', width: '540px', margin: '0 70px 0 70px' },
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
    return noteComps;
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
    } = this.props;
    console.log('notes in Notes', notes);
    const selectedNote = notes[selectedIndex];
    return (
      <div>
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
          {this.makeNoteComponents(notes)}
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    notes: state.notes.notes,
    editOpen: state.notes.editOpen,
    selectedIndex: state.notes.selectedIndex,
  }),
  dispatch => ({
    openEdit: bindActionCreators(openEdit, dispatch),
    closeEdit: bindActionCreators(closeEdit, dispatch),
    getNotes: bindActionCreators(getNotes, dispatch),
    setSelectedIndex: bindActionCreators(setSelectedIndex, dispatch),
    setEditOpen: bindActionCreators(setEditOpen, dispatch),
    deleteNote: bindActionCreators(deleteNote, dispatch),
    submitNote: bindActionCreators(submitNote, dispatch),
    dispatch,
  })
)(withStyles(styles)(Notes));
