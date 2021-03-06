import React from 'react';
import {create} from 'react-test-renderer';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter } from 'react-router-dom';

import { MENU_ITEMS } from '../../../constants/menu';
import Menu from './menu';
import MenuItem from './menu-item/menu-item';

configure({adapter: new Adapter()});

describe('<Menu/>', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = shallow(<Menu />);
  })

  it('should show wrapper via debug', () => {
    console.log(wrapper.debug());
  });

  it('should match to snapshot', () => {
    const renderer = create(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('should render 2x <MenuItem /> if isSignedIn is not true', () => {
    expect(wrapper.find(MenuItem)).toHaveLength(2);
  });

  it('should render 3x <MenuItem /> if isSignedIn is true', () => {
    wrapper.setProps({isSignedIn: true});

    expect(wrapper.find(MenuItem)).toHaveLength(3);
  });

  it('should have <MenuItem /> with Sign In', () => {
    expect(wrapper.contains(
      <MenuItem link={MENU_ITEMS.auth.signIn.route} exact>
        {MENU_ITEMS.auth.signIn.label}
      </MenuItem>
    )).toBeTruthy();
  });
  it('should have <MenuItem /> with Sign Out', () => {
    wrapper.setProps({isSignedIn: true});

    expect(wrapper.contains(
      <MenuItem link={MENU_ITEMS.auth.signOut.route} exact>
        {MENU_ITEMS.auth.signOut.label}
      </MenuItem>
    )).toEqual(true);
  });
});