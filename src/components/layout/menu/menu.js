import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import { MENU_ITEMS } from '../../../constants/menu';
import MenuItem from './menu-item/menu-item';
import classes from './menu.scss';

const Menu = ({
  isSignedIn,
  closeDrawer
}) => {
  const menuItems = [];
  for (var name in MENU_ITEMS) {
    let element = MENU_ITEMS[name];

    if (name === 'auth') {
      element = isSignedIn ? MENU_ITEMS[name].signOut : MENU_ITEMS[name].signIn;
    }

    if (name === 'orders' && !isSignedIn) continue;

    menuItems.push(
      <MenuItem
        key={element.route}
        link={element.route}
        closeDrawer={closeDrawer}
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

Menu.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func,
};

Menu.defaultProps = {
  closeDrawer: noop
};

export default Menu;
