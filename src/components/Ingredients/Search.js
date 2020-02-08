import React, { useState, useCallback, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const SEARCH_INPUT_THROTTLE_LENGTH = 500;

const Search = React.memo(props => {
  const {onLoadIngredients} = props;
  const [input, setInput] = useState('');
  const inputRef = useRef();

  const loadIngredientsHandler = useCallback(async() => {
    const timer = setTimeout(async() => {
      if (input === inputRef.current.value) {
        onLoadIngredients(input);
      }
    }, SEARCH_INPUT_THROTTLE_LENGTH);

    return () => {
      clearTimeout(timer);
    }
  }, [input, inputRef, onLoadIngredients]);

  useEffect(() => {
    loadIngredientsHandler();
  }, [loadIngredientsHandler]);

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
