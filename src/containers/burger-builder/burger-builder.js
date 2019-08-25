import React, { Component } from 'react';
import Aux from '../../hoc/aux';
import Burger from '../../components/burger/burger';
import BurgerControls from '../../components/burger/burger-controls/burger-controls';

const INGREDIENT_PRICES = {
  salad: 0.5,
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
    price: 4,
    purchasable: false
  }
  updatePurchase(ingredients) {
    const sum = (Object.values(ingredients))
      .reduce((a, b) => a + b, 0);
    this.setState({ purchasable: sum > 0 });
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
    });
    this.updatePurchase(updatedIngredients);
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
    });
    this.updatePurchase(updatedIngredients);
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
          disabled={disabled}
          purchasable={this.state.purchasable}
          price={this.state.price} />
      </Aux>
    );
  };
};

export default BurgerBuilder;