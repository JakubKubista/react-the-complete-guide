import React from 'react';
import classes from './burger-controls.scss';
import BurgerControl from './burger-control/burger-control';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
]

const BurgerControls = props => (
  <div className={classes.BurgerControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(control => (
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

export default BurgerControls;