import React from 'react';

import { MESSAGES, BUTTONS } from '../../../constants/labels';
import Button from '../../layout/button/button';
import Burger from '../burger/burger';
import classes from './checkout-summary.scss';

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>{MESSAGES.enjoyYourMeal}</h1>
        <div className={classes.BudgerContainer}>
          <Burger ingredients={props.ingredients} />
        </div>
        <div className={classes.CheckoutSummaryContent}>
          <Button
            btnType="Danger"
            click={props.cancel}>{BUTTONS.cancel}</Button>
          <Button
            btnType="Success"
            click={props.continue}>{BUTTONS.continue}</Button>
        </div>
    </div>
  )
}

export default CheckoutSummary;