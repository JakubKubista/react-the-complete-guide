/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noop } from 'lodash';

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

export const BurgerBuilder = ({
  history,
  ingredients,
  price,
  purchasing,
  error,
  isSignedIn,
  onIngredientInit,
  onIngredientAdded,
  onIngredientRemoved,
  onPurchaseInit,
  onPurchasingOn,
  onPurchasingOff
}) => {

  useEffect(() => {
    onIngredientInit();
  }, [onIngredientInit]);

  const initBurger = useCallback(() => {
    let burger = null;

    if (error) {
      burger = <div style={burgerBuilderStyle}>
        {MESSAGES.ingredientsNotLoaded}
      </div>;
    } else {
      burger = <Spinner />;
    }

    return burger;
  }, [error]);

  const disabledIngredientsButton = useCallback(() => {
    const disabled = {
      ...ingredients
    }

    for (let key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }

    return disabled;
  }, [ingredients]);

  const isPurchasable = useCallback(() => {
    const sum = (Object.values(ingredients))
      .reduce((a, b) => a + b, 0);
    return sum > 0;
  }, [ingredients]);

  const orderHandler = useCallback(() => {
    if (isSignedIn) {
      onPurchasingOn();
    } else {
      history.push(ROUTES.signIn);
    }
  }, [history, isSignedIn, onPurchasingOn])

  const purchasingContinueHandler = useCallback(() => {
    onPurchasingOff();
    onPurchaseInit();
    history.push(ROUTES.checkout);
  }, [history, onPurchaseInit, onPurchasingOff])

  let burger = initBurger();
  let orderSummary = null;

  if (ingredients) {
    burger = (
    <Aux>
      <Burger ingredients={ingredients} />

      <BurgerControls
        add={onIngredientAdded}
        remove={onIngredientRemoved}
        disabled={disabledIngredientsButton()}
        purchasable={isPurchasable()}
        purchasing={purchasing}
        price={price}
        order={orderHandler}
        isSignedIn={isSignedIn} />
    </Aux>);

    orderSummary = <OrderSummary
      ingredients={ingredients}
      price={price}
      cancel={onPurchasingOff}
      continue={purchasingContinueHandler} />
  }

  return (
    <Aux>
      <Modal
        show={purchasing}
        modalClosed={onPurchasingOff}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

BurgerBuilder.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  ingredients: PropTypes.shape({
    salad: PropTypes.number,
    cheese: PropTypes.number,
    meat: PropTypes.number,
    bacon: PropTypes.number
  }),
  price: PropTypes.number,
  purchasing: PropTypes.bool,
  error: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  onIngredientInit: PropTypes.func,
  onIngredientAdded: PropTypes.func,
  onIngredientRemoved: PropTypes.func,
  onPurchaseInit: PropTypes.func,
  onPurchasingOn: PropTypes.func,
  onPurchasingOff: PropTypes.func,
};

BurgerBuilder.defaultProps = {
  history: {
    push: noop
  },
  ingredients: {},
  price: 0,
  purchasing: false,
  error: null,
  isSignedIn: false,
  onIngredientAdded: noop,
  onIngredientRemoved: noop,
  onPurchaseInit: noop,
  onPurchasingOn: noop,
  onPurchasingOff: noop
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
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onPurchasingOn: () => dispatch(actions.purchasingOn()),
    onPurchasingOff: () => dispatch(actions.purchasingOff())
  }
};

const BurgerBuilderWithErrorHandler = withErrorHandler(BurgerBuilder, axios)

export default connect(mapStateToProps, mapDispatchToProps)(
  BurgerBuilderWithErrorHandler
);