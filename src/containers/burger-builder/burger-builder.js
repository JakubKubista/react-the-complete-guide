import React, { Component } from 'react';
import Aux from '../../hoc/aux';
import Burger from '../../components/burger/burger';
import BurgerControls from '../../components/burger/burger-controls/burger-controls';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BurgerControls />
      </Aux>
    );
  };
};

export default BurgerBuilder;