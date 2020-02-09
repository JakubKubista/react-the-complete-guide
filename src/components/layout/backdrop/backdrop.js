import React from 'react';
import PropTypes from 'prop-types';
import classes from './backdrop.scss';

const Backdrop = ({
  children,
  show,
  clickOut
}) => (

  show && <div
    className={classes.Backdrop}
    onClick={clickOut}>
      {children}
  </div>
);

Backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  clickOut: PropTypes.func.isRequired,
  children: PropTypes.node
}

Backdrop.defaultProps = {
  children: null,
}

export default Backdrop;
