// const initialState = {
//   name : '',
//   cost : '',
//   allergenes : []
// }
import { saveData, getData } from '../scripts/localStorage'
const initialState = {
  list : getData('ingredients')
}
export default function ingredientForm (state = initialState, action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      const newList = [...state.list, action.newIngredient]
      saveData("ingredients", newList)
      return {...state, list: newList}
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