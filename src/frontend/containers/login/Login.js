//handle login and register by bool
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import { login, register, checkAuthenticated } from '../../redux/auth'
import { Link, Redirect } from 'react-router-dom'
import { theme } from '../../theme'

const styles = {
  root: {
    backgroundColor: '#353535',
    width: '390px',
    height: '380px',
    boxSizing: 'border-box',
    margin: 'auto',
    paddingTop: '10px',
    color: 'red',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px',
      width: '90%',
      maxWidth: '390px',
    },
  },
  field: {
    marginTop: '18px',
  },
  button: {
    marginTop: '27px',
  },
}

export class Login extends Component {
  state = {
    username: '',
    password: '',
    passwordRepeat: '',
  }

  componentDidMount() {
    console.log("täääl mä ooon login")
    //CHECK USER LOGGED IN OR NOT FROM BACKEND;
    //IF LOGGED IN REDIRECt TO NOTES; HANDLE IN REDUX
    this.props.checkAuthenticated()
  }

  handleChangeUsername(e) {
    const username = e.target.value

    this.setState({ username })
  }

  handleChangePassword(e) {
    const password = e.target.value

    this.setState({ password })
  }

  handleChangePasswordRepeat(e) {
    const passwordRepeat = e.target.value

    this.setState({ passwordRepeat })
  }

  render() {
    const {
      name,
      classes,
      login,
      loginSuccess,
      registering,
      loginError,
      registerError,
      register,
      finishedLoading,
    } = this.props
    const { username, password, passwordRepeat } = this.state
    return finishedLoading ? (
      <div className={classes.root}>
        <Grid container justify='center'>
          <Grid item container xs={12} justify='center'>
            <Typography variant='subtitle2'>
              {registering ? registerError : loginError}
            </Typography>
          </Grid>
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
                onChange={e => this.handleChangePasswordRepeat(e)}
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
                  ? () => register({ username, password, passwordRepeat })
                  : () => login({ username, password })
              }
            >
              {registering ? 'REGISTER' : 'LOGIN'}
            </Button>
          </Grid>
          {registering ? null : (
            <Grid item container xs={12} justify='center'>
              <Link to='/register'>
                <Button color='primary' className={classes.field}>
                  REGISTER
                </Button>
              </Link>
            </Grid>
          )}
        </Grid>
      </div>
    ) : null
  }
}

export default connect(
  state => ({
    loginSuccess: state.auth.loginSuccess,
    loginError: state.auth.loginError,
    registerError: state.auth.registerError,
    finishedLoading: state.auth.finishedLoading,
  }),
  dispatch => ({
    login: bindActionCreators(login, dispatch),
    register: bindActionCreators(register, dispatch),
    checkAuthenticated: bindActionCreators(checkAuthenticated, dispatch),
    dispatch,
  })
)(withStyles(styles)(Login))
