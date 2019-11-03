import React, { Component } from 'react';
import Order from '../../components/burger-builder/order/order';

class Orders extends Component {
  render () {
    return (
      <div>
        <Order/>
        <Order/>
      </div>
    );
  }
}

export default Orders;