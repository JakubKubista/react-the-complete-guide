import React, { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';

import Card from '../UI/Card';
import './Search.css';

import { loadIngredients } from '../../utils/services';

const SEARCH_INPUT_THROTTLE_LENGTH = 1000;

const Search = React.memo(props => {
  const {onLoadIngredients} = props;
  const [input, setInput] = useState('');

  useEffect(() => {
    const query = input.length === 0 ? '' : `?orderBy="title"&equalTo="${input}"`;

    loadIngredients(query).then((data) => {
      onLoadIngredients(data);
    });
  }, [input, onLoadIngredients]);

  const onInputHandler = useCallback(throttle((value) => {
    setInput(value);
  }, SEARCH_INPUT_THROTTLE_LENGTH), []);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            valie={input}
            onChange={event => onInputHandler(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
