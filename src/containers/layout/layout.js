import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/aux';
import Toolbar from '../../components/layout/toolbar/toolbar';
import SideDrawer from '../../components/layout/drawer/side-drawer';
import Menu from '../../components/layout/menu/menu';
import classes from './layout.scss';

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
        <Toolbar
          clickDrawer={this.sideDrawerToggleHandler}>
          <Menu
            isSingedIn={this.props.isSingedIn}
          />
        </Toolbar>
        <SideDrawer
          isSingedIn={this.props.isSingedIn}
          open={this.state.showSideDrawer}
          close={this.sideDrawerToggleHandler}>
          <Menu
            isSingedIn={this.props.isSingedIn}
          />
        </SideDrawer>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  };
};

const mapStateToProps = state => {
  return {
    isSingedIn: state.auth && state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);