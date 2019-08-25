import React, { Fragment } from 'react';

const OrderSummary = props => {

  const liStyle = {
    textTransform: 'capitalize'
  };

  const ingredientSummary = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return (
        <li
          style={liStyle}
          key={ingredientKey}>
          <span>
            {ingredientKey}
          </span>: {props.ingredients[ingredientKey]}
        </li>
      )
    });

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients: </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </Fragment>
  );
};

export default OrderSummary;