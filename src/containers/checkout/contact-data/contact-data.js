/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-service';
import withErrorHandler from '../../../hoc/errorHandler';
import * as actions from '../../../store/actions/index';
import { createArrayOfFormElements, updateValidatedForm, isFormValid } from '../../../utils/index';
import { ORDER_FORM } from '../../../constants/checkout';
import { MESSAGES, BUTTONS } from '../../../constants/labels';

import Button from '../../../components/layout/button/button';
import Spinner from '../../../components/layout/spinner/spinner';
import Input from '../../../components/layout/form/input/input';

import classes from '../../../assets/styles/default-form.scss';

class ContactData extends Component {
  state = {
    orderForm: ORDER_FORM,
    validity: false
  }

  inputChangedHandler = (event, inputName) => {
    const updatedForm = updateValidatedForm(
      this.state.orderForm,
      inputName,
      event.target.value
    );

    this.setState({
      orderForm: updatedForm,
      validity: isFormValid(updatedForm)
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    const customer = {};
    for (let formElementIdentifier in this.state.orderForm) {
      customer[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: customer
    }

    this.props.onPurchaseOrder(order);
  }

  render () {
    const formElementsArray = createArrayOfFormElements(this.state.orderForm);

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
        <Button btnType="Success" disabled={!this.state.validity}>{BUTTONS.order}</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.DefaultForm}>
        <h4>{MESSAGES.enterContactData}</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseOrder: (orderData) => dispatch(actions.purchaseOrder(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));