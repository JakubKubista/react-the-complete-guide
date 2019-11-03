import React from 'react';
import classes from './menu.scss';
import MENU from '../../../constants/menu';
import MenuItem from './menu-item/menu-item';

const Menu = () => (
  <ul className={classes.Menu}>
    <MenuItem link="/" exact>{MENU.ELEMENTS.home}</MenuItem>
    <MenuItem link="/orders">{MENU.ELEMENTS.orders}</MenuItem>
  </ul>
);

export default Menu;