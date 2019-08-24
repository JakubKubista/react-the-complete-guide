// Import React because of JSX
import React from 'react';
import Person from './person/person'

const Persons = props =>
  props.persons.map((person, index) => {
    return <Person
      key={person.id}
      name={person.name}
      age={person.age}
      click={() => props.clicked(index)}
      change={(event) => props.changed(event, person.id)} />;
  });

export default Persons;