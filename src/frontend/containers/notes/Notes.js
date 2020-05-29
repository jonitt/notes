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
    console.log('idnex ja open', selectedIndex, editOpen);
    let noteComps = [];
    for (let j = 0, i = notes.length - 1; i >= 0; i--, j++) {
      let note = notes[i];
      //if
      if (editOpen && selectedIndex === j) {
        const editComp = <NoteEdit key={note.id}/>
        if (selectedIndex % 2 != 0) {
          //place edit window before previous component,
          //so edit window appears on same line as selected component existed
          const prevComp = noteComps[j - 1];
          noteComps[j - 1] = editComp;
          noteComps.push(prevComp);
        } else {
          noteComps.push(editComp);
        }
      } else
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
    const { classes, notes, editOpen } = this.props;
    return (
      <div>
        <Grid container className={classes.notes}>
          <NoteEditActions />
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
    getNotes: bindActionCreators(getNotes, dispatch),
    setSelectedIndex: bindActionCreators(setSelectedIndex, dispatch),
    setEditOpen: bindActionCreators(setEditOpen, dispatch),
    dispatch,
  })
)(withStyles(styles)(Notes));
