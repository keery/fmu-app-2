import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const IngredientItem = ({ id, name, cost, allergenes }) => (
  <div className="panel panel-default">
    <div className="panel-heading">{name}</div>
    <div className="panel-body">
      <div>{cost} €/g</div>
      <div>
        {
          allergenes.map((allergene, index) => (
            <span key={id+"_"+index+"_"+name} className="label label-primary">{allergene}</span>
          ))
        }
      </div>
      <div className="text-right">
        <Link to={/ingredient/+id}>
          <button className='btn btn-primary'>Voir l'ingrédient</button>
        </Link>
      </div>
    </div>
  </div>
)

IngredientItem.propTypes = {
  id: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  allergenes: PropTypes.arrayOf(PropTypes.string)
}

export default IngredientItem