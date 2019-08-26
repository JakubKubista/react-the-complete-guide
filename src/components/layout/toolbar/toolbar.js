import React from 'react';
import classes from './toolbar.scss';
import Logo from '../logo/logo';
import Menu from '../menu/menu';

const iconLink = "https://icon-library.net/images/white-hamburger-menu-icon/white-hamburger-menu-icon-24.jpg";

const Toolbar = props => (
  <header className={classes.Toolbar}>
    <div onClick={props.clickDrawer}>
      <img src={iconLink} height="64px" />
    </div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <div className={classes.DesktopOnly}>
      <Menu />
    </div>
  </header>
);

export default Toolbar;