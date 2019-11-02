import React from 'react';
import Burger from '../burger/burger';
import Button from '../../layout/button/button';
import classes from './checkout-summary.scss';

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
        <div className={classes.BudgerContainer}>
          <Burger ingredients={props.ingredients} />
        </div>
        <Button
          btnType="Danger"
          click={props.cancel}>CANCEL</Button>
        <Button
          btnType="Success"
          click={props.continue}>CONTINUE</Button>
    </div>
  )
}

export default CheckoutSummary;