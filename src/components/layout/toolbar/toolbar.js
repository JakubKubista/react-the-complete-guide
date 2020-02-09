import React from 'react';
import PropTypes from 'prop-types';

import { MENU_ICON } from '../../../constants/menu';
import Logo from '../logo/logo';
import Menu from '../menu/menu';

import classes from './toolbar.scss';

const Toolbar = ({
  children,
  clickDrawer
}) => (
    <header className={classes.Toolbar}>
      <div onClick={clickDrawer}  className={classes.MobileOnly}>
        <img
          src={MENU_ICON.src}
          style={MENU_ICON.style}
          alt={MENU_ICON.alt} />
      </div>

      <div className={classes.Logo}>
        <Logo/>
      </div>

      <div className={classes.DesktopOnly}>
        <Menu {...children.props} />
      </div>
    </header>
);

Toolbar.propTypes = {
  children: PropTypes.node.isRequired,
  clickDrawer: PropTypes.func.isRequired
};

export default Toolbar;
