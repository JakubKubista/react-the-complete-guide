import React from 'react';
import classes from './menu.scss';
import { MENU_ELEMENTS } from '../../../constants/menu';
import MenuItem from './menu-item/menu-item';

const Menu = () => {
  const menuItems = [];
  for (var element in MENU_ELEMENTS.routes) {
    menuItems.push(
      <MenuItem
        key={MENU_ELEMENTS.routes[element]}
        link={MENU_ELEMENTS.routes[element]}
        exact>
          {MENU_ELEMENTS.labels[element]}
      </MenuItem>
    );
  }

  return (
    <ul className={classes.Menu}>
      {menuItems}
   </ul>
  )
};

export default Menu;