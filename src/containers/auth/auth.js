import React, { Component } from 'react';
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

class Auth extends Component {
  state = {
    authForm: AUTH_FORM,
    signIn: true
  }

  inputChangedHandler = (event, inputName) => {
    const updatedForm = updateValidatedForm({
      form: this.state.authForm,
      inputName,
      inputValue: event.target.value
    });

    this.setState({
      authForm: updatedForm
    })
  }

  submitHandler = (event) => {
    event.preventDefault();

    const properties = {
      email: this.state.authForm.email.value,
      password: this.state.authForm.password.value,
      method: this.state.signIn
    }

    this.props.authenticate(properties);
  }

  switchSignInHandler = () => {
    this.setState(prevState => {
      return {signIn: !prevState.signIn};
    })
  }

  authRedirect = () => {
    if (this.props.isSignedIn) {
      const route = this.props.burgerChanged ? ROUTES.checkout : ROUTES.home;

      return <Redirect to={route} />
    }

    return null;
  }

  errorMessage = () => {
    if (this.props.error) {
      return <p>{this.props.error.message}</p>;
    }

    return null;
  }

  render() {
    const formElementsArray = createArrayOfFormElements(this.state.authForm);

    let form = (
      <form onSubmit={this.submitHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <br />
        <Button btnType="Success">{this.state.signIn ? BUTTONS.signIn : BUTTONS.signUp}</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.DefaultForm}>
        {this.authRedirect()}
        {this.errorMessage()}
        {form}
        <br />
        <Button btnType="Danger" click={this.switchSignInHandler}>
          {BUTTONS.switchTo} {this.state.signIn ? BUTTONS.signUp : BUTTONS.signIn}
        </Button>
      </div>
    )
  }
}

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