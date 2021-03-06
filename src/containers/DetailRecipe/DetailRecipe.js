import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRecipeById } from '../../utils/selectors'
import { getRecipeAllergenes } from '../../utils/explorer'
import { Link } from 'react-router-dom'

class detailRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.recipe.id,
            name: props.recipe.name,
            ingredients: props.recipe.ingredients || [],
            recipes: props.recipe.recipes || [],
        }
    }

    getRecipePrice(recipe) {
        const { ingredients, recipes } = recipe
        let total = 0;

        if(ingredients.length > 0) {
            for(let ingredient of ingredients) {
                total += ingredient.quantity * ingredient.cost
            }
        }

        if(recipes.length > 0) {
            for(let recipe of recipes) {
                total += this.getRecipePrice(recipe)
            }
        }

        return total
    }

    render() {
        const { id, name, ingredients, recipes } = this.state;
        const price = this.getRecipePrice(this.state)
        const allergenes = getRecipeAllergenes(this.state)

        return (
            <div>
                <h1>{name}</h1>
                <div>
                    <h2>Ingrédient(s)/recette(s)</h2>
                    <ul className="list-group">
                        {
                            ingredients && ingredients.length > 0 &&
                                ingredients.map(({id, name, quantity}) => (
                                    <li className="list-group-item" key={id}>
                                        <div>{quantity} grammes de {name}</div>
                                    </li>                   
                                ))
                            
                        }
                        {
                            recipes && recipes.length > 0 &&
                                recipes.map(({id, name, quantity}) => (
                                    <li className="list-group-item" key={id}>
                                        <div>{quantity} grammes de {name}</div>
                                    </li>                   
                                ))
                            
                        }
                    </ul>
                </div>
                <div>
                    <h2>Prix</h2>
                    <ul className="list-group">
                        <li className="list-group-item">{price} €</li>
                    </ul>
                </div>
                <div>
                    <h2>Allergenes</h2>
                    <ul className="list-group">
                        <li className="list-group-item">
                        {
                            allergenes && allergenes.length > 0 
                            ? allergenes.map((allergene, index) => (
                                <span key={id+"_"+index+"_"+name} className="label label-primary">{allergene}</span>
                            ))
                            : "Aucun allergene dans cette recette"
                        }
                        </li>
                    </ul>
                </div>
                <div className="text-right">
                    <Link to='/recipes' className="btn btn-primary">Retour à la liste</Link>
                </div>               
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    recipe: getRecipeById(state, props)
})

const DetailRecipe = connect(
    mapStateToProps
)(detailRecipe)

export default DetailRecipe