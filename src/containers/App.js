import React, { Component } from 'react';
import Layout from '../containers/layout/layout';
import BurgerBuilder from './burger-builder/burger-builder';
import Checkout from './checkout/checkout';

class App extends Component {

  render() {
    return <Layout >
      <BurgerBuilder />
      <Checkout />
    </Layout>;
  }
}

export default App;
