import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { ROUTES } from '../../../constants/routes';
import * as actions from '../../../store/actions/index';

const SignOut = ({
  onSignOut
}) => {

  useEffect(() => {
    onSignOut();
  }, [onSignOut])

  return <Redirect to={ROUTES.home} />;
}

SignOut.propTypes = {
  onSignOut: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    onSignOut: () => dispatch(actions.authSignOut())
  };
};

export default connect(null, mapDispatchToProps)(SignOut);