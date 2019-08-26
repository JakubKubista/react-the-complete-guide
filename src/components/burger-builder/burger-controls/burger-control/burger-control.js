import React from 'react';
import classes from './burger-control.scss';

const BurgerControl = props => (
  <div className={classes.BurgerControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      disabled={props.disabled}
      onClick={props.remove}
      className={classes.Less}>Less</button>
    <button
      onClick={props.add}
      className={classes.More}>More</button>
  </div>
);

export default BurgerControl;