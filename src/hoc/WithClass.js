import React from 'react';
// Can be used for styling, error handling, loading etc.
const withClass = props => (
  <div className={props.classes}>
    {props.children}
  </div>
);

export default withClass;