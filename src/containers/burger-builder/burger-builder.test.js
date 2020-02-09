import React from 'react';
import {create} from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';

import { BurgerBuilder } from './burger-builder';
import BurgerControls from '../../components/burger-builder/burger-controls/burger-controls';

configure({adapter: new Adapter()});

jest.mock("react-redux", () => ({
  useSelector: () => ({
    ingredients: {salad: 0},
    price: 0,
    purchasing: false,
    error: null,
    isSignedIn: false
  }),
  useDispatch: () => jest.fn()
}));

describe('<BurgerBuilder/>', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder />);
  })

  it('should match to snapshot', () => {

    const renderer = create(
      <BrowserRouter>
        <BurgerBuilder />
      </BrowserRouter>
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should show render <BurgerControls /> if ingredients are set', () => {
    expect(wrapper.find(BurgerControls)).toHaveLength(1);
  });

  it.skip('should have correct ingredients state', () => {
    // The component is stateless, but it's general reusable solution
    const state = {ingredients: {salad: 4}};

    wrapper.setState(state);

    expect(wrapper.state()).toEqual(state);
  });
});