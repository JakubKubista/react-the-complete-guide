import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { MESSAGES, BUTTONS } from '../../../constants/labels';
import Button from '../../layout/button/button';

const OrderSummary = ({
  ingredients,
  price,
  cancel: onCancel,
  continue: onContinue
}) => {
  const ingredientSummary = Object.keys(ingredients)
    .map(ingredientKey => {
      return (
        <li
          style={{textTransform: 'capitalize'}}
          key={ingredientKey}>
          <span>
            {ingredientKey}
          </span>: {ingredients[ingredientKey]}
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
      <p><strong>{MESSAGES.totalPrice}: {price.toFixed(2)}</strong></p>
      <p>{MESSAGES.continueToCheckout}</p>
      <Button
        btnType="Danger"
        click={onCancel}>{BUTTONS.cancel}</Button>
      <Button
        btnType="Success"
        click={onContinue}>{BUTTONS.continue}</Button>
    </Fragment>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired
  }).isRequired,
  price: PropTypes.number.isRequired,
  cancel: PropTypes.func.isRequired,
  continue: PropTypes.func.isRequired
};

export default OrderSummary;
