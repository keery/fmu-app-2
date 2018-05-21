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