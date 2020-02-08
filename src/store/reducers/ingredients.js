export const ingredientsReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...state, action.ingredient]
    case 'DELETE':
      return state.filter(ingredient => ingredient.id !== action.id)
    default:
      throw new Error('Ingredient Reducer:  Default action Error')
  }
}