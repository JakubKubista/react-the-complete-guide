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
    {controls.map(control => (
      <BurgerControl
        key={control.type}
        label={control.label}
        add={() => props.add(control.type)}
        remove={() => props.remove(control.type)}
        disabled={props.disabled[control.type]} />
    ))}
  </div>
);

export default BurgerControls;