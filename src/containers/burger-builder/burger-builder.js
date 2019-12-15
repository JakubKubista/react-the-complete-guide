/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Aux from '../../hoc/aux';
import withErrorHandler from '../../hoc/errorHandler';
import * as actions from '../../store/actions/index';

import Burger from '../../components/burger-builder/burger/burger';
import BurgerControls from '../../components/burger-builder/burger-controls/burger-controls';
import Modal from '../../components/layout/modal/modal';
import OrderSummary from '../../components/burger-builder/order-summary/order-summary';
import Spinner from '../../components/layout/spinner/spinner';

class BurgerBuilder extends Component {
  componentDidMount() {
    this.props.onIngredientInit();
  }

  isPurchasable() {
    const sum = (Object.values(this.props.ingredients))
      .reduce((a, b) => a + b, 0);
    return sum > 0;
  }

  purchasingContinueHandler = () => {
    this.props.onPurchasingOff();
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');
  }

  render() {
    const disabled = {
      ...this.props.ingredients
    }

    for (let key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }

    let orderSummary = null;

    let burgerStyle = {
      position: 'relative',
      top: '100px',
      textAlign: 'center'
    };

    let burger = this.props.error ? <div style={burgerStyle} >Ingredients cannot be loaded!</div> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
      <Aux>
        <Burger ingredients={this.props.ingredients} />

        <BurgerControls
          add={this.props.onIngredientAdded}
          remove={this.props.onIngredientRemoved}
          disabled={disabled}
          purchasable={this.isPurchasable()}
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
    error: state.burgerBuilder.error
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