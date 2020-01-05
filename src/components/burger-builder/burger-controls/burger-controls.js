import React from 'react';
import PropTypes from 'prop-types';

import { MESSAGES, BUTTONS } from '../../../constants/labels';
import { CONTROLS } from '../../../constants/containers/burger';
import BurgerControl from './burger-control/burger-control';
import classes from './burger-controls.scss';

const BurgerControls = props => (
  <div className={classes.BurgerControls}>
    <p>{MESSAGES.price}: <b>{MESSAGES.currencyUsd} {props.price.toFixed(2)}</b></p>
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
      onClick={props.order}>{props.isSignedIn ? BUTTONS.orderNow : BUTTONS.signInToOrder}</button>
  </div>
);

BurgerControls.propTypes = {
  price: PropTypes.number,
  purchasable: PropTypes.bool,
  disabled: PropTypes.object,
  order: PropTypes.func,
}

export default BurgerControls;