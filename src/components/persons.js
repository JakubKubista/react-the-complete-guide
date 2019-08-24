import React, { PureComponent } from 'react';
import Person from './person/person'

class Persons extends PureComponent {
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  // Prevent changes from parent component / prevent unnecessarily render calls
  // Can be used as equivalent of React.memo
  // It is not a good idea to use it often, because
  // in most cases we have dependencies to parent component
  // and it can cause an issue
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Persons.js] shouldComponentUpdate')
    // Call all lifecycle hook about this component from
    // parent only if state has been changed.
    // Following variables are pointers, so be careful to using it.
    return nextProps.persons !== this.props.persons ||
      nextProps.changed !== this.props.changed ||
      nextProps.clicked !== this.props.clicked;
    // Instead of previous neverendless condition
    // is better to use PureComponent.
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

  // Cleaning component
  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
  }
}
export default Persons;