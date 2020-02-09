import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/aux';
import Toolbar from '../../components/layout/toolbar/toolbar';
import SideDrawer from '../../components/layout/drawer/side-drawer';
import Menu from '../../components/layout/menu/menu';
import classes from './layout.scss';

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  }

  return (
    <Aux>
      <Toolbar
        clickDrawer={sideDrawerToggleHandler}>
        <Menu
          isSignedIn={props.isSignedIn}
        />
      </Toolbar>
      <SideDrawer
        isSignedIn={props.isSignedIn}
        open={showSideDrawer}
        close={sideDrawerToggleHandler}>
        <Menu
          isSignedIn={props.isSignedIn}
          closeDrawer={sideDrawerToggleHandler}
        />
      </SideDrawer>
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth && state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);