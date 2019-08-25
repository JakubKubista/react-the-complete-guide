import React from 'react';
import classes from './backdrop.scss';

const Backdrop = props => (
  props.show ?
    <div
      className={classes.Backdrop}
      onClick={props.clickOut}>
      {props.children}
    </div> : null
);

export default Backdrop;