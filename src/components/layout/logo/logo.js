import React from 'react';
import classes from './logo.scss';
import burgerLogo from '../../../assets/burger-logo.png';

const Logo = props => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="Burger Builder" />
  </div>
);

export default Logo;