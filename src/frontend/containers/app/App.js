import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { theme } from '../../theme'
import Router from '../../router/Router'

const styles = {
  root: {
    padding: '60px 10px 40px 10px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      padding: '5px',
    },
  },
}

export class App extends Component {
  componentDidMount() {
    console.log("APPPPPPPPPPPPPPPPPPPPPn")
    //CHECK USER LOGGED IN OR NOT FROM BACKEND;
    //IF LOGGED IN REDIRECt TO NOTES; HANDLE IN REDUX
  }
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Router />
      </div>
    )
  }
}

/*
Problem: React is only served and initialized from "/" and not from any of the sub-paths.

- How to serve the react code and initialize it from other paths as well?

+ Is it actually the problem? Why going between login <-> register works, but not between login <-> notes?
+ Going between notes <-> logout also works.

- 1. Make redirect from login to notes work.
- 2. Make opening other path than "/" to open the app properly.

*/

export default withStyles(styles)(App)
