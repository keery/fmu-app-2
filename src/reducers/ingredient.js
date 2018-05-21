import { combineReducers } from 'redux'
// const initialState = {
//   name : '',
//   cost : '',
//   allergenes : []
// }
const initialState = {
  ingredients : []
}
export const ingredientForm = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {...state, ingredients: action.newIngredient}

    default:
        return state
  }
}

export const ingredientsList = (state = initialState, action) => {
  switch (action.type) {
    default:
        return state
  }
}

const ingredientReducer = combineReducers({
  form: ingredientForm,
  list: ingredientsList
})

export default ingredientReducer