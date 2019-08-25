import React, { Component } from 'react';
import './App.css';

import Person from './components/person'
import Car from './components/car'
import ErrorBoundary from './error-handler/error-boundary'

class App extends Component {

  state = {
    persons: [
      { id: '1', name: 'Max', age: 28 },
      { id: '2', name: 'Peter', age: 21 },
      { id: '3', name: 'Tim', age: 30 }
    ],
    note: 'some additionals',
    showPersons: true
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  changeNameHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    }
    // alternatively
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });

    // or alternativelty with index
    // const persons = this.state.persons;
    // persons[index].name = event.target.value;
    // this.setState({ persons: persons });
  }

  deletePersonHandler = (index) => {
    const persons = [...this.state.persons];
    // alternative to ES6
    // const persons = this.state.persons.slice();
    persons.splice(index, 1);
    this.setState({ persons: persons });
  }

  render() {

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <ErrorBoundary key={person.id}>
                <Person
                  key={person.id}
                  name={person.name}
                  age={person.age}
                  // Better approach is to use id than index
                  change={(event) => this.changeNameHandler(event, person.id)}
                  click={() => this.deletePersonHandler(index)} />
              </ErrorBoundary>;
            })
          }
        </div>
      );
    }

    return (
      <div className="App" >
        <h1>Test</h1>
        <button onClick={this.togglePersonsHandler}>Toggle</button>
        {persons}
        <Car />
      </div>
    );
  }
}

export default App;