import React from 'react';

import { MESSAGES } from '../../../constants/labels';
import classes from './spinner.scss';

const spinner = () => (
  <div className={classes.Loader}>{MESSAGES.loading}</div>
);

export default spinner;
