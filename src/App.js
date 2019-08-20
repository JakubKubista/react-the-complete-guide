import React from 'react';
import './App.css';

import Person from './components/person'

function App() {
  return (
    <div className="App">
      <h1>Test</h1>
      <p>Works!</p>
      <Person />
    </div>
  );
}

// class App extends Component {
//   render() {
//     return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Test'));
//   }
// }

export default App;
