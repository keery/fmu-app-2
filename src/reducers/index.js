import { combineReducers } from 'redux';

import ingredientReducer from './ingredient';

const reducers = combineReducers({
    ingredient: ingredientReducer
});

export default reducers;