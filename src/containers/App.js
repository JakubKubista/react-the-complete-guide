import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../store/actions/index';
import { ROUTES } from '../constants/routes';
import Layout from './layout/layout';
import BurgerBuilder from './burger-builder/burger-builder';
import SignOut from './auth/sign-out/sign-out';
import Spinner from '../components/layout/spinner/spinner';

const Checkout = React.lazy(() => import('./checkout/checkout'));
const Orders = React.lazy(() => import('./orders/orders'));
const Auth = React.lazy(() => import('./auth/auth'));

const App = ({
  onAuthCheckLocalStorage,
  isSignedIn
}) => {

  useEffect(() => {
    onAuthCheckLocalStorage();
  }, [onAuthCheckLocalStorage])

  const routes = (
    <Switch>
      <Route
        path={ROUTES.signIn}
        render={props =>
          <Auth {...props} />
        }
        key={ROUTES.signIn}
      />

      <Route
        path={ROUTES.signOut}
        component={SignOut}
        key={ROUTES.signOut}
      />

      {isSignedIn && <Route
          path={ROUTES.checkout}
          render={props =>
            <Checkout {...props} />
          }
          key={ROUTES.checkout}
      />}

      {isSignedIn && <Route
        path={ROUTES.orders}
        render={props =>
          <Orders {...props} />
        }
        key={ROUTES.orders}
      />}

      <Route
        path={ROUTES.home}
        exact
        component={BurgerBuilder}
        key={ROUTES.home}
      />

      <Redirect
        to={ROUTES.home}
        key={'Redirect'}
      />
    </Switch>
  );

  return (
      <Layout >
        <Suspense fallback={<Spinner/>}>
          {routes}
        </Suspense>
      </Layout>
  );
};

App.propTypes = {
  onAuthCheckLocalStorage: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth && state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckLocalStorage: () => dispatch(actions.authCheckLocalStorage())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
