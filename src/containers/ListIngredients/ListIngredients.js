import React, { Component } from 'react'
import { connect } from 'react-redux';

class listIngredients extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { ingredients } = this.props
        console.log(ingredients)
        return (
            <div>coucou</div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    ingredients: state.ingredient.list
})
  
  const mapDispatchToProps = {
  }

const ListIngredients = connect(
    mapStateToProps,
    mapDispatchToProps
  )(listIngredients)

export default ListIngredients