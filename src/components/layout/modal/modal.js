import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classes from './modal.scss';
import Backdrop from '../backdrop/backdrop';

const style = show => {
  return {
    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: show ? '1' : '0'
  };
};

const Modal = props =>
  <Fragment>
    <Backdrop
      show={props.show}
      clickOut={props.modalClosed} />
    <div
      className={classes.Modal}
      style={style(props.show)}>
      {props.children}
    </div>
  </Fragment>;

  Modal.propTypes = {
    show: PropTypes.bool,
    modalClosed: PropTypes.func,
  }

export default Modal;