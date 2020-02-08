import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

import {
  addIngredient,
  removeIngredient
} from '../../utils/services';

function Ingredients() {
  const [ ingredients, setIngredients ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const setIngredientsHandler = useCallback(ingredients => {
    setIngredients(ingredients);
  }, []);

  const addIngredientHandler = async(ingredient) => {
    setIsLoading(true);
    const data = await addIngredient(ingredient);
    setIsLoading(false);

    setIngredients(prevIngredients => [
      ...prevIngredients,
      { id: data.name, ...ingredient }
    ]);
  };

  const removeIngredientHandler = async(id) => {
    setIsLoading(true);
    await removeIngredient(id);
    setIsLoading(false);

    setIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        isLoading={isLoading}
      />

      <section>
        <Search onLoadIngredients={setIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
