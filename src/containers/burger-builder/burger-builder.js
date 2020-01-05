/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-service';
import Aux from '../../hoc/aux';
import withErrorHandler from '../../hoc/errorHandler';
import * as actions from '../../store/actions/index';
import { ROUTES } from '../../constants/routes';
import { MESSAGES } from '../../constants/labels';

import Burger from '../../components/burger-builder/burger/burger';
import BurgerControls from '../../components/burger-builder/burger-controls/burger-controls';
import Modal from '../../components/layout/modal/modal';
import OrderSummary from '../../components/burger-builder/order-summary/order-summary';
import Spinner from '../../components/layout/spinner/spinner';

const burgerBuilderStyle = {
  position: 'relative',
  top: '100px',
  textAlign: 'center'
};

class BurgerBuilder extends Component {
  componentDidMount() {
    this.props.onIngredientInit();
  }

  initBurger = () => {
    let burger = null;

    if (this.props.error) {
      burger = <div style={burgerBuilderStyle}>
        {MESSAGES.ingredientsNotLoaded}
      </div>;
    } else {
      burger = <Spinner />;
    }

    return burger;
  }

  disabledIngredientsButton = () => {
    const disabled = {
      ...this.props.ingredients
    }

    for (let key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }

    return disabled;
  }

  isPurchasable() {
    const sum = (Object.values(this.props.ingredients))
      .reduce((a, b) => a + b, 0);
    return sum > 0;
  }

  orderHandler = () => {
    if (this.props.isSignedIn) {
      this.props.onPurchasingOn();
    } else {
      this.props.history.push(ROUTES.signIn);
    }
  }

  purchasingContinueHandler = () => {
    this.props.onPurchasingOff();
    this.props.onPurchaseInit();
    this.props.history.push(ROUTES.checkout);
  }

  render() {
    let burger = this.initBurger();
    let orderSummary = null;

    if (this.props.ingredients) {
      burger = (
      <Aux>
        <Burger ingredients={this.props.ingredients} />

        <BurgerControls
          add={this.props.onIngredientAdded}
          remove={this.props.onIngredientRemoved}
          disabled={this.disabledIngredientsButton()}
          purchasable={this.isPurchasable()}
          purchasing={this.props.purchasing}
          price={this.props.price}
          order={this.orderHandler}
          isSignedIn={this.props.isSignedIn} />
      </Aux>);

      orderSummary = <OrderSummary
        ingredients={this.props.ingredients}
        price={this.props.price}
        cancel={this.props.onPurchasingOff}
        continue={this.purchasingContinueHandler} />
    }

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
    purchasing: state.burgerBuilder.purchasing,
    error: state.burgerBuilder.error,
    isSignedIn: state.auth && state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientInit: () => dispatch(actions.ingredientInit()),
    onIngredientAdded: (name) => dispatch(actions.ingredientAdd(name)),
    onIngredientRemoved: (name) => dispatch(actions.ingredientRemove(name)),
    onPurchasingOn: () => dispatch(actions.purchasingOn()),
    onPurchasingOff: () => dispatch(actions.purchasingOff()),
    onPurchaseInit: () => dispatch(actions.purchaseInit())
  }
};

const BurgerBuilderWithErrorHandler = withErrorHandler(BurgerBuilder, axios)

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilderWithErrorHandler);