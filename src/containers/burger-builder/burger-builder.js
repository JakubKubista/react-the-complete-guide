/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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

  const initBurger = () => {
    let burger = null;

    if (error) {
      burger = <div style={burgerBuilderStyle}>
        {MESSAGES.ingredientsNotLoaded}
      </div>;
    } else {
      burger = <Spinner />;
    }

    return burger;
  }

  const disabledIngredientsButton = () => {
    const disabled = {
      ...ingredients
    }

    for (let key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }

    return disabled;
  }

  const isPurchasable = () => {
    const sum = (Object.values(ingredients))
      .reduce((a, b) => a + b, 0);
    return sum > 0;
  }

  const orderHandler = () => {
    if (isSignedIn) {
      onPurchasingOn();
    } else {
      history.push(ROUTES.signIn);
    }
  }

  const purchasingContinueHandler = () => {
    onPurchasingOff();
    onPurchaseInit();
    history.push(ROUTES.checkout);
  }

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
    push: PropTypes.func.isRequired
  }).isRequired,
  ingredients: PropTypes.shape({
    salad: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired
  }),
  price: PropTypes.number.isRequired,
  purchasing: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  onIngredientInit: PropTypes.func.isRequired,
  onIngredientAdded: PropTypes.func.isRequired,
  onIngredientRemoved: PropTypes.func.isRequired,
  onPurchaseInit: PropTypes.func.isRequired,
  onPurchasingOn: PropTypes.func.isRequired,
  onPurchasingOff: PropTypes.func.isRequired,
};

BurgerBuilder.defaultProps = {
  ingredients: null,
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