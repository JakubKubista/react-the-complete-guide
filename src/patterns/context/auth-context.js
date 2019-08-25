import React from 'react';
// Very useful tool if you have a long components chains of props
// and you don't use these props between components

// CreateContext can contains any other data type, not only object
const authContext = React.createContext({
  authenticated: false,
  login: () => { }
});

export default authContext;