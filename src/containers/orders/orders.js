/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/errorHandler';

import Order from '../../components/burger-builder/order/order';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            id: key,
            ...response.data[key]
          });
        }
        this.setState({
          loading: false,
          orders: fetchedOrders
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        })
      })
  }

  render () {
    return (
      <div>
        {this.state.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price} />
          )
        )}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);