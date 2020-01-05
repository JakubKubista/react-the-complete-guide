import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ROUTES } from '../../../constants/routes';
import * as actions from '../../../store/actions/index';

class SignOut extends Component {
  componentDidMount () {
    this.props.onSignOut();
  }

  render() {
    return <Redirect to={ROUTES.home} />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(actions.authSignOut())
  };
};

export default connect(null, mapDispatchToProps)(SignOut);