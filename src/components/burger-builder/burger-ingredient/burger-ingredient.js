import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { INGREDIENT_NAMES } from '../../../constants/containers/burger';
import classes from './burger-ingredient.scss';

class BurgerIngredient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case INGREDIENT_NAMES.breadTop:
        ingredient = <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
        break;

      case INGREDIENT_NAMES.salad:
        ingredient = <div className={classes.Salad}></div>
        break;

      case INGREDIENT_NAMES.cheese:
        ingredient = <div className={classes.Cheese}></div>
        break;

      case INGREDIENT_NAMES.meat:
        ingredient = <div className={classes.Meat}></div>
        break;

      case INGREDIENT_NAMES.bacon:
        ingredient = <div className={classes.Bacon}></div>
        break;

      case INGREDIENT_NAMES.breadBottom:
        ingredient = <div className={classes.BreadBottom}></div>
        break;

      default:
        ingredient = null;
        break;
    };

    return ingredient;
  };
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;