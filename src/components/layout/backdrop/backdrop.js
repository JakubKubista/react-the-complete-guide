import React from 'react';
import classes from './backgrop.scss';

const Backdrop = props => (
  props.show ? <div className={classes.Backdrop}>
    {props.children}
  </div> : null
);

export default Backdrop;