import React, { Suspense, useEffect } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';
import { ROUTES } from '../constants/routes';
import asyncComponent from '../hoc/asyncComponent';
import Layout from '../containers/layout/layout';
import BurgerBuilder from './burger-builder/burger-builder';
import SignOut from './auth/sign-out/sign-out';

/*
  Two options of lazyloading:
  - Checkout and Orders are using HOC with state+then logic
  - Auth using build-in React Suspense logic
*/

const Checkout = asyncComponent(() => import('./checkout/checkout'));
const Orders = asyncComponent(() => import('./orders/orders'));
const Auth = React.lazy(() => import('./auth/auth'));

const suspense = (Component, props) => (<Suspense fallback={null}>
  <Component {...props} />
</Suspense>);

const App = props => {
  const {
    onAuthCheckLocalStorage
  } = props;

  useEffect(() => {
    onAuthCheckLocalStorage();
  }, [onAuthCheckLocalStorage])

  const routes = (
    <Switch>
      <Route path={ROUTES.signIn} component={(props) => suspense(Auth, props)} key={ROUTES.signIn}/>
      <Route path={ROUTES.signOut} component={SignOut} key={ROUTES.signOut} />
      {props.isSignedIn && <Route path={ROUTES.checkout} component={Checkout} key={ROUTES.checkout} />}
      {props.isSignedIn && <Route path={ROUTES.orders} component={Orders} key={ROUTES.orders} />}
      <Route path={ROUTES.home} exact component={BurgerBuilder} key={ROUTES.home} />
      <Redirect to={ROUTES.home} key={'Redirect'} />
    </Switch>
  );

  return (
      <Layout >
        {routes}
      </Layout>
  );
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
