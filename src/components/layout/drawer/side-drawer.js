import React, { Fragment } from 'react';
import Logo from '../logo/logo';
import Menu from '../menu/menu';
import Backdrop from '../backdrop/backdrop';
import classes from './side-drawer.scss';

const SideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Fragment>
      <Backdrop
        show={props.open}
        clickOut={props.close} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <Menu className={classes.Menu} />
      </div>
    </Fragment>
  )
};

export default SideDrawer;