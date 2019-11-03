/* eslint-disable no-unused-vars */
import React from 'react';
import classes from './order.scss';

const Order = props => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]
    })
  }

  const ingredientsOutput = ingredients.map(ingredient => {
    return <span
      className={classes.Ingredient}
      key={ingredient.name}>
        {ingredient.name} ({ingredient.amount})
    </span>
  })

  return (
    <div className={classes.Order}>
    <p>Ingredients: {ingredientsOutput}</p>
    <p>Price: <b>USD {Number.parseFloat(props.price).toFixed(2)}</b></p>
  </div>
  )
};

export default Order;