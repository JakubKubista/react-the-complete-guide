import React, { Component, Fragment } from 'react';
import Button from '../../layout/button/button';

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log('[OrderSummary] componentDidUpdate')
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(ingredientKey => {
        return (
          <li
            style={{textTransform: 'capitalize'}}
            key={ingredientKey}>
            <span>
              {ingredientKey}
            </span>: {this.props.ingredients[ingredientKey]}
          </li>
        )
      });

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients: </p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          btnType="Danger"
          click={this.props.cancel}>CANCEL</Button>
        <Button
          btnType="Success"
          click={this.props.continue}>CONTINUE</Button>
      </Fragment>
    );
  };
};

export default OrderSummary;