import React from 'react';
import PropTypes from 'prop-types';
import classes from './toolbar.scss';
import Logo from '../logo/logo';
import Menu from '../menu/menu';

const iconMenu = {
  src: 'https://icon-library.net/images/white-hamburger-menu-icon/white-hamburger-menu-icon-24.jpg',
  style: {
    height: '64px',
    marginTop: '6px'
  },
  alt: 'icon-menu'
}

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div onClick={props.clickDrawer}>
      <img
        src={iconMenu.src}
        style={iconMenu.style}
        alt={iconMenu.alt} />
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