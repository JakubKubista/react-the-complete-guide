import React , { useCallback } from 'react';
import PropTypes from 'prop-types';
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

  const checkoutCancelHandler = useCallback(() => {
    history.goBack();
  }, [history]);

  const checkoutContinueHandler = useCallback(() => {
    history.replace('/checkout/contact-data');
  }, [history]);

  return ingredients ?
    <div>
      {purchased && <Redirect to="/" />}

      <CheckoutSummary
        ingredients={ingredients}
        cancel={checkoutCancelHandler}
        continue={checkoutContinueHandler} />

      <Route
        path={match.path + '/contact-data'}
        component={ContactData} />
    </div> :
    <Redirect to="/" />;
};

Checkout.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  ingredients: PropTypes.shape({
    salad: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired
  }).isRequired,
  purchased: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
