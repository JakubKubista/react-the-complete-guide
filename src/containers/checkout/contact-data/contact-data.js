/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axios-orders';

import {ORDER_FORM} from '../../../constants/checkout';
import Button from '../../../components/layout/button/button';
import Spinner from '../../../components/layout/spinner/spinner';
import Input from '../../../components/layout/form/input/input';

import classes from './contact-data.scss';

class ContactData extends Component {
  state = {
    orderForm: ORDER_FORM,
    formIsValid: false,
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const customer = {};
    for (let formElementIdentifier in this.state.orderForm) {
      customer[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: customer
    }
    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        });
      });
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required && isValid) {
      isValid = value.trim() !== '';
    }

    if (rules.minLength && isValid) {
      isValid = rules.minLength <= value.length;
    }

    if (rules.maxLength && isValid) {
      isValid = rules.maxLength >= value.length;
    }

    if (rules.type && isValid) {
      isValid = rules.type === 'number' && !isNaN(value);
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    }

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    })
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
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
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price
  };
};

export default connect(mapStateToProps)(ContactData);