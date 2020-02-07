import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [ ingredients, setIngredients ] = useState([]);

  const addIngredientHandler = ingredient => {
    setIngredients(prevIngredients => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredient }
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
