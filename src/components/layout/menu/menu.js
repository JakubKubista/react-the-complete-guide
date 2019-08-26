import React from 'react';
import classes from './menu.scss';

const Menu = props => (
  <ul className={classes.Menu}>
    <li><a href="/" className={classes.Active} >Burger Builder</a></li>
    <li><a href="/">Ceckout</a></li>
  </ul>
);

export default Menu;