import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRecipeById } from '../../utils/selectors'
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

    render() {
        const { id, name, ingredients, recipes } = this.state;
        return (
            <div>
                <h1>{name}</h1>
                {/* <div className="panel panel-default">
                    <div className="panel-heading">Prix</div>
                    <div className="panel-body">{cost} €/g</div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Allergènes</div>
                    <div className="panel-body">
                    {
                        allergenes.length > 0
                        ? allergenes.map((allergene, index) => (
                            <span key={id+"_"+index+"_"+name} className="label label-primary">{allergene}</span>
                        ))
                        : <div>Aucun allergène dans cet ingrédient</div>
                    }
                    </div>
                </div>  */}
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