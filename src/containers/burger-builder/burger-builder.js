import React, { Component } from 'react';
import Aux from '../../hoc/aux';
import Burger from '../../components/burger/burger';
import BurgerControls from '../../components/burger/burger-controls/burger-controls';

const INGREDIENT_PRICES = {
  salar: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    price: 4
  }

  addIngredientHandler = type => {
    const count = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = count + 1;
    const price = this.state.price;
    const updatedPrice = price + INGREDIENT_PRICES[type];
    this.setState({
      price: updatedPrice,
      ingredients: updatedIngredients
    })
  }

  removeIngredientHandler = type => {
    const count = this.state.ingredients[type];
    if (count <= 0) return;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = count - 1;
    const price = this.state.price;
    const updatedPrice = price - INGREDIENT_PRICES[type];
    this.setState({
      price: updatedPrice,
      ingredients: updatedIngredients
    })

  }

  render() {
    const disabled = {
      ...this.state.ingredients
    }
    // eslint-disable-next-line
    for (let key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls
          add={this.addIngredientHandler}
          remove={this.removeIngredientHandler}
          disabled={disabled} />
      </Aux>
    );
  };
};

export default BurgerBuilder;