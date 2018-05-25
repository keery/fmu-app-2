function recursAllergene(recipe) {
    const { ingredients, recipes } = recipe

    let t_allergenes = [];

    if(ingredients.length > 0) {
        
        for(let ingredient of ingredients) {
            if(ingredient.allergenes.length > 0) {
                for(let allergene in ingredient.allergenes) {
                    t_allergenes.push(ingredient.allergenes[allergene])
                }
            }
        }
    }

    if(recipes.length > 0) {
        for(let recipe of recipes) {
            const res = recursAllergene(recipe)
            if(res.length > 0) {
                for(let el in res) {
                    t_allergenes.push(res[el])
                }
            }
        }
    }

    return t_allergenes
}

export const getRecipeAllergenes = (recipe) => {
    const t_allergenes = recursAllergene(recipe)

    return t_allergenes.filter(function(item, pos) {
        return t_allergenes.indexOf(item) === pos;
    })
}