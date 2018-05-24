import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import RecipeItem from '../../components/RecipeItem/RecipeItem'


class listRecipes extends Component {

    render() {
        const { recipes } = this.props

        return (
            <div>
                {
                    recipes && recipes.length > 0 
                    ? recipes.map(({id, name, ingredients, recipes}) => (
                        <RecipeItem key={id} id={id} name={name} ingredients={ingredients} recipes={recipes} />
                    ))
                    : <div className="alert alert-warning"><strong>Warning</strong> Il n'y a actuellement aucune recette, pensez à en ajouter <Link to="/add/recipe">ici</Link></div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    recipes: state.recipe.list
})

const ListRecipes = connect(
    mapStateToProps
  )(listRecipes)

export default ListRecipes