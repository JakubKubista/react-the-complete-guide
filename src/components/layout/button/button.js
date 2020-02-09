import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
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
  children: PropTypes.node.isRequired,
  click: PropTypes.func,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  click: noop,
  disabled: false
};

export default Button;
