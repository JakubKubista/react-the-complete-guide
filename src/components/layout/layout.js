import React from 'react';
import classes from './layout.scss';
import Aux from '../../hoc/aux';
import Toolbar from './toolbar/toolbar';
import SideDrawer from './drawer/side-drawer';

const Layout = props => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default Layout;