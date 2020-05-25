//handle login and register by bool
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  CardActionArea,
  CardContent,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { getName, setName } from '../../redux/app';
import { withStyles } from '@material-ui/core/styles';
import Notes from '../notes/Notes';

const styles = {
  root: {
    backgroundColor: '#353535',
    width: '390px',
    height: '380px',
    boxSizing: 'border-box',
    margin: 'auto',
    paddingTop: '10px',
    color: 'red',
  },
  field: {
    marginTop: '15px',
  },
  button: {
    marginTop: '27px',
  },
};

export class Login extends Component {
  state = { registering: true };

  render() {
    const { name, classes } = this.props;
    const { registering } = this.state;
    return (
      <div className={classes.root}>
        <Grid container justify='center'>
          <Grid item container xs={12} justify='center'>
            <TextField
              id='filled-required'
              label='Username'
              className={classes.field}
            />
          </Grid>
          <Grid item container xs={12} justify='center'>
            <TextField
              className={classes.field}
              label='Password'
              type='password'
              autoComplete='current-password'
            />
          </Grid>
          {registering ? (
            <Grid item container xs={12} justify='center'>
              <TextField
                className={classes.field}
                label='Password again'
                type='password'
                autoComplete='current-password'
              />
            </Grid>
          ) : null}
          <Grid item container xs={12} justify='center'>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
            >
              {registering ? 'REGISTER' : 'LOGIN'}
            </Button>
          </Grid>
          {registering ? null : (
            <Grid item container xs={12} justify='center'>
              <Button color='primary' className={classes.field}>
                REGISTER
              </Button>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({ name: state.app.name }),
  dispatch => ({
    dispatch,
  })
)(withStyles(styles)(Login));
