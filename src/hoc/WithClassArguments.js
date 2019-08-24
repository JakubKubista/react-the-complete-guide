import React from 'react';

// This is ES6 classic function, NOT a functional component
const withClassArguments = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent />
    </div>
  );
};

export default withClassArguments;