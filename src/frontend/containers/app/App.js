import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { theme } from '../../theme';
import Router from '../../router/Router';

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
};

export class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router />
      </div>
    );
  }
}

export default withStyles(styles)(App);
