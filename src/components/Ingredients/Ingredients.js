import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

import {
  addIngredient,
  removeIngredient
} from '../../utils/services';

function Ingredients() {
  const [ ingredients, setIngredients ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(null);

  const setIngredientsHandler = useCallback(ingredients => {
    setIsLoading(true);
    setIngredients(ingredients);
    setIsLoading(false);
  }, []);

  const addIngredientHandler = async(ingredient) => {
    setIsLoading(true);
    const {data, errorMessage} = await addIngredient(ingredient);
    setIsLoading(false);

    data ?
      setIngredients(prevIngredients => [
        ...prevIngredients,
        { id: data.name, ...ingredient }
      ]) :
      setError(errorMessage);
  };

  const removeIngredientHandler = async(id) => {
    setIsLoading(true);
    const {errorMessage} = await removeIngredient(id);
    setIsLoading(false);

    errorMessage ?
      setError(errorMessage) :
      setIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== id)
    );
  };

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>
        {error}
      </ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        isLoading={isLoading}
      />

      <section>
        <Search
          onLoadIngredients={setIngredientsHandler}
          setError={setError}
        />

        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
