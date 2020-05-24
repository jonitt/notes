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
} from '@material-ui/core';
//import styles from './Note.css';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    background: '#2D2D2D',
    border: 0,
    borderRadius: 3,
    borderBottom: '6px solid #3D3D3D',
    color: 'white',
    width: '495px',
    height: '190px',
    padding: '0',
    marginTop: '45px',
    marginLeft: '-4px',
  },
  headingField: {
    margin: '0 80px 0 15px',
    textSize: '1.2rem',
  },
};

export class NoteEdit extends Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <Card className={classes.card}>
          <Grid container>
            <Grid item xs={12}>
              <TextField className={classes.headingField} />
            </Grid>
            <Grid item xs={12}>
              <TextField multiline />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(NoteEdit);
