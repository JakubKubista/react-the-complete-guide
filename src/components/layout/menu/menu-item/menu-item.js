import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { noop } from 'lodash';

import classes from './menu-item.scss';

const MenuItem = ({
    children,
    link,
    exact,
    closeDrawer
}) => (
    <li className={classes.MenuItem}>
        <NavLink
          to={link}
          exact={exact}
          onClick={closeDrawer}
          activeClassName={classes.active}>
            {children}
        </NavLink>
    </li>
);

MenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  closeDrawer: PropTypes.func
};

MenuItem.defaultProps = {
  closeDrawer: noop
};

export default MenuItem;
