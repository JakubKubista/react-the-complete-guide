import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';
import { ROUTES } from '../constants/routes';
import Layout from '../containers/layout/layout';
import BurgerBuilder from './burger-builder/burger-builder';
import Checkout from './checkout/checkout';
import Orders from './orders/orders';
import Auth from './auth/auth';
import SignOut from './auth/sign-out/sign-out';

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckLocalStorage();
  }

  render() {
    return (
        <Layout >
          <Route path={ROUTES.checkout} component={Checkout} />
          <Route path={ROUTES.orders} component={Orders} />
          <Route path={ROUTES.signIn} component={Auth} />
          <Route path={ROUTES.signOut} component={SignOut} />
          <Route path={ROUTES.home} exact component={BurgerBuilder} />
        </Layout>
    );
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckLocalStorage: () => dispatch(actions.authCheckLocalStorage())
  }
};

export default connect(null, mapDispatchToProps)(App);
