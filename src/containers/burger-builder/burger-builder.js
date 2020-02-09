/* eslint-disable no-unused-vars */
import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
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
  history
}) => {
  const {
    ingredients,
    price,
    purchasing,
    error,
    isSignedIn
  } = useSelector(state => ({
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.price,
    purchasing: state.burgerBuilder.purchasing,
    error: state.burgerBuilder.error,
    isSignedIn: state.auth && state.auth.token !== null
  }));

  const dispatch = useDispatch();

  const {
    onIngredientInit,
    onIngredientAdded,
    onIngredientRemoved,
    onPurchaseInit,
    onPurchasingOn,
    onPurchasingOff
  } = ({
    onIngredientInit: useCallback(() => dispatch(actions.ingredientInit()), [dispatch]),
    onIngredientAdded: useCallback((name) => dispatch(actions.ingredientAdd(name)), [dispatch]),
    onIngredientRemoved: useCallback((name) => dispatch(actions.ingredientRemove(name)), [dispatch]),
    onPurchaseInit: useCallback(() => dispatch(actions.purchaseInit()), [dispatch]),
    onPurchasingOn: useCallback(() => dispatch(actions.purchasingOn()), [dispatch]),
    onPurchasingOff: useCallback(() => dispatch(actions.purchasingOff()), [dispatch])
  });

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
  })
};

BurgerBuilder.defaultProps = {
  history: {
    push: noop
  }
};

export default withErrorHandler(BurgerBuilder, axios);
