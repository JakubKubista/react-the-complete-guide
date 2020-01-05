import React from 'react';
import classes from './menu.scss';
import { MENU_ITEMS } from '../../../constants/menu';
import MenuItem from './menu-item/menu-item';

const Menu = (props) => {
  const menuItems = [];
  for (var name in MENU_ITEMS) {
    let element = MENU_ITEMS[name];

    if (name === 'auth') {
      element = props.isSingedIn ? MENU_ITEMS[name].singout : MENU_ITEMS[name].singin;
    }

    menuItems.push(
      <MenuItem
        key={element.route}
        link={element.route}
        exact>
          {element.label}
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