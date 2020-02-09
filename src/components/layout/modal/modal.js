import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { memoize } from 'lodash';
import classes from './modal.scss';
import Backdrop from '../backdrop/backdrop';

const getStyles = memoize(show => ({
    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: show ? '1' : '0'
  }
));

const Modal = ({
  children,
  show,
  modalClosed
}) => {
  const styles = getStyles(show);

  return (
    <Fragment>
      <Backdrop
        show={show}
        clickOut={modalClosed} />
      <div
        className={classes.Modal}
        style={styles}>
        {children}
      </div>
  </Fragment>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool.isRequired,
  modalClosed: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  children: null,
};

const preventLoad = (prevProps, nextProps) => (
  nextProps.show === prevProps.show &&
  nextProps.children === prevProps.children
);

export default React.memo(Modal, preventLoad);
