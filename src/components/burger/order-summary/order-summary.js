import React, { Fragment } from 'react';
import Button from '../../layout/button/button';

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
      <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button
        btnType="Danger"
        click={props.cancel}>CANCEL</Button>
      <Button
        btnType="Success"
        click={props.continue}>CONTINUE</Button>
    </Fragment>
  );
};

export default OrderSummary;