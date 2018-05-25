import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const RecipeItem = ({ id, name, ingredients, recipes, price }) => (
  <div className="panel panel-default">
    <div className="panel-heading">{name}</div>
    <div className="panel-body">
      <div>
        {
          price && price !== 0 && (
            <span>Prix: {price} €</span>
          )
        }
      </div>
      <div>
        {
          ingredients && ingredients.map((ingredient, index) => (
            <span key={ingredient.id} className="label label-primary">{ingredient.name}</span>
          ))
        }
        {
          recipes && recipes.map((recipe, index) => (
            <span key={recipe.id} className="label label-primary">{recipe.name}</span>
          ))
        }
      </div>
      <div className="text-right">
        <Link to={/recipe/+id}>
          <button className='btn btn-primary'>Voir la recette</button>
        </Link>
      </div>
    </div>
  </div>
)

RecipeItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  recipes: PropTypes.arrayOf(
      PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          ingredients: PropTypes.array,
          recipes: PropTypes.array,
      })
  ),
  ingredients: PropTypes.arrayOf(
      PropTypes.shape({        
          id: PropTypes.string.isRequired,
          cost: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          allergenes: PropTypes.arrayOf(PropTypes.string)
      })
  )
}

export default RecipeItem