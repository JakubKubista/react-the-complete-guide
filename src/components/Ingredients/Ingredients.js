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

  const setIngredientsHandler = useCallback(ingredients => {
    setIngredients(ingredients);
  }, []);

  const addIngredientHandler = async(ingredient) => {
    const data = await addIngredient(ingredient);

    setIngredients(prevIngredients => [
      ...prevIngredients,
      { id: data.name, ...ingredient }
    ]);
  };

  const removeIngredientHandler = async(id) => {
    await removeIngredient(id);

    setIngredients(prevIngredients =>
      prevIngredients.filter(ingredient => ingredient.id !== id)
    );
  };

  return (
    <div className="App">
      <IngredientForm
        onAddIngredient={addIngredientHandler}
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
