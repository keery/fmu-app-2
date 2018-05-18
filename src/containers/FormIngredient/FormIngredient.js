import React, { Component } from 'react'

class FormIngredient extends Component {

    static defaultProps = {
        cost: 0,
        allergenes: []
    }

    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            cost: props.cost,
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
        const { name, cost, allergenes } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label>Nom</label>
                            <input type="text" name="name" className="form-control" value={name} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label>Coût (g)</label>
                            <input type="text" name="cost" onChange={this.checkCost}  className="form-control" value={cost} />
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="form-group">
                            <label>Allergènes</label>
                            {
                                allergenes.length > 0 && (
                                    allergenes.map((el, index) =>
                                        <div key={index} className="form-group">
                                            <input type="text" name="allergene"  className="form-control" defaultValue={el}/>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        <button onClick={() => this.addAllergene()} className="btn btn-primary" type="button">Ajouter un allergène</button>
                    </div>                                        
                </div>
            </form>
        )
    }
}

export default FormIngredient