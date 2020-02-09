/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { MESSAGES } from '../../../constants/labels';
import classes from './order.scss';

const Order = ({
  ingredients: initIngredients,
  price
}) => {
  const ingredients = [];

  for (let ingredientName in initIngredients) {
    ingredients.push({
      name: ingredientName,
      amount: initIngredients[ingredientName]
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
    <p>{MESSAGES.ingredients}: {ingredientsOutput}</p>
    <p>{MESSAGES.price}: <b>{MESSAGES.currencyUsd} {Number.parseFloat(price).toFixed(2)}</b></p>
  </div>
  )
};

Order.propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired
  }).isRequired,
  price: PropTypes.number.isRequired
};

export default Order;
