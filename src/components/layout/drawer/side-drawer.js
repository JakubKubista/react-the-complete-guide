import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Logo from '../logo/logo';
import Menu from '../menu/menu';
import Backdrop from '../backdrop/backdrop';
import classes from './side-drawer.scss';

const SideDrawer = ({
  children,
  open,
  close
}) => {
  const style = open ? classes.Open : classes.Close;
  const attachedClasses = [classes.SideDrawer, style];

  return (
    <Fragment>
      <Backdrop
        show={open}
        clickOut={close}
      />

      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <Menu
          {...children.props}
          className={classes.Menu}
        />
      </div>
    </Fragment>
  );
};

SideDrawer.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default SideDrawer;
