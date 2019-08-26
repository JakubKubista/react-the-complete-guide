import React, { Component } from 'react';

import Aux from '../../hoc/aux';
import BURGER from '../../constants/burger';

import Burger from '../../components/burger-builder/burger/burger';
import BurgerControls from '../../components/burger-builder/burger-controls/burger-controls';
import Modal from '../../components/layout/modal/modal';
import OrderSummary from '../../components/burger-builder/order-summary/order-summary';

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    price: 4,
    purchasable: false,
    purchasing: false
  }

  addIngredientHandler = type => {
    const count = this.state.ingredients[type];
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = count + 1;
    const price = this.state.price;
    const updatedPrice = price + BURGER.INGREDIENT_PRICES[type];
    this.setState({
      price: updatedPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchasable(updatedIngredients);
  }

  removeIngredientHandler = type => {
    const count = this.state.ingredients[type];
    if (count <= 0) return;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = count - 1;
    const price = this.state.price;
    const updatedPrice = price - BURGER.INGREDIENT_PRICES[type];
    this.setState({
      price: updatedPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchasable(updatedIngredients);
  }

  updatePurchasable(ingredients) {
    const sum = (Object.values(ingredients))
      .reduce((a, b) => a + b, 0);
    this.setState({ purchasable: sum > 0 });
  }

  updatePurchasing() {
    const oldState = this.state.purchasing;
    this.setState({ purchasing: !oldState });
  }

  purchasingCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  }

  purchasingContinueHandler = () => {
    console.log('You continue!');
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
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasingCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.price}
            cancel={this.purchasingCancelHandler}
            continue={this.purchasingContinueHandler} />
        </Modal>

        <Burger ingredients={this.state.ingredients} />

        <BurgerControls
          add={this.addIngredientHandler}
          remove={this.removeIngredientHandler}
          disabled={disabled}
          purchasable={this.state.purchasable}
          purchasing={this.state.purchasing}
          price={this.state.price}
          order={() => this.updatePurchasing(this.state.purchasing)} />
      </Aux>
    );
  };
};

export default BurgerBuilder;