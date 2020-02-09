/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './contact-data/contact-data';
import CheckoutSummary from '../../components/burger-builder/checkout-summary/checkout-summary';

const Checkout = ({
  history,
  match,
  ingredients,
  purchased
}) => {
  const checkoutCancelHandler = () => {
    history.goBack();
  }

  const checkoutContinueHandler = () => {
    history.replace('/checkout/contact-data');
  }

  let checkout = <Redirect to="/" />

  if (ingredients) {
    const purchasedRedirect = purchased && <Redirect to="/" />;

    checkout = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ingredients}
          cancel={checkoutCancelHandler}
          continue={checkoutContinueHandler} />
        <Route
          path={match.path + '/contact-data'}
          component={ContactData} />
      </div>
    );
  }

  return checkout
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);