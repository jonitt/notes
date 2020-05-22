import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getName, setName } from '../../redux/app';

export class App extends Component {
  state = {};

  componentWillMount() {
    const { getName, name, dispatch } = this.props;
    //console.log(dispatch(setName('pekka')), 'state name', name);
    console.log(getName(), name);
    console.log(setName('Kalle'), name);
    console.log(dispatch(setName('Kalle')), name);
  }
  componentDidMount() {
    const { getName, name, dispatch } = this.props;
    console.log(getName(), name);
    console.log(setName('Kalle'), name);
    console.log(dispatch(setName('Boris')), name);
  }
  render() {
    const { name } = this.props;
    return <div>Heloust heloust {name}</div>;
  }
}

export default connect(
  state => ({ name: state.app.name }),
  dispatch => ({
    getName: bindActionCreators(getName, dispatch),
    setName: bindActionCreators(setName, dispatch),
    dispatch
  })
)(App);
