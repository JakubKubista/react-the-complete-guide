import React from 'react';
import PropTypes from 'prop-types';
import classes from './button.scss';

const Button = ({
  children,
  btnType,
  disabled,
  click
}) => (
  <button
    className={[classes.Button, classes[btnType]].join(' ')}
    disabled={disabled}
    onClick={click}>
    {children}
  </button>
);

Button.propTypes = {
  btnType: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  disabled: false
};

export default Button;
