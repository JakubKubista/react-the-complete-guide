import React, { Component } from 'react';

import { createArrayOfFormElements } from '../../utils/index';
import { BUTTONS } from '../../constants/labels';
import { LOGIN_FORM } from '../../constants/auth';
import Input from '../../components/layout/form/input/input';
import Button from '../../components/layout/button/button';

class Auth extends Component {
  state = {
    loginForm: LOGIN_FORM
  }

  render () {
    const formElementsArray = createArrayOfFormElements(this.state.loginForm);

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    ));

    return (
      <div>
        <form>
          {form}
          <Button btnType="Success">{BUTTONS.submit}</Button>
        </form>
      </div>
    )
  }
}

export default Auth;