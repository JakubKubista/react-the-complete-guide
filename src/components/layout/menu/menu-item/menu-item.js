import React from 'react';

import classes from './menu-item.scss';

const MenuItem = ( props ) => (
    <li className={classes.MenuItem}>
        <a href={props.link}
          className={props.active ? classes.active : null}>
          {props.children}
        </a>
    </li>
);

export default MenuItem;