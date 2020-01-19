import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Menu from './menu';
import MenuItem from './menu-item/menu-item';

configure({adapter: new Adapter()});

describe('<Menu/>', () => {
  it('should render two <MenuItem /> elements if isSignedIn is not true', () => {
    const wrapper = shallow(<Menu />);

    expect(wrapper.find(MenuItem)).toHaveLength(2);
  });
});