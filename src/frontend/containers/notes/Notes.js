import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Note from './Note';
import NoteEdit from './NoteEdit';
import NoteEditActions from './NoteEditActions';
import {
  getNotes,
  setEditOpen,
  setSelectedIndex,
  openEdit,
  closeEdit,
  deleteNote,
} from '../../redux/notes';

const styles = {
  notes: { position: 'relative', maxWidth: '540px', margin: '0 70px 0 70px' },
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
    for (let i = notes.length - 1, j = 0; i >= 0; i--, j++) {
      let note = notes[i];
      noteComps.push(
        <Note
          note={note.note}
          date={note.date}
          info={note.info}
          key={note.id}
          index={j}
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
    } = this.props;
    const selectedNote = notes[selectedIndex];
    return (
      <div>
        <Grid container className={classes.notes}>
          <NoteEdit
            open={editOpen}
            note={selectedNote ? selectedNote.note : null}
            info={selectedNote ? selectedNote.info : null}
            date={selectedNote ? selectedNote.date : null}
            closeEdit={closeEdit}
            deleteNote={() => deleteNote(selectedIndex)}
          />
          <NoteEditActions open={editOpen} />
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
    dispatch,
  })
)(withStyles(styles)(Notes));
