/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

import Aux from '../../hoc/aux';
import ErrorHandler from '../../hoc/errorHandler';
import BURGER from '../../constants/burger';

import Burger from '../../components/burger-builder/burger/burger';
import BurgerControls from '../../components/burger-builder/burger-controls/burger-controls';
import Modal from '../../components/layout/modal/modal';
import OrderSummary from '../../components/burger-builder/order-summary/order-summary';
import Spinner from '../../components/layout/spinner/spinner';

import axios from '../../axios-orders';

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    price: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
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
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push('price=' + this.state.price);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  componentDidMount() {
    axios.get('https://react-guide-burger.firebaseio.com/orders/ingredients.json')
      .then(response => {
        this.setState({
          ingredients: response.data
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true
        })
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
    let orderSummary = null;

    let burgerStyle = {
      position: 'relative',
      top: '100px',
      textAlign: 'center'
    };
    let burger = this.state.error ? <div style={burgerStyle} >Ingredients cannot be loaded!</div> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
      <Aux>
        <Burger ingredients={this.state.ingredients} />

        <BurgerControls
          add={this.addIngredientHandler}
          remove={this.removeIngredientHandler}
          disabled={disabled}
          purchasable={this.state.purchasable}
          purchasing={this.state.purchasing}
          price={this.state.price}
          order={() => this.updatePurchasing(this.state.purchasing)} />
      </Aux>);

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.price}
        cancel={this.purchasingCancelHandler}
        continue={this.purchasingContinueHandler} />
    }

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchasingCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  };
};

export default ErrorHandler(BurgerBuilder, axios);