import React from 'react';
import PropTypes from 'prop-types';
import classes from './toolbar.scss';
import MENU from '../../../constants/menu';
import Logo from '../logo/logo';
import Menu from '../menu/menu';

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div onClick={props.clickDrawer}>
      <img
        src={MENU.ICON.src}
        style={MENU.ICON.style}
        alt={MENU.ICON.alt} />
    </div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <div className={classes.DesktopOnly}>
      <Menu />
    </div>
  </header>
);

Toolbar.propTypes = {
  clickDrawer: PropTypes.func
}

export default Toolbar;