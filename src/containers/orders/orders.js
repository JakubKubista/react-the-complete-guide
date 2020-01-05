/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-service';
import withErrorHandler from '../../hoc/errorHandler';
import * as actions from '../../store/actions/index';

import Spinner from '../../components/layout/spinner/spinner';
import Order from '../../components/burger-builder/order/order';

class Orders extends Component {
  componentDidMount() {
    this.props.onOrdersFetch(this.props.token);
  }

  render () {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
          this.props.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price} />
          )
        )
      )
    }

    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrdersFetch: (token) => dispatch(actions.ordersFetch(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));