import {API_URL} from './constants';

export const loadIngredients = async(query = '') => {
  try {
    const parsedData = [];

    const response = await fetch(API_URL + '.json' + query);
    const data = await response.json();

    for (const id in data) {
      parsedData.push({...data[id], id});
    }

    return {
      data: parsedData
    };

  } catch(error) {
    return {
      errorMessage: error.message
    };
  }
};

export const addIngredient = async(ingredient) => {
  try {
    const response = await fetch(API_URL + '.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();

    return {
      data
    };

  } catch(error) {
    return {
      errorMessage: error.message
    };
  }
};

export const removeIngredient = async(id) => {
  try {
    await fetch(API_URL + '/' + id + '.json', {
      method: 'DELETE'
    });

    return {};

  } catch(error) {
    return {
      errorMessage: error.message
    };
  }
};
