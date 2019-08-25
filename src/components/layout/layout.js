import React from 'react';
import Aux from '../../hoc/aux';
import classes from './layout.scss';

const Layout = props => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default Layout;