import React, { useReducer, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

import {ingredientsReducer} from '../../store/reducers/ingredients';
import {serviceReducer} from '../../store/reducers/service';

import {
  addIngredient,
  removeIngredient
} from '../../utils/services';

function Ingredients() {
  const [ ingredients, dispatchIngredients ] = useReducer( ingredientsReducer, []);
  const [ service, dispatchService ] = useReducer( serviceReducer, { loading: false, error: null });

  const setIngredientsHandler = useCallback(ingredients => {
    dispatchIngredients({type: 'SET', ingredients})
  }, []);

  const addIngredientHandler = async(ingredient) => {
    dispatchService({type: 'SEND'});
    const {data, errorMessage: error} = await addIngredient(ingredient);

    if (data) {
      dispatchService({type: 'RESPONSE'});
      dispatchIngredients({
        type: 'ADD',
        ingredient: { id: data.name, ...ingredient }
      });
    } else {
      dispatchService({type: 'ERROR', error});
    };
  };

  const removeIngredientHandler = async(id) => {
    dispatchService({type: 'SEND'});
    const {errorMessage: error} = await removeIngredient(id);


    if (error) {
      dispatchService({type: 'ERROR', error});
    } else {
      dispatchService({type: 'RESPONSE'});
      dispatchIngredients({type: 'DELETE', id});
    }
  };

  const clearError = useCallback(() => {
    dispatchService({type: 'ERROR', error: null});
  }, []);

  return (
    <div className="App">
      {service.error && <ErrorModal onClose={clearError}>
        {service.error}
      </ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        isLoading={service.loading}
      />

      <section>
        <Search
          onLoadIngredients={setIngredientsHandler}
          dispatchService={dispatchService}
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
