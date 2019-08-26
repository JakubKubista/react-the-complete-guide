import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classes from './modal.scss';
import Backdrop from '../backdrop/backdrop';

const style = show => {
  return {
    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: show ? '1' : '0'
  };
};

class Modal extends Component {

  // More straightforward and less checks than PureComponent
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  componentDidUpdate() {
    console.log('[Modal] componentDidUpdate')
  }

  render() {
    return (
      <Fragment>
        <Backdrop
          show={this.props.show}
          clickOut={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={style(this.props.show)}>
          {this.props.children}
        </div>
    </Fragment>
    )
  }
}

  Modal.propTypes = {
    show: PropTypes.bool,
    modalClosed: PropTypes.func,
  }

export default Modal;