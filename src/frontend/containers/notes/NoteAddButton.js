import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardActionArea,
  CardContent,
  Typography,
  Divider,
  TextField,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  plus: {
    transform: 'scale(3)',
    color: '#41783B',
    width: '25px',
    height: '25px',
    position: 'fixed',
    left: '605px',
    top: '32px',
    zIndex: '10',
  },
  buttonDisabled: {
    color: '#373737',
  },
};

export class NoteAddButton extends Component {
  state = {};

  render() {
    const { classes, editOpen, openEdit } = this.props;
    return <IconButton disabled={editOpen} className={`fas fa-plus ${classes.plus}`} onClick={() => openEdit()}/>;
  }
}

export default withStyles(styles)(NoteAddButton);
