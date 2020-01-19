import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Menu from './menu';
import MenuItem from './menu-item/menu-item';

configure({adapter: new Adapter()});

describe('<Menu/>', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Menu />);
  })

  it('should render 2x <MenuItem /> if isSignedIn is not true', () => {
    expect(wrapper.find(MenuItem)).toHaveLength(2);
  });

  it('should render 3x <MenuItem /> if isSignedIn is true', () => {
    wrapper.setProps({isSignedIn: true});

    expect(wrapper.find(MenuItem)).toHaveLength(3);
  });
});