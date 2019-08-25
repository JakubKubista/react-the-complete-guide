import React from 'react';
import classes from './modal.scss';

const style = show => {
  return {
    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: show ? '1' : '0'
  };
};

const Modal = props => (

  <div
    className={classes.Modal}
    style={style(props.show)}>
    {props.children}
  </div>
);

export default Modal;