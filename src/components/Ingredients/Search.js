import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

import { loadIngredients } from '../../utils/services';

const Search = React.memo(props => {
  const {onLoadIngredients} = props;
  const [input, setInput] = useState('');

  useEffect(() => {
    const query = input.length === 0 ? '' : `?orderBy="title"&equalTo="${input}"`;

    loadIngredients(query).then((data) => {
      onLoadIngredients(data);
    });
  }, [input, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            valie={input}
            onChange={event => setInput(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
