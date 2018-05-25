
import { getRecipePrice } from '../utils/selectors'

const firstRecipe = {
    id: '1',
    name: "Pâte brisée",
    ingredients: [
        { id:1, name: "Farine",  cost: 5.2, allergenes: ["arsenic"], quantity: 3 },
        { id:2, name: "Oeuf",  cost: 2, allergenes: ["lactose"], quantity: 4 },
    ],
    recipes : []
}

const secondRecipe = {
    id: '1',
    name: "Coulis chocolat",
    ingredients: [
        { id:3, name: "Chocolat",  cost: 2.5, allergenes: [], quantity: 2 },
        { id:2, name: "Sucre",  cost: 1, allergenes: [], quantity: 5 },
    ],
    recipes : []
}



it('Calculate price when adding recipe in recipe', () => {

    describe("Initially the first recipe's price is 23.6", () => {
        const fCost = getRecipePrice(firstRecipe);
        expect(fCost).toEqual(23.6);
    })

    describe("The second recipe's price is 10", () => {
        const sCost = getRecipePrice(secondRecipe);
        expect(sCost).toEqual(10);
    })

    describe("I had the second recipe in the first, the price will be the sum both", () => {
        firstRecipe.recipes.push(secondRecipe)
        const newCost = getRecipePrice(firstRecipe);
        expect(newCost).toEqual(fCost + sCost); 
    })
});

it("The recipe contain 2 ingredients", () => {
    expect(firstRecipe.ingredients.length).toBe(2); 
})

it("The recipe contain a third ingredient", () => {
    firstRecipe.ingredients.push({ id:3, name: "Miel",  cost: 7, allergenes: [], quantity: 20 })
    expect(firstRecipe.ingredients.length).toEqual(3);
})