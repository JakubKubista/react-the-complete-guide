import React, { Component } from 'react';

import { createArrayOfFormElements, updateValidatedForm, isFormValid } from '../../utils/index';
import { BUTTONS } from '../../constants/labels';
import { LOGIN_FORM } from '../../constants/login';
import Input from '../../components/layout/form/input/input';
import Button from '../../components/layout/button/button';
import classes from '../../assets/styles/default-form.scss';

class Login extends Component {
  state = {
    loginForm: LOGIN_FORM,
    validity: false
  }

  inputChangedHandler = (event, inputName) => {
    const updatedForm = updateValidatedForm(
      this.state.loginForm,
      inputName,
      event.target.value
    );

    this.setState({
      loginForm: updatedForm,
      validity: isFormValid(updatedForm)
    })
  }

  render () {
    const formElementsArray = createArrayOfFormElements(this.state.loginForm);

    let form = (
      <form>
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
        <Button btnType="Success" disabled={!this.state.validity}>{BUTTONS.submit}</Button>
      </form>
    );

    return (
      <div className={classes.DefaultForm}>
        {form}
      </div>
    )
  }
}

export default Login;