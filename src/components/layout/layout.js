import React from 'react';
import classes from './layout.scss';
import Aux from '../../hoc/aux';
import Toolbar from './toolbar/toolbar';


const Layout = props => (
  <Aux>
    <Toolbar />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default Layout;