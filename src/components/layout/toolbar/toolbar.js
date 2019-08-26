import React from 'react';
import classes from './toolbar.scss';
import Logo from '../logo/logo';
import Menu from '../menu/menu';

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>
      <Menu />
    </nav>
  </header>
);

export default Toolbar;