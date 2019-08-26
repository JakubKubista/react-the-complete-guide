import React from 'react';
import Logo from '../logo/logo';
import Menu from '../menu/menu';
import classes from './side-drawer.scss';

const SideDrawer = props => {
  return (
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <Menu />
    </div>
  )
};

export default SideDrawer;