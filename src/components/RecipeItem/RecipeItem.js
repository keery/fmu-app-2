import React from 'react'
import { Link } from 'react-router-dom'

const RecipeItem = ({ id, name, ingredients, recipes }) => (
  <div className="panel panel-default">
    <div className="panel-heading">{name}</div>
    <div className="panel-body">
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

export default RecipeItem