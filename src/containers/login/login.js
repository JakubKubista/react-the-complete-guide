import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import { createArrayOfFormElements, updateValidatedForm } from '../../utils/index';
import { BUTTONS } from '../../constants/labels';
import { LOGIN_FORM } from '../../constants/login';
import Input from '../../components/layout/form/input/input';
import Button from '../../components/layout/button/button';

import classes from '../../assets/styles/default-form.scss';

class Login extends Component {
  state = {
    loginForm: LOGIN_FORM
  }

  inputChangedHandler = (event, inputName) => {
    const updatedForm = updateValidatedForm(
      this.state.loginForm,
      inputName,
      event.target.value
    );

    this.setState({
      loginForm: updatedForm
    })
  }

  submitHandler = (event) => {
    event.preventDefault();

    const email = this.state.loginForm.email.value;
    const password = this.state.loginForm.password.value;

    this.props.onAuthenticate(email, password);
  }

  render () {
    const formElementsArray = createArrayOfFormElements(this.state.loginForm);

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
        <Button btnType="Success">{BUTTONS.submit}</Button>
      </form>
    );

    return (
      <div className={classes.DefaultForm}>
        {form}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticate: (email, password) => dispatch(actions.authenticate(email, password)),
  }
};

export default connect(null, mapDispatchToProps)(Login);