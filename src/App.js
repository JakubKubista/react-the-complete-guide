import React, { useState } from 'react';
import './App.css';

import Person from './components/person'
import Car from './components/car'

const App = () => {

  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Peter', age: 21 },
      { name: 'Tim', age: 30 }
    ],
    showPersons: false
  });

  const [noteState] = useState('Some additionals');

  console.log(personsState, noteState)

  const togglePersonsHandler = () => {
    setPersonsState({
      persons: personsState.persons,
      showPersons: !personsState.showPersons
    });
  }

  const switchNameHandler = (event) => {
    setPersonsState({
      persons: [
        { name: event.target.value, age: 28 },
        { name: 'Peter', age: 21 },
        { name: 'Tim', age: 36 }
      ]
    })
  }

  return (
    <div className="App" >
      <h1>Test</h1>
      <p>Works!</p>
      <button onClick={togglePersonsHandler}>Toggle</button>
      {
        personsState.showPersons ?
          <div>
            <Person
              name={personsState.persons[0].name}
              age={personsState.persons[0].age} />
            <Person
              name={personsState.persons[1].name}
              age={personsState.persons[1].age} />
            <Person
              name={personsState.persons[2].name}
              age={personsState.persons[2].age} >Children</Person>
          </div> : null
      }
      <Car />
    </div>
  );
}

export default App;

/**
 * Approach via class-based component App
 */
// class App extends Component {
//   state = {
//     persons: [
//       { name: 'Max', age: 28 },
//       { name: 'Peter', age: 21 },
//       { name: 'Tim', age: 30 }
//     ],
//     note: 'Some additionals'
//   }

//   setState changes only a new staged state

//   switchName = () => {
//     console.log('clicked');
//     this.setState({
//       persons: [
//         { name: 'Thomas', age: 28 },
//         { name: 'Peter', age: 21 },
//         { name: 'Tim', age: 36 }
//       ]
//     })
//   }

//   render() {
//     return (
//       <div className="App" >
//        <button onClick={this.switchName}>Switch</button>
//        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
//       </div>
//     );
//   }
// }

/**
 * JSX compliled presentation example
 */
// class App extends Component {
//   render() {
//     return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Test'));
//   }
// }