import React from 'react';
import PropTypes from 'prop-types';

import { INGREDIENT_NAMES } from '../../../constants/containers/burger';
import { MESSAGES } from '../../../constants/labels';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import classes from './burger.scss';

// Component was called after Order now button (Pure not)
const Burger = ({
  ingredients
}) => {
  // Transform object into array with keys, where
  // each element of object should has nested
  // array element for year value of counter
  let transformedIngredients = Object.keys(ingredients)
    .map(ingredientKey => {
      return [...Array(ingredients[ingredientKey])]
        .map((_, index) => {
          return <BurgerIngredient
            key={ingredientKey + index}
            type={ingredientKey} />
        });
    })
    .flat();

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>{MESSAGES.noIngredients}</p>;
  }

  return (
    <div className={classes.Burger}>
    <BurgerIngredient type={INGREDIENT_NAMES.breadTop} />
    {transformedIngredients}
    <BurgerIngredient type={INGREDIENT_NAMES.breadBottom}  />
  </div>
  )
};

Burger.propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired
  }).isRequired
}

export default React.memo(Burger);
