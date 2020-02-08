import React, { useReducer, useCallback, useMemo, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

import {ingredientsReducer} from '../../store/reducers/ingredients';
import useService from '../../hooks/service';

const API_URL = 'https://react-hooks-update-2cb33.firebaseio.com/ingredients';

const SET_INGREDIENTS = 'SET_INGREDIENTS';
const ADD_INGREDIENT = 'ADD_INGREDIENT';
const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

function Ingredients() {
  const [ ingredients, dispatchIngredients ] = useReducer( ingredientsReducer, []);
  const { loading, error, data, actionType, sendRequest, clearError } = useService();

  useEffect(() => {
    if (!error && actionType === SET_INGREDIENTS) {
      const ingredients = [];
      for (const id in data) {
        ingredients.push({...data[id], id});
      }
      dispatchIngredients({type: 'SET', ingredients});
    }
  }, [actionType, data, error]);

  const setIngredientsHandler = useCallback(async(input) => {
    const query = input.length === 0 ? '' : `?orderBy="title"&equalTo="${input}"`;

    await sendRequest({
      url: `${API_URL}.json${query}`,
      actionType: SET_INGREDIENTS
    });
  }, [sendRequest]);

  const addIngredientHandler = useCallback(async(ingredient) => {
    const {name} = await sendRequest({
      url: `${API_URL}.json`,
      method: 'POST',
      body: JSON.stringify(ingredient),
      actionType: ADD_INGREDIENT
    });

    if (!error && name) {
      dispatchIngredients({
        type: 'ADD',
        ingredient: { id: name, ...ingredient }
      });
    }
  }, [error, sendRequest]);

  const deleteIngredientHandler = useCallback(async(id) => {
    await sendRequest({
      url: `${API_URL}/${id}.json`,
      method: 'DELETE',
      actionType: DELETE_INGREDIENT
    });

    if (!error) {
      dispatchIngredients({type: 'DELETE', id});
    }
  }, [error, sendRequest]);

  const ingredientList = useMemo(() => (
    <IngredientList
      ingredients={ingredients}
      onRemoveItem={deleteIngredientHandler}
  />
  ), [ingredients, deleteIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>
        {error}
      </ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        isLoading={loading}
      />

      <section>
        <Search
          onLoadIngredients={setIngredientsHandler}
        />

        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
