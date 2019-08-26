import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import classes from './burger.scss';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';

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
  .flat()
// The same like a .flat(1):
// .reduce(
//   (arr, el) => {
//     return arr.concat(el)
//   }, []);

if (transformedIngredients.length === 0) {
  transformedIngredients = <p>Please start adding ingredients.</p>;
}
    return (
      <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
    )
  }
};

Burger.propTypes = {
  ingredients: PropTypes.object
}

export default Burger;