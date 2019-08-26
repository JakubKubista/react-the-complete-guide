import React, { Component } from 'react';
import classes from './layout.scss';
import Aux from '../../hoc/aux';
import Toolbar from '../../components/layout/toolbar/toolbar';
import SideDrawer from '../../components/layout/drawer/side-drawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar clickDrawer={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          close={this.sideDrawerToggleHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  };
};

export default Layout;