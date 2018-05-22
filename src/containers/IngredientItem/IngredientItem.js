import React from 'react'

const IngredientItem = ({ id, name, cost, allergenes }) => (
  <div className="panel panel-default">
    <div className="panel-body">{name}</div>
    <div>{cost} €/g</div>
    <div>
      {
        allergenes.map((allergene, index) => (
          <span key={id+"_"+index+"_"+name} className="label label-primary">{allergene}</span>
        ))
      }
    </div>
  </div>
)

export default IngredientItem