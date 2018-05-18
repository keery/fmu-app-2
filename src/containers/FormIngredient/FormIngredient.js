import React, { Component } from 'react'

class FormIngredient extends Component {
    // constructor() {
        
    // }

    checkCost(event) {
        return event.target.value.replace(/\d/g, "")
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label>Nom</label>
                            <input type="text" name="name" className="form-control" />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label>Coût</label>
                            <input type="text" name="cost" onChange={this.checkCost}  className="form-control" />
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