import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

import { loadIngredients } from '../../utils/services';

const SEARCH_INPUT_THROTTLE_LENGTH = 500;

const Search = React.memo(props => {
  const {
    onLoadIngredients,
    setError,
    setIsLoading
  } = props;
  const [input, setInput] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      if (input === inputRef.current.value) {

        const query = input.length === 0 ? '' : `?orderBy="title"&equalTo="${input}"`;

        loadIngredients(query).then(({data, errorMessage}) => {
          setIsLoading(false);
          data ?
            onLoadIngredients(data) :
            setError(errorMessage)
        });
      }
    }, SEARCH_INPUT_THROTTLE_LENGTH);

    return () => {
      clearTimeout(timer);
    }

  }, [input, onLoadIngredients, inputRef, setError, setIsLoading]);

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
