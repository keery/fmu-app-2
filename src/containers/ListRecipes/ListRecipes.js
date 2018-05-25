import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import RecipeItem from '../../components/RecipeItem/RecipeItem'
import { getRecipeAllergenes } from '../../utils/explorer'


class listRecipes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            allergenes: this.getAllergenes(props.ingredients),
            ingredients: this.getIngredients(props.ingredients),
            recipes: props.recipes,
            value: ''
        }

        this.handleSearch = this.handleSearch.bind(this)        
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

    render() {
        const { recipes, ingredients, allergenes, value } = this.state

        // console.log(ingredients)
        // console.log(recipes[5])

        // console.log(getRecipeAllergenes(recipes[5]))

        // for(let recipe of recipes) {

        // }

        const activeAllergenes = allergenes.filter(el => el.actif === 1)
        const activeIngredients = ingredients.map(el => {
            if(el.actif === 1) return el.ingredient.id
        })

        // console.log(activeAllergenes)
        const result = recipes.filter((el) => {
            if(!el.name.includes(value)) return false

            
            if(activeAllergenes.length > 0) {
                const currentAllergenes = getRecipeAllergenes(el)

                for(let activeA of activeAllergenes) {
                    if(!currentAllergenes.includes(activeA.allergene)) return false;
                }
            }

            if(activeIngredients.length > 0) {
                // const currentIngredient = getRecipeIngredient(el)
                // const idsIngredients = activeIngredients.map((element) => {
                //     return element.ingredient.id
                // })
                // console.log(idsIngredients)
                const currentIngredients = el.ingredients.map((element) => {
                    return element.id
                })
                let validI = false;
                for(let currentI of currentIngredients) {
                    if(activeIngredients.includes(currentI)) validI = true
                }

                if(!validI) return false;
            }
            // if(currentAllergenes.length === 0)
            // console.log(
            // console.log(el)
            return el
        })

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
                                    <label>Prix minimum</label>
                                    <input type="text" name="min_price" className="form-control" />
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="form-group">
                                    <label>Prix maximum</label>
                                    <input type="text" name="max_price" className="form-control" />
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
                        <RecipeItem key={id} id={id} name={name} ingredients={ingredients} recipes={recipes} />
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