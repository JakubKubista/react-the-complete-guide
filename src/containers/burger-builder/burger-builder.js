/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Aux from '../../hoc/aux';
import withErrorHandler from '../../hoc/errorHandler';
import {INGREDIENT_PRICES} from '../../constants/burger';
import * as actionTypes from '../../store/actions/types';

import Burger from '../../components/burger-builder/burger/burger';
import BurgerControls from '../../components/burger-builder/burger-controls/burger-controls';
import Modal from '../../components/layout/modal/modal';
import OrderSummary from '../../components/burger-builder/order-summary/order-summary';
import Spinner from '../../components/layout/spinner/spinner';

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    loading: false,
    error: false
  }

  addIngredientHandler = type => {
    const count = this.props.ingredients[type];
    const updatedIngredients = {
      ...this.props.ingredients
    }
    updatedIngredients[type] = count + 1;
    const price = this.props.price;
    const updatedPrice = price + INGREDIENT_PRICES[type];
    this.setState({
      price: updatedPrice,
      ingredients: updatedIngredients
    });
    this.updatePurchasable(updatedIngredients);
  }

  removeIngredientHandler = type => {
    const count = this.props.ingredients[type];
    if (count <= 0) return;
    const updatedIngredients = {
      ...this.props.ingredients
    }
    updatedIngredients[type] = count - 1;
    const price = this.props.price;
    const updatedPrice = price - INGREDIENT_PRICES[type];
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
    for (let i in this.props.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]));
    }
    queryParams.push('price=' + this.props.price);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  componentDidMount() {
    console.log(this.props);
    // axios.get('https://react-guide-burger.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     console.log(response);
    //     this.setState({
    //       ingredients: response.data
    //     })
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     this.setState({
    //       error: true
    //     })
    //   })
  }

  render() {
    const disabled = {
      ...this.props.ingredients
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

    if (this.props.ingredients) {
      burger = (
      <Aux>
        <Burger ingredients={this.props.ingredients} />

        <BurgerControls
          add={this.props.onIngredientAdded}
          remove={this.props.onIngredientRemoved}
          disabled={disabled}
          purchasable={this.state.purchasable}
          purchasing={this.props.purchasing}
          price={this.props.price}
          order={this.props.onPurchasingOn} />
      </Aux>);

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.price}
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
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    purchasing: state.burgerBuilder.purchasing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.INGREDIENT_ADD, ingredientName: ingredientName}),
    onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.INGREDIENT_REMOVE, ingredientName: ingredientName}),
    onPurchasingOn: () => dispatch({type: actionTypes.PURCHASING_ON}),
    onPurchasingOff: () => dispatch({type: actionTypes.PURCHASING_OFF})
  }
};

const BurgerBuilderWithErrorHandler = withErrorHandler(BurgerBuilder, axios)

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilderWithErrorHandler);