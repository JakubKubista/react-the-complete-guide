import React from 'react';

// createContext can contains any other data type, not only object
const authContext = React.createContext({
  authenticated: false,
  login: () => { }
});

export default authContext;