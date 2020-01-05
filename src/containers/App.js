import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import Layout from '../containers/layout/layout';
import BurgerBuilder from './burger-builder/burger-builder';
import Checkout from './checkout/checkout';
import Orders from './orders/orders';
import Auth from './auth/auth';
import SignOut from './auth/sign-out/sign-out';

class App extends Component {

  render() {
    return <Layout >
      <Route path={ROUTES.checkout} component={Checkout} />
      <Route path={ROUTES.orders} component={Orders} />
      <Route path={ROUTES.signIn} component={Auth} />
      <Route path={ROUTES.signOut} component={SignOut} />
      <Route path={ROUTES.home} exact component={BurgerBuilder} />
    </Layout>;
  }
}

export default App;
