import React, { Component, Fragment } from 'react';

import { MESSAGES, BUTTONS } from '../../../constants/labels';
import Button from '../../layout/button/button';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(ingredientKey => {
        return (
          <li
            style={{textTransform: 'capitalize'}}
            key={ingredientKey}>
            <span>
              {ingredientKey}
            </span>: {this.props.ingredients[ingredientKey]}
          </li>
        )
      });

    return (
      <Fragment>
        <h3>{MESSAGES.yourOrder}</h3>
        <p>{MESSAGES.burgerWithIngredients}</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>{MESSAGES.totalPrice}: {this.props.price.toFixed(2)}</strong></p>
        <p>{MESSAGES.continueToCheckout}</p>
        <Button
          btnType="Danger"
          click={this.props.cancel}>{BUTTONS.cancel}</Button>
        <Button
          btnType="Success"
          click={this.props.continue}>{BUTTONS.continue}</Button>
      </Fragment>
    );
  };
};

export default OrderSummary;