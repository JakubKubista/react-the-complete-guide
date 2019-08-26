import React from 'react';
import classes from './toolbar.scss';
import Logo from '../logo/logo';
import Menu from '../menu/menu';

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <Menu />
  </header>
);

export default Toolbar;