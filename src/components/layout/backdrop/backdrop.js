import React from 'react';
import PropTypes from 'prop-types';
import classes from './backdrop.scss';

const Backdrop = props => (
  props.show ?
    <div
      className={classes.Backdrop}
      onClick={props.clickOut}>
      {props.children}
    </div> : null
);

Backdrop.propTypes = {
  show: PropTypes.bool,
  clickOut: PropTypes.func
}

export default Backdrop;