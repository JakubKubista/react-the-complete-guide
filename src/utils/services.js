import {API_URL} from './constants';

export const loadIngredients = async(query = '') => {
  const response = await fetch(API_URL + '.json' + query);
  const data = await response.json();

  const parsedData = [];
  for (const id in data) {
    parsedData.push({...data[id], id});
  }

  return parsedData;
};

export const addIngredient = async(ingredient) => {
  const response = await fetch(API_URL + '.json', {
    method: 'POST',
    body: JSON.stringify(ingredient),
    headers: { 'Content-Type': 'application/json' }
  });

  return await response.json();
};

export const removeIngredient = async(id) => {
  await fetch(API_URL + '/' + id + '.json', {
    method: 'DELETE'
  });
};
