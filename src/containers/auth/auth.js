import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import { createArrayOfFormElements, updateValidatedForm } from '../../utils/index';
import { ROUTES } from '../../constants/routes';
import { BUTTONS } from '../../constants/labels';
import { AUTH_FORM } from '../../constants/containers/auth';

import Spinner from '../../components/layout/spinner/spinner';
import Input from '../../components/layout/form/input/input';
import Button from '../../components/layout/button/button';

import classes from '../../assets/styles/default-form.scss';

const Auth = ({
  isSignedIn,
  burgerChanged,
  error,
  loading,
  authenticate
}) => {
  const [authForm, setAuthForm] = useState(AUTH_FORM);
  const [signIn, setSignIn] = useState(true);

  const inputChangedHandler = useCallback((event, inputName) => {
    const updatedForm = updateValidatedForm({
      form: authForm,
      inputName,
      inputValue: event.target.value
    });

    setAuthForm(updatedForm);
  }, [authForm]);

  const submitHandler = useCallback((event) => {
    event.preventDefault();

    const properties = {
      email: authForm.email.value,
      password: authForm.password.value,
      method: signIn
    }

    authenticate(properties);
  }, [authForm.email.value, authForm.password.value, authenticate, signIn]);

  const switchSignInHandler = useCallback(() => {
    setSignIn(!signIn);
  }, [signIn]);

  const authRedirect = useCallback(() => {
    const route = burgerChanged ? ROUTES.checkout : ROUTES.home;

    return <Redirect to={route} />
  }, [burgerChanged]);

  const errorMessage = useCallback(() => {
    return <p>{error.message}</p>;
  }, [error]);

  const formElementsArray = createArrayOfFormElements(authForm);

  const form = !loading ?
    <form onSubmit={submitHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangedHandler(event, formElement.id)} />
      ))}
      <br />
      <Button btnType="Success">{signIn ? BUTTONS.signIn : BUTTONS.signUp}</Button>
    </form> :
    <Spinner />;

  return (
    <div className={classes.DefaultForm}>
      {isSignedIn && authRedirect()}
      {error && errorMessage()}
      {form}
      <br />
      <Button btnType="Danger" click={switchSignInHandler}>
        {BUTTONS.switchTo} {signIn ? BUTTONS.signUp : BUTTONS.signIn}
      </Button>
    </div>
  );
}

Auth.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  burgerChanged: PropTypes.bool.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired
};

Auth.defaultProps = {
  error: null
};

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isSignedIn: state.auth && state.auth.token !== null,
    burgerChanged: state.burgerBuilder.changed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (properties) => dispatch(actions.authenticate(properties))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);