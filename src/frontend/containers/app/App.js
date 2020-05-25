import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getName, setName } from '../../redux/app';
import { withStyles } from '@material-ui/core/styles';
import Notes from '../notes/Notes';
import Login from '../login/Login';

const styles = {
  root: {
    padding: '60px 10px 0 10px',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
  },
};

export class App extends Component {
  state = {};

  componentWillMount() {
    const { getName, name, dispatch } = this.props;
    console.log(dispatch(setName('Kalle')), name);
  }
  componentDidMount() {
    const { getName, name, dispatch } = this.props;
    console.log(dispatch(setName('Boris')), name);
  }
  render() {
    const { name, classes } = this.props;
    return (
      <div className={classes.root}>
        {/*<Notes />*/}
        <Login />
      </div>
    );
  }
}

export default connect(
  state => ({ name: state.app.name }),
  dispatch => ({
    getName: bindActionCreators(getName, dispatch),
    setName: bindActionCreators(setName, dispatch),
    dispatch,
  })
)(withStyles(styles)(App));
