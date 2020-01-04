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
    loginForm: LOGIN_FORM,
    signIn: false
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

    const properties = {
      email: this.state.loginForm.email.value,
      password: this.state.loginForm.password.value,
      method: this.state.signIn
    }

    this.props.authenticate(properties);
  }

  switchSingInHandler = () => {
    this.setState(prevState => {
      return {signIn: !prevState.signIn};
    })
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
        <Button btnType="Success">{this.state.signIn ? BUTTONS.signIn : BUTTONS.signUp}</Button>
      </form>
    );

    return (
      <div className={classes.DefaultForm}>
        {form}
        <Button btnType="Danger" click={this.switchSingInHandler}>
          {BUTTONS.switchTo} {this.state.signIn ? BUTTONS.signUp : BUTTONS.signIn}
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (properties) => dispatch(actions.authenticate(properties))
  }
};

export default connect(null, mapDispatchToProps)(Login);