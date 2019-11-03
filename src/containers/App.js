import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from '../containers/layout/layout';
import BurgerBuilder from './burger-builder/burger-builder';
import Checkout from './checkout/checkout';
import Orders from './orders/orders';

class App extends Component {

  render() {
    return <Layout >
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/" exact component={BurgerBuilder} />
    </Layout>;
  }
}

export default App;
