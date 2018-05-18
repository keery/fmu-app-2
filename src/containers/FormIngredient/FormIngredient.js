import React, { Component } from 'react'

class FormIngredient extends Component {

    static defaultProps = {
        cost: 0
    }

    constructor(props) {
        super(props)
        this.state = {
            // name: props.name,
            cost: props.cost
            // alergenes: props.allergene
        }
        this.checkCost = this.checkCost.bind(this)
    }

    checkCost(event) {
        this.setState({cost: event.target.value.replace(/\D/g, "")});
    }

    render() {
        const { name, cost } = this.state;

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
                            <label>Coût</label>
                            <input type="text" name="cost" onChange={this.checkCost}  className="form-control" value={cost} />
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="form-group">
                            <label>Allergènes</label>
                            <input type="text" name="allergene"  className="form-control" />
                        </div>
                    </div>                                        
                </div>
            </form>
        )
    }
}

export default FormIngredient