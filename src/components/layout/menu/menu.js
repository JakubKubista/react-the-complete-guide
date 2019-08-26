import React from 'react';
import classes from './menu.scss';

import MenuItem from './menu-item/menu-item';

const Menu = () => (
  <ul className={classes.Menu}>
    <MenuItem link="/" active>Burger Builder</MenuItem>
    <MenuItem link="/">Checkout</MenuItem>
  </ul>
);

export default Menu;