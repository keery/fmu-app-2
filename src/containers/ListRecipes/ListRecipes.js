import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import RecipeItem from '../../components/RecipeItem/RecipeItem'
import { getRecipeAllergenes } from '../../utils/explorer'
import { getRecipePrice } from '../../utils/selectors'


class listRecipes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            allergenes: this.getAllergenes(props.ingredients),
            ingredients: this.getIngredients(props.ingredients),
            recipes: props.recipes,
            min_price: 0,
            max_price: this.getMaxPriceRecipe(props.recipes),
            value: ''
        }

        this.handleSearch = this.handleSearch.bind(this)        
        this.handlePrice = this.handlePrice.bind(this)        
    }

    getAllergenes(ingredients) {
        const t_allergenes = []
        for(let ingredient of ingredients) {
            if(ingredient.allergenes.length > 0) {
                for(let allergene of ingredient.allergenes) {
                    t_allergenes.push({allergene: allergene, actif: 0})
                }
            }
        }

        return t_allergenes
    }

    getMaxPriceRecipe(recipes) {
        let maxPrice = 0

        for(let recipe of recipes) {
            const price = getRecipePrice(recipe)
            if(price > maxPrice) maxPrice = price
        }

        return maxPrice
    }

    getIngredients(ingredients) {
        const t_ingredients = []
        for(let ingredient of ingredients) {
            t_ingredients.push({ingredient: ingredient, actif: 1})
        }

        return t_ingredients
    }

    handleCheckAllergene(allergene) {
        const { allergenes } = this.state

        const newAllergenes = allergenes.map((el) => {
            if(el.allergene === allergene) el.actif = (el.actif === 0 ? 1 : 0)
            return el
        })

        this.setState({allergenes : newAllergenes})
    }

    handleCheckIngredient(ingredient) {
        const { ingredients } = this.state

        const newIngredients = ingredients.map((el) => {
            if(el.ingredient.id === ingredient) el.actif = (el.actif === 0 ? 1 : 0)
            return el
        })

        this.setState({ingredients : newIngredients})
    }
  
    handleSearch(event) {
        const value = event.target.value
        this.setState({value: value})
    }

    handlePrice(event, type) {
        this.setState({[type]: event.target.value})
    }

    filterResult() {
        const { recipes, ingredients, allergenes, value, min_price, max_price } = this.state

        const activeAllergenes = allergenes.filter(el => el.actif === 1)
        const activeIngredients = ingredients.map(el => {
            if(el.actif === 1) return el.ingredient.id
            return false
        })

        const result = recipes.filter((el) => {
            if(!el.name.includes(value)) return false

            
            if(activeAllergenes.length > 0) {
                const currentAllergenes = getRecipeAllergenes(el)

                for(let activeA of activeAllergenes) {
                    if(!currentAllergenes.includes(activeA.allergene)) return false;
                }
            }

            if(activeIngredients.length > 0) {
                const currentIngredients = el.ingredients.map((element) => {
                    return element.id
                })
                let validI = false;
                for(let currentI of currentIngredients) {
                    if(activeIngredients.includes(currentI)) validI = true
                }

                if(!validI) return false;
            }

            if(getRecipePrice(el) < min_price) return false
            if(getRecipePrice(el) > max_price) return false
            return el
        })

        return result
    }

    render() {
        const { ingredients, allergenes, value, min_price, max_price } = this.state
        const result = this.filterResult()

        return (
            <div>
                <div>
                    <form>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <label>Nom de la recette</label>
                                    <input type="text" name="name_recipe" className="form-control" value={value} onChange={this.handleSearch} />
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Prix minimum en €</label>
                                    <input type="number" name="min_price" min="0" max={max_price-1} className="form-control" value={min_price} onChange={ (event) => this.handlePrice(event, 'min_price') } />
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Prix maximum en €</label>
                                    <input type="number" name="max_price" min="0" max={max_price} className="form-control" value={max_price} onChange={ (event) => this.handlePrice(event, 'max_price') } />
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Ingrédients</label>
                                    {
                                        ingredients && ingredients.length > 0 && (
                                            ingredients.map(({ingredient, actif}) => (
                                                <div key={ingredient.id} className="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="ingredients" value={ingredient.name} checked={actif} onChange={() => this.handleCheckIngredient(ingredient.id)} />
                                                        {ingredient.name}
                                                    </label>
                                                </div>
                                            ))
                                        )
                                    }
                                    
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Allergènes</label>
                                    {
                                        allergenes && allergenes.length > 0 && (
                                            allergenes.map( (el, index) => (
                                                <div key={el.allergene+"_"+index} className="checkbox">
                                                    <label>
                                                        <input type="checkbox" name="allergene" value={el.allergene} checked={el.actif} onChange={() => this.handleCheckAllergene(el.allergene)} />
                                                        {el.allergene}
                                                    </label>
                                                </div>
                                            ))
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                {
                    result && result.length > 0 
                    ? result.map(({id, name, ingredients, recipes}) => (
                        <RecipeItem key={id} id={id} name={name} ingredients={ingredients} recipes={recipes} price={getRecipePrice({ingredients:ingredients, recipes: recipes})} />
                    ))
                    : <div className="alert alert-warning"><strong>Warning</strong> Il n'y a actuellement aucune recette, pensez à en ajouter <Link to="/add/recipe">ici</Link></div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    recipes: state.recipe.list,
    ingredients: state.ingredient.list
})

const ListRecipes = connect(
    mapStateToProps
  )(listRecipes)

export default ListRecipes