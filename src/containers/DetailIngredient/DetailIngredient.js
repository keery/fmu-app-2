import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getIngredientById } from '../../utils/selectors'
import { Link } from 'react-router-dom'

class detailIngredient extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.ingredient.id,
            name: props.ingredient.name,
            cost: props.ingredient.cost,
            allergenes: props.ingredient.allergene || [],
        }
    }

    render() {
        const { id, name, cost, allergenes } = this.state;
        return (
            <div>
                <h1>{name}</h1>
                <div className="panel panel-default">
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
                </div> 
                <div className="text-right">
                    <Link to='/ingredients' className="btn btn-primary">Retour à la liste</Link>
                </div>               
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    ingredient: getIngredientById(state, props)
})

const DetailIngredient = connect(
    mapStateToProps
  )(detailIngredient)

export default DetailIngredient