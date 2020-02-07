import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const API_URL = 'https://react-hooks-update-2cb33.firebaseio.com/ingredients.json';

function Ingredients() {
  const [ ingredients, setIngredients ] = useState([]);

  const addIngredientHandler = async(ingredient) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    setIngredients(prevIngredients => [
      ...prevIngredients,
      { id: data.name, ...ingredient }
    ]);
  };

  const removeIngredientHandler = id => {
    const index = ingredients.map((ingredient) => ingredient.id).indexOf(id);
    setIngredients(prevIngredients => [
      ...prevIngredients.slice(0, index),
      ...prevIngredients.slice(index + 1)
    ]);
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
