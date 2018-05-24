import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import IngredientItem from '../../components/IngredientItem/IngredientItem'


class listIngredients extends Component {

    render() {
        const { ingredients } = this.props
        return (
            <div>
                {
                    ingredients && ingredients.length > 0 
                    ? ingredients.map(({id, name, cost, allergenes}) => (
                        <IngredientItem id={id} name={name} cost={cost} allergenes={allergenes} key={id} />
                    ))
                    : <div className="alert alert-warning"><strong>Warning</strong> Il n'y a actuellement aucun ingrédient, pensez à en ajouter <Link to="/add/ingredient">ici</Link></div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    ingredients: state.ingredient.list
})

const ListIngredients = connect(
    mapStateToProps
  )(listIngredients)

export default ListIngredients