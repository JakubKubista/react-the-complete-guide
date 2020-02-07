import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

import {
  loadIngredients,
  addIngredient,
  removeIngredient
} from '../../utils/services';

function Ingredients() {
  const [ ingredients, setIngredients ] = useState([]);

  useEffect(() => {
    loadIngredientsHandler();
  }, []);

  const loadIngredientsHandler = async() => {
    const data = await loadIngredients();

    setIngredients(data);
  }

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
        <Search />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
