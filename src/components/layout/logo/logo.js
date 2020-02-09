import React from 'react';

import { MESSAGES } from '../../../constants/labels';
import burgerLogo from '../../../assets/images/burger-logo.png';
import classes from './logo.scss';

const Logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt={MESSAGES.burgerBuilder} />
  </div>
);

export default Logo;
