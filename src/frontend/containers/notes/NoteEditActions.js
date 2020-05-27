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
  root: { width: '50px', position: 'absolute', top: 55, right: -25 },
  plus: {
    transform: 'scale(2.1)',
    color: '#41783B',
  },
  buttonDisabled: {
    color: '#373737',
  },
  check: {
    transform: 'scale(2)',
    color: '#41783B',
    marginTop: '52px',
  },
  cross: {
    transform: 'scale(2.2)',
    marginTop: '31px',
    color: '#783A3A',
  },
  trash: {
    transform: 'scale(2)',
    marginTop: '25px',
    color: '#783A3A',
  },
  icon: {
    width: '25px',
    height: '25px',
  },
};

export class NoteEditActions extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <IconButton
            className={`fas fa-plus ${classes.icon} ${classes.plus} ${
              true ? classes.buttonDisabled : ''
            }`}
          />
        </Grid>
        <Grid item xs={12}>
          <IconButton
            className={`fas fa-check ${classes.icon} ${classes.check}`}
          />
        </Grid>
        <Grid item xs={12}>
          <IconButton
            className={`fas fa-times ${classes.icon} ${classes.cross}`}
          />
        </Grid>
        <Grid item xs={12}>
          <IconButton
            className={`fas fa-trash-alt ${classes.icon} ${classes.trash}`}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(NoteEditActions);
