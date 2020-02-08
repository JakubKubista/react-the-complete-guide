import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

import { loadIngredients } from '../../utils/services';

const SEARCH_INPUT_THROTTLE_LENGTH = 500;

const Search = React.memo(props => {
  const {onLoadIngredients} = props;
  const [input, setInput] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input === inputRef.current.value) {

        const query = input.length === 0 ? '' : `?orderBy="title"&equalTo="${input}"`;

        loadIngredients(query).then((data) => {
          onLoadIngredients(data);
        });
      }
    }, SEARCH_INPUT_THROTTLE_LENGTH);

    return () => {
      clearTimeout(timer);
    }

  }, [input, onLoadIngredients, inputRef]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
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
