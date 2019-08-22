import React, { Component } from 'react';
import Person from './person/person'

class Persons extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Persons.js] shouldComponentUpdate')
    return true;
  }

  render() {
    console.log('[Persons.js] render');
    return this.props.persons.map((person, index) => {
      return <Person
        key={person.id}
        name={person.name}
        age={person.age}
        click={() => this.props.clicked(index)}
        change={(event) => this.props.changed(event, person.id)} />;
    });
  }

  getSnapshotBeforeUpdate(prevProps, prevstate) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return { message: 'Snapshot!' };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate, snapshot: ');
    console.log(snapshot);
  }
}
export default Persons;