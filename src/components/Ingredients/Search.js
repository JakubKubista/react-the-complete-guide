import React, { useState, useCallback, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

import { loadIngredients } from '../../utils/services';

const SEARCH_INPUT_THROTTLE_LENGTH = 500;

const Search = React.memo(props => {
  const {
    onLoadIngredients,
    dispatchService
  } = props;
  const [input, setInput] = useState('');
  const inputRef = useRef();

  const loadIngredientsHandler = useCallback(async() => {
    dispatchService({type: 'SEND'});
    const timer = setTimeout(async() => {
      if (input === inputRef.current.value) {
        const query = input.length === 0 ? '' : `?orderBy="title"&equalTo="${input}"`;
        const { data, errorMessage: error } = await loadIngredients(query);

        if (data) {
          dispatchService({type: 'RESPONSE'});
          onLoadIngredients(data);
        } else {
          dispatchService({type: 'ERROR', error});
        }
      }
    }, SEARCH_INPUT_THROTTLE_LENGTH);

    return () => {
      clearTimeout(timer);
    }
  }, [input, inputRef, onLoadIngredients, dispatchService]);

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
