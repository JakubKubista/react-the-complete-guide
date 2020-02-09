import React, { Component } from 'react';
import styled from 'styled-components';

import classes from './App.css';
import Person from './components/person'
import Car from './components/car'

const StyledButton = styled.button`
  border: 1px solid blue;
  padding: 16px;
  background-color: ${props => props.alt ? 'red' : 'green'};
  font: inherit;
  color: #fff;

  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
  }
`;

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
    let btnClass = '';

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person
                key={person.id}
                name={person.name}
                age={person.age}
                // Better approach is to use id than index
                change={(event) => this.changeNameHandler(event, person.id)}
                click={() => this.deletePersonHandler(index)} />;
            })
          }
        </div>
      );
      btnClass = classes.Red;
    }

    const classesArr = [];

    if (this.state.persons.length <= 2) {
      classesArr.push(classes.red);
    }

    if (this.state.persons.length <= 1) {
      classesArr.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1 >Test</h1>
        <p className={classesArr.join(' ')} >Works!</p>
        <StyledButton
          alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}>Toggle</StyledButton>
        {persons}
        <Car />
      </div>
    );
  }
}

export default App;
