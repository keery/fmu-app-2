export const getIngredientById = (state, props) => {
    const res = state.ingredient.list.filter((el) => el.id === props.match.params.id);

    if(res.length > 0) return res[0]
    return false
}

export const getRecipeById = (state, props) => {
    const res = state.recipe.list.filter((el) => el.id === props.match.params.id);

    if(res.length > 0) return res[0]
    return false
}

export const getRecipePrice = (recipe) => {
    const { ingredients, recipes } = recipe

    // console.log(ingredients.length)
    // for(let ingredient of ingredients) {
    // // console.log(ingredient)
        
    // }
    let total = 0;

    if(ingredients.length > 0) {
        for(let ingredient of ingredients) {
            total += ingredient.quantity * ingredient.cost
        }
    }

    if(recipes.length > 0) {
        for(let recipe of recipes) {
            total += getRecipePrice(recipe)
        }
    }

    return total
}