import React from 'react';
import PropTypes from 'prop-types';

import { BUTTONS } from '../../../../constants/labels';
import classes from './burger-control.scss';

const BurgerControl = ({
  label,
  disabled,
  remove,
  add
}) => (
  <div className={classes.BurgerControl}>
    <div className={classes.Label}>{label}</div>
    <button
      disabled={disabled}
      onClick={remove}
      className={classes.Less}>{BUTTONS.less}</button>
    <button
      onClick={add}
      className={classes.More}>{BUTTONS.more}</button>
  </div>
);

BurgerControl.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  remove: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired
};
BurgerControl.defaultProps = {
  disabled: false
};

export default BurgerControl;