/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Aux from '../../hoc/aux';
import withErrorHandler from '../../hoc/errorHandler';
import * as actionCreators from '../../store/actions/index';

import Burger from '../../components/burger-builder/burger/burger';
import BurgerControls from '../../components/burger-builder/burger-controls/burger-controls';
import Modal from '../../components/layout/modal/modal';
import OrderSummary from '../../components/burger-builder/order-summary/order-summary';
import Spinner from '../../components/layout/spinner/spinner';

class BurgerBuilder extends Component {
  state = {
    loading: false,
    error: false
  }

  isPurchasable() {
    const sum = (Object.values(this.props.ingredients))
      .reduce((a, b) => a + b, 0);
    return sum > 0;
  }

  purchasingContinueHandler = () => {
    this.props.history.push('/checkout');
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
    onIngredientAdded: (ingredientName) => dispatch(actionCreators.ingredientAdd(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actionCreators.ingredientRemove(ingredientName)),
    onPurchasingOn: () => dispatch(actionCreators.purchasingOn()),
    onPurchasingOff: () => dispatch(actionCreators.purchasingOff())
  }
};

const BurgerBuilderWithErrorHandler = withErrorHandler(BurgerBuilder, axios)

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilderWithErrorHandler);