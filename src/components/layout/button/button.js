import React from 'react';
import classes from './button.scss';

const Button = props => (
  <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    disabled={props.disabled}
    onClick={props.click}>
    {props.children}
  </button>
);

export default Button;