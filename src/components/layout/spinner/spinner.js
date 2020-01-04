import React from 'react';
import classes from './spinner.scss';
import { MESSAGES } from '../../../constants/labels';

const spinner = () => (
  <div className={classes.Loader}>{MESSAGES.loading}</div>
);

export default spinner