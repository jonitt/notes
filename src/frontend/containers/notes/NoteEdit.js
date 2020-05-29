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
  ClickAwayListener,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker,
} from '@material-ui/pickers';
//import styles from './Note.css';
import { withStyles } from '@material-ui/core/styles';
import formatISO from 'date-fns/formatISO';

const styles = {
  root: {
    position: 'fixed',
    top: '-30px',
    zIndex: 9,
    opacity: 0.9,
  },
  mouseOn: {
    opacity: 1,
  },
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
    padding: '0 20px 0 15px',
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
  actions: {
    width: '50px',
    position: 'absolute',
    top: 52,
    right: -40,
    height: '215px',
  },
  buttonDisabled: {
    color: '#373737',
  },
  check: {
    transform: 'scale(2)',
    color: '#36752F',
    marginTop: '90px',
  },
  trash: {
    transform: 'scale(2)',
    marginTop: '20px',
    color: '#762E2E',
  },
  icon: {
    width: '25px',
    height: '25px',
    marginLeft: '18px',
  },
  date: {
    position: 'absolute',
    zIndex: 11,
    bottom: 0,
    right: 5,
    width: '100px',
  },
};

export class NoteEdit extends Component {
  state = { mouseOn: true, newDate: '' };

  componentDidUpdate(prevProps, prevState) {
    const { date } = this.props;
    if (prevProps.date !== date) {
      this.setState({
        newDate: date,
      });
    }
  }

  render() {
    const { mouseOn, newDate } = this.state;
    const { classes, open, note, info, closeEdit } = this.props;
    return (
      <div>
        {open ? (
          <ClickAwayListener onClickAway={() => closeEdit()}>
            <Grid
              item
              xs={12}
              className={`${classes.root} ${mouseOn ? classes.mouseOn : ''}`}
              onMouseEnter={() => this.setState({ mouseOn: true })}
              onMouseLeave={() =>
                setTimeout(() => this.setState({ mouseOn: false }), 100)
              }
            >
              <Grid container className={classes.actions}>
                <Grid item xs={12}>
                  <IconButton
                    className={`fas fa-check ${classes.icon} ${classes.check}`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <IconButton
                    className={`fas fa-trash-alt ${classes.icon} ${classes.trash}`}
                  />
                </Grid>
              </Grid>
              <Card className={classes.card}>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      className={classes.headingField}
                      defaultValue={note}
                      placeholder='What to remember?'
                      InputProps={{
                        classes: {
                          root: classes.headingText,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      defaultValue={info}
                      multiline
                      className={classes.infoField}
                      placeholder='Add more info...'
                    />
                  </Grid>

                  <DatePicker
                    className={classes.date}
                    onChange={date =>
                      this.setState({ newDate: formatISO(date) })
                    }
                    //disableToolbar
                    variant='inline'
                    format='dd.MM.yyyy'
                    margin='normal'
                    value={newDate}
                  />
                </Grid>
              </Card>
            </Grid>
          </ClickAwayListener>
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(NoteEdit);
