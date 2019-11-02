import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Layout from '../containers/layout/layout';
import BurgerBuilder from './burger-builder/burger-builder';
import Checkout from './checkout/checkout';

class App extends Component {

  render() {
    return <Layout >
      <Route path="/checkout" component={Checkout} />
      <Route path="/" exact component={BurgerBuilder} />
    </Layout>;
  }
}

export default App;
