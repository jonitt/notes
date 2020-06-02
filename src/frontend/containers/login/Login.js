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
import * as loginApi from '../../api/login';
import { login } from '../../redux/auth';
import { Link } from 'react-router-dom';

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
  state = {
    registering: false,
    username: '',
    password: '',
    repeatPassword: '',
  };

  handleChangeUsername(e) {
    const username = e.target.value;

    this.setState({ username });
  }

  handleChangePassword(e) {
    const password = e.target.value;

    this.setState({ password });
  }

  handleChangeRepeatPassword(e) {
    const repeatPassword = e.target.value;

    this.setState({ repeatPassword });
  }

  render() {
    const { name, classes, login } = this.props;
    const { registering, username, password, repeatPassword } = this.state;
    return (
      <div className={classes.root}>
        <Grid container justify='center'>
          <Grid item container xs={12} justify='center'>
            <TextField
              id='filled-required'
              label='Username'
              className={classes.field}
              inputProps={{ maxLength: 50 }}
              onChange={e => this.handleChangeUsername(e)}
            />
          </Grid>
          <Grid item container xs={12} justify='center'>
            <TextField
              className={classes.field}
              label='Password'
              type='password'
              autoComplete='current-password'
              inputProps={{ maxLength: 40 }}
              onChange={e => this.handleChangePassword(e)}
            />
          </Grid>
          {registering ? (
            <Grid item container xs={12} justify='center'>
              <TextField
                className={classes.field}
                label='Password again'
                type='password'
                autoComplete='current-password'
                inputProps={{ maxLength: 40 }}
                onChange={e => this.handleChangeRepeatPassword(e)}
              />
            </Grid>
          ) : null}
          <Grid item container xs={12} justify='center'>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              type='submit'
              onClick={
                registering
                  ? null
                  : () => console.log(login({ username, password }))
              }
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
    login: bindActionCreators(login, dispatch),
    dispatch,
  })
)(withStyles(styles)(Login));
