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
    right: '30px',
    top: '30px',
    zIndex: '10',
  },
  buttonDisabled: {
    color: '#373737',
  },
};

export class NoteEditActions extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <IconButton
        className={`fas fa-plus ${classes.plus} ${
          false ? classes.buttonDisabled : ''
        }`}
      />
    );
  }
}

export default withStyles(styles)(NoteEditActions);
