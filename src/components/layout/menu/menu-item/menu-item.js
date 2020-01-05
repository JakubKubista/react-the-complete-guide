import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './menu-item.scss';

const MenuItem = ( props ) => (
    <li className={classes.MenuItem}>
        <NavLink
          to={props.link}
          exact={props.exact}
          activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
);

export default MenuItem;