import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../store/actions';
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {
    render () {
        return (
            <div>
                <AddPerson personAdded={this.props.onAddPerson} />
                {this.props.persons.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.onRemovePerson(person.id)}/>
                ))}
            </div>
        );
    }
}

const generateNewPerson = () => {
    return {
        id: Math.random(), // not really unique but good enough here!
        name: 'Max',
        age: Math.floor( Math.random() * 40 )
    }
}

const mapStateToProps = state => {
    return {
        persons: state.persons
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPerson: () => dispatch({type: actionTypes.ADD_PERSON, person: generateNewPerson()}),
        onRemovePerson: (personId) => dispatch({type: actionTypes.REMOVE_PERSON, personId: personId})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);