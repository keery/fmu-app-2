import React, { Component } from 'react'
import Search from '../../components/Search/Search';


class FormRecipe extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            recipe: props.cost,
            allergenes: props.allergene || []
        }
        this.checkCost = this.checkCost.bind(this)
    }

    checkCost(event) {
        this.setState({cost: event.target.value.replace(/\D/g, "")});
    }

    addAllergene() {
        const { allergenes } = this.state;
        const newAllergene = [''];
        this.setState({allergenes: [...allergenes, newAllergene]})    
    }

    render() {
        const { name } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group">
                            <label>Nom</label>
                            <input type="text" name="name" className="form-control" value={name} />
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="form-group">
                            <label>Ingrédients/Recettes</label>
                            <Search />                            
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default FormRecipe