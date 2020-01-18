import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';
import { ROUTES } from '../constants/routes';
import asyncComponent from '../hoc/asyncComponent';
import Layout from '../containers/layout/layout';
import BurgerBuilder from './burger-builder/burger-builder';
import SignOut from './auth/sign-out/sign-out';

const Checkout = asyncComponent(() => (import('./checkout/checkout')));
const Orders = asyncComponent(() => (import('./orders/orders')));
const Auth = asyncComponent(() => (import('./auth/auth')));

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheckLocalStorage();
  };

  getRoutes = () => (
    <Switch>
      <Route path={ROUTES.signIn} component={Auth} key={ROUTES.signIn}/>
      <Route path={ROUTES.signOut} component={SignOut} key={ROUTES.signOut} />
      {this.props.isSignedIn && <Route path={ROUTES.checkout} component={Checkout} key={ROUTES.checkout} />}
      {this.props.isSignedIn && <Route path={ROUTES.orders} component={Orders} key={ROUTES.orders} />}
      <Route path={ROUTES.home} exact component={BurgerBuilder} key={ROUTES.home} />
      <Redirect to={ROUTES.home} key={'Redirect'} />
    </Switch>
  );

  render() {
    const routes = this.getRoutes();

    return (
        <Layout >
          {routes}
        </Layout>
    );
  };
};

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth && state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckLocalStorage: () => dispatch(actions.authCheckLocalStorage())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
