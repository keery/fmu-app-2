import { combineReducers } from 'redux';

import ingredientForm from './ingredient';
import recipeForm from './recipe';

const reducers = combineReducers({
    ingredient: ingredientForm,
    recipe: recipeForm,
});

export default reducers;