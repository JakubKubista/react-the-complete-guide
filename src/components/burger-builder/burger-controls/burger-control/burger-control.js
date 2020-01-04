import React from 'react';

import { BUTTONS } from '../../../../constants/labels';
import classes from './burger-control.scss';

const BurgerControl = props => (
  <div className={classes.BurgerControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      disabled={props.disabled}
      onClick={props.remove}
      className={classes.Less}>{BUTTONS.less}</button>
    <button
      onClick={props.add}
      className={classes.More}>{BUTTONS.more}</button>
  </div>
);

export default BurgerControl;