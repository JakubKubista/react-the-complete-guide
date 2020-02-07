import {API_URL} from './constants';

export const loadIngredients = async() => {
  const response = await fetch(API_URL);
  const data = await response.json();

  const parsedData = [];
  for (const id in data) {
    parsedData.push({...data[id], id});
  }

  return parsedData;
}

export const addIngredient = async(ingredient) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(ingredient),
    headers: { 'Content-Type': 'application/json' }
  });

  const data = await response.json();
  return data;
}