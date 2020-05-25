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
    height: '220px',
    padding: '0',
    marginTop: '45px',
    marginLeft: '-4px',
    overflowY: 'auto',
    position: 'relative',
  },
  headingField: {
    boxSizing: 'border-box',
    padding: '0 80px 0 15px',
    width: '100%',
    //display: 'inline-block',
  },
  headingText: {
    fontSize: '2.2rem',
    //lineHeight: '50px'
  },
  infoField: {
    boxSizing: 'border-box',
    padding: '0px 20px 0 15px',
    marginTop: '18px',
    width: '100%',
    height: '100%',
  },
  calendarButton: {
    //display: 'inline-block',
    position: 'absolute',
    top: 20,
    right: 27, 
    transform: 'scale(2.4)',
    width: '25px',
    height: '25px',
    color: '#757575'
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
              <TextField
                className={classes.headingField}
                placeholder='What to remember?'
                InputProps={{
                  classes: {
                    root: classes.headingText,
                  },
                }}
              />
              <IconButton
                className={`fas fa-calendar-alt ${classes.calendarButton}`}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                className={classes.infoField}
                placeholder='Add more info...'
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(NoteEdit);
