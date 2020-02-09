/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import axios from '../../../axios-service';
import withErrorHandler from '../../../hoc/errorHandler';
import * as actions from '../../../store/actions/index';
import { createArrayOfFormElements, updateValidatedForm, isFormValid } from '../../../utils/index';
import { ORDER_FORM } from '../../../constants/containers/checkout';
import { MESSAGES, BUTTONS } from '../../../constants/labels';

import Button from '../../../components/layout/button/button';
import Spinner from '../../../components/layout/spinner/spinner';
import Input from '../../../components/layout/form/input/input';

import classes from '../../../assets/styles/default-form.scss';

const ContactData = ({
  ingredients,
  price,
  userId,
  token,
  onPurchaseOrder,
  loading
}) => {
  const [ orderForm, setOrderForm ] = useState(ORDER_FORM);
  const [ validity, setValidity ] = useState(false);

  const inputChangedHandler = (event, inputName) => {
    const updatedForm = updateValidatedForm({
      form: orderForm,
      inputName,
      inputValue: event.target.value
    });

    setOrderForm(updatedForm);
    setValidity(
      isFormValid({form: updatedForm})
    );
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const customer = {};
    for (let formElementIdentifier in orderForm) {
      customer[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients,
      price,
      customer,
      userId
    };

    onPurchaseOrder(order, token);
  };

  const formElementsArray = createArrayOfFormElements(orderForm);

  let form = (
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
      <Button btnType="Success" disabled={!validity}>{BUTTONS.order}</Button>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.DefaultForm}>
      <h4>{MESSAGES.enterContactData}</h4>
      {form}
    </div>
  )
};

ContactData.propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired
  }).isRequired,
  price: PropTypes.number.isRequired,
  userId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  onPurchaseOrder: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseOrder: (orderData, token) => dispatch(actions.purchaseOrder(orderData, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
