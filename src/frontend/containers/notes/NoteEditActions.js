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
    color: '#27931B'
  },
  check: {
    color: '#27931B',
    marginTop: '85px'
  },
  cross: {
    marginTop: '30px',
    color: '#AE1E1E'
  },
  icon: {
    transform: 'scale(2.1)',
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
          <IconButton className={`fas fa-plus ${classes.icon} ${classes.plus}`} />
        </Grid>
        <Grid item xs={12}>
          <IconButton className={`fas fa-check ${classes.icon} ${classes.check}`} />
        </Grid>
        <Grid item xs={12}>
          <IconButton className={`fas fa-times ${classes.icon} ${classes.cross}`} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(NoteEditActions);
