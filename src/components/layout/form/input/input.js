import React from 'react';
import PropTypes from 'prop-types';

import { MESSAGES } from '../../../../constants/labels';
import classes from './input.scss';

const Input = ({
  invalid,
  shouldValidate,
  touched,
  elementType,
  elementConfig,
  value,
  changed,
  label
}) => {
  let inputElement = null;
  let validationError = null;
  const inputClasses = [classes.InputElement];

  if (invalid && shouldValidate && touched) {
    inputClasses.push(classes.Invalid);
    validationError = <p className={classes.ValidationError}>{MESSAGES.enterValidValue}</p>;
  }

  switch(elementType) {
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
        onChange={changed} />;
      break;

    case ('textarea'):
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
        onChange={changed} />;
      break;

    case ('select'):
      inputElement = <select
        className={inputClasses.join(' ')}
        value={value}
        onChange={changed} >
          {elementConfig.options.map(option => (
            <option
              key={option.value}
              value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      break;

    default:
      inputElement = <input
        className={inputClasses.join(' ')}
        {...elementConfig}
        value={value}
        onChange={changed} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

Input.propTypes = {
  invalid: PropTypes.bool.isRequired,
  shouldValidate: PropTypes.object.isRequired,
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
  touched: PropTypes.bool,
  label: PropTypes.string
};

Input.defaultProps = {
  touched: false,
  label: ''
};

export default Input;
