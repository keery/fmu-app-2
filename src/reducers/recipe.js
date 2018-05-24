import { saveData, getData } from '../scripts/localStorage'
const initialState = {
  list : getData('recipes')
}
export default function recipeForm (state = initialState, action) {
  switch (action.type) {
    case 'ADD_RECIPE':
      saveData("recipes", action.newRecipe)
      return {...state, list: [...state.list, action.newRecipe]}
    default:
        return state
  }
}