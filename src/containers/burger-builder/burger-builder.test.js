import React from 'react';
import {create} from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';

import { BurgerBuilder } from './burger-builder';
import BurgerControls from '../../components/burger-builder/burger-controls/burger-controls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onIngredientInit={() => {}} />);
    wrapper.setProps({ingredients: {salad: 0}});
  })

  it('should match to snapshot', () => {
    const renderer = create(
      <BrowserRouter>
        <BurgerBuilder onIngredientInit={() => {}} />
      </BrowserRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should show render <BurgerControls /> if ingredients are set', () => {
    expect(wrapper.find(BurgerControls)).toHaveLength(1);
  });

  it('should have correct ingredients state', () => {
    const state = {ingredients: {salad: 4}};

    wrapper.setState(state);

    expect(wrapper.state()).toEqual(state);
  });
});