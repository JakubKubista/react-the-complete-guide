/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../../axios-service';
import withErrorHandler from '../../hoc/errorHandler';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/layout/spinner/spinner';
import Order from '../../components/burger-builder/order/order';

const Orders = ({
  token,
  userId,
  orders,
  onOrdersFetch,
  loading
}) => {

  useEffect(() => {
    onOrdersFetch(token, userId)
  }, [onOrdersFetch, token, userId])

  return loading ?
    <Spinner /> :
    orders.map(order =>
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price} />
    );
};

Orders.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  orders: PropTypes.array.isRequired,
  onOrdersFetch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrdersFetch: (token, userId) => dispatch(actions.ordersFetch(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));