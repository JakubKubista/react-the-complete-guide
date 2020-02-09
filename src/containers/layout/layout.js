import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Aux from '../../hoc/aux';
import Toolbar from '../../components/layout/toolbar/toolbar';
import SideDrawer from '../../components/layout/drawer/side-drawer';
import Menu from '../../components/layout/menu/menu';
import classes from './layout.scss';

const Layout = ({
  isSignedIn,
  children
}) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <Aux>
      <Toolbar
        clickDrawer={sideDrawerToggleHandler}>
        <Menu
          isSignedIn={isSignedIn}
        />
      </Toolbar>

      <SideDrawer
        isSignedIn={isSignedIn}
        open={showSideDrawer}
        close={sideDrawerToggleHandler}>
        <Menu
          isSignedIn={isSignedIn}
          closeDrawer={sideDrawerToggleHandler}
        />
      </SideDrawer>

      <main className={classes.Content}>
        {children}
      </main>
    </Aux>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isSignedIn: PropTypes.bool
};

Layout.defaultProps = {
  isSignedIn: false
};

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth && state.auth.token !== null
  }
};

export default connect(mapStateToProps)(Layout);
