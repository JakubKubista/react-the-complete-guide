import React from 'react';
import classes from './toolbar.scss';
import Logo from '../logo/logo';

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>
      <ul>Item</ul>
      <ul>Item</ul>
    </nav>
  </header>
);

export default Toolbar;