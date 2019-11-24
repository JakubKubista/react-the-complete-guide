import React, { useState } from 'react';

import './AddPerson.css';

const addPerson = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    return (
        <div className="AddPerson">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={event => setName(event.target.value)} />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={event => setAge(event.target.value)} />
            <button onClick={() => props.personAdded({id: Math.random(), name, age})}>Add Person</button>
        </div>
    )
};

export default addPerson;