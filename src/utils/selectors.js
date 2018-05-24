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