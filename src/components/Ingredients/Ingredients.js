import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const API_URL = 'https://react-hooks-update-2cb33.firebaseio.com/ingredients.json';

function Ingredients() {
  const [ ingredients, setIngredients ] = useState([]);

  useEffect(() => {
    loadIngredients();
  }, []);

  const loadIngredients = async() => {
    const response = await fetch(API_URL);
    const data = await response.json();

    const parsedData = [];
    for (const id in data) {
      parsedData.push({...data[id], id});
    }

    setIngredients(parsedData);
  }

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
