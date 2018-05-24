const generateId = (name) => {
    return name +"_"+ new Date().getTime();
}

export const addIngredient = (ingredient) => {

    const newIngredient = {
        id: generateId(ingredient.name),
        name: ingredient.name,
        cost: ingredient.cost,
        allergenes: ingredient.allergenes.filter((el) => el !== '')
    }
  
    return {type: 'ADD_INGREDIENT', newIngredient}
}

export const addRecipe = (recipe) => {

    const newRecipe = {
        id: generateId(recipe.name),
        name: recipe.name,
        ingredients: recipe.ingredients,
        recipes: recipe.recipes
    }
  
    return {type: 'ADD_RECIPE', newRecipe}
}