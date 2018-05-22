// const initialState = {
//   name : '',
//   cost : '',
//   allergenes : []
// }
const initialState = {
  list : []
}
export default function ingredientForm (state = initialState, action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {...state, list: [...state.list, action.newIngredient]}
    default:
        return state
  }
}

// export const ingredientsList = (state = initialState, action) => {
//   switch (action.type) {
//     default:
//         return state
//   }
// }

// const ingredientReducer = combineReducers({
//   ingredientForm,
//   ingredientsList
// })

// export default ingredientReducer