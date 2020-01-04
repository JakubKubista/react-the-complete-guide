import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { INGREDIENT_NAMES } from '../../../constants/burger';
import { MESSAGES } from '../../../constants/labels';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import classes from './burger.scss';

// Component was called after Order now button (Pure not)
class Burger extends PureComponent {
  render() {
    // Transform object into array with keys, where
    // each element of object should has nested
    // array element for year value of counter
    let transformedIngredients = Object.keys(this.props.ingredients)
      .map(ingredientKey => {
        return [...Array(this.props.ingredients[ingredientKey])]
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
      <BurgerIngredient type={INGREDIENT_NAMES.BreadTop} />
      {transformedIngredients}
      <BurgerIngredient type={INGREDIENT_NAMES.BreadBottom}  />
    </div>
    )
  }
};

Burger.propTypes = {
  ingredients: PropTypes.object
}

export default Burger;