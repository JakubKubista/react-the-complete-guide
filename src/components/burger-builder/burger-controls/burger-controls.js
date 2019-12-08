import React from 'react';
import PropTypes from 'prop-types';
import classes from './burger-controls.scss';
import BurgerControl from './burger-control/burger-control';
import {CONTROLS} from '../../../constants/burger';

const BurgerControls = props => (
  <div className={classes.BurgerControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {CONTROLS.map(control => (
      <BurgerControl
        key={control.type}
        label={control.label}
        add={() => props.add(control.type)}
        remove={() => props.remove(control.type)}
        disabled={props.disabled[control.type]} />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.order}>ORDER NOW</button>
  </div>
);

BurgerControls.propTypes = {
  price: PropTypes.number,
  purchasable: PropTypes.bool,
  disabled: PropTypes.object,
  order: PropTypes.func,
}

export default BurgerControls;