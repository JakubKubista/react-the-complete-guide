/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './contact-data/contact-data';
import CheckoutSummary from '../../components/burger-builder/checkout-summary/checkout-summary';

class Checkout extends Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          cancel={this.checkoutCancelHandler}
          continue={this.checkoutContinueHandler} />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);