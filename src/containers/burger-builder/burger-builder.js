/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Aux from '../../hoc/aux';
import withErrorHandler from '../../hoc/errorHandler';
import BURGER from '../../constants/burger';
import * as actionTypes from '../../store/actions/types';

import Burger from '../../components/burger-builder/burger/burger';
import BurgerControls from '../../components/burger-builder/burger-controls/burger-controls';
import Modal from '../../components/layout/modal/modal';
import OrderSummary from '../../components/burger-builder/order-summary/order-summary';
import Spinner from '../../components/layout/spinner/spinner';

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    price: 4,
    purchasable: false,
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
    axios.get('https://react-guide-burger.firebaseio.com/ingredients.json')
      .then(response => {
        console.log(response);
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
          purchasing={this.props.purchasing}
          price={this.state.price}
          order={this.props.onPurchasingOn} />
      </Aux>);

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.price}
        cancel={this.props.onPurchasingOff}
        continue={this.purchasingContinueHandler} />
    }

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Aux>
        <Modal
          show={this.props.purchasing}
          modalClosed={this.purchasingCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  };
};

const mapStateToProps = state => {
  return {
    purchasing: state.purchasing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchasingOn: () => dispatch({type: actionTypes.PURCHASING_ON}),
    onPurchasingOff: () => dispatch({type: actionTypes.PURCHASING_OFF})
  }
};

const BurgerBuilderConnected = connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);

export default withErrorHandler(BurgerBuilderConnected, axios);