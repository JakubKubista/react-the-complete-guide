import React, { useState } from 'react';
import './App.css';

import Person from './components/person'
import Car from './components/car'

const App = props => {

  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Peter', age: 21 },
      { name: 'Tim', age: 30 }
    ]
  });

  const [noteState, setNoteState] = useState('Some additionals');

  console.log(personsState, noteState)

  // Hook like this rewrite a whole state.
  // So be careful to not lose params of old state.
  // This is the reason why we use twice useState for another params.
  const switchName = (specialName) => {
    setPersonsState({
      persons: [
        { name: specialName, age: 28 },
        { name: 'Peter', age: 21 },
        { name: 'Tim', age: 36 }
      ]
    })
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
      <button onClick={() => switchName('Button')}>Switch</button>
      <Person
        name={personsState.persons[0].name}
        age={personsState.persons[0].age}
        click={switchName.bind(this, 'Kate')}
        change={switchNameHandler} />
      <Person
        name={personsState.persons[1].name}
        age={personsState.persons[1].age}
        click={switchName.bind(this, 'Leon')} />
      <Person
        name={personsState.persons[2].name}
        age={personsState.persons[2].age}
        click={switchName.bind(this, 'Matt')} >Children</Person>
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