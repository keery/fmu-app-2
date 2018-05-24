import React from 'react'

const RecipeItem = ({ id, name, ingredients, recipes }) => (
  <div className="panel panel-default">
    <div className="panel-body">{name}</div>
    <div>
      {
        ingredients.map((ingredient, index) => (
          <span key={id+"_"+index+"_"+name} className="label label-primary">{ingredient}</span>
        ))
      }
    </div>
  </div>
)

export default RecipeItem