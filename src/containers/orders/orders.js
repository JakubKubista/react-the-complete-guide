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
        console.log(fetchedOrders);
        this.setState({
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false
        })
      })
  }

  render () {
    return (
      <div>
        <Order/>
        <Order/>
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);