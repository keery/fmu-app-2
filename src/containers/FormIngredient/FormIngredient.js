import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addIngredient } from '../../actions'

class formIngredient extends Component {

    static defaultProps = {
        cost: 0,
        allergenes: []
    }

    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            cost: props.cost,
            allergenes: props.allergene || [],
            message: ''
        }
        this.checkCost = this.checkCost.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateState = this.updateState.bind(this)
        this.reset = this.reset.bind(this)
    }

    checkCost(event) {
        this.setState({cost: event.target.value.replace(/\D/g, "")});
    }

    addAllergene() {
        const { allergenes } = this.state;
        const newAllergene = [''];
        this.setState({allergenes: [...allergenes, newAllergene]})    
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.verifForm()) {
            const { name, cost, allergenes } = this.state
            this.props.addIngredient({name: name, cost: cost, allergenes: allergenes});
            this.reset()
        }
    }

    reset() {
        const initialState = {
            name: '',
            cost: 0,
            allergenes: []
        }
        this.setState(initialState)
    }

    verifForm() {
        const { name, cost } = this.state;
        
        if (typeof name === 'undefined') {
            this.setState({message : {type:"danger", content:'Le champ nom est obligatoire'}})
            return false;
        }
        else if (cost <= 0) {
            this.setState({message : {type:"danger", content:'Le champ prix est obligatoire'}})
            return false;
        }
        
        this.setState({message : {type:"success", content:'Recette bien enregistrée'}})
        return true
    }

    updateState(event, index) {
        const el = event.target
        const { allergenes } = this.state;

        if(el.name === "allergene") {
            allergenes[index] = el.value
            this.setState({allergenes: [...allergenes]})
        }
        else this.setState({[el.name] : el.value})
    }

    render() {
        const { name, cost, allergenes, message } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    {
                        message !== "" && 
                            <div className={"alert alert-"+message.type}>
                                {message.content}
                            </div>
                    }
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label>Nom</label>
                            <input type="text" name="name" className="form-control"  onBlur={this.updateState} defaultValue={name} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                        <div className="form-group">
                            <label>Coût (g)</label>
                            <input type="text" name="cost" onChange={this.checkCost} onBlur={this.updateState} className="form-control" value={cost} />
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="form-group">
                            <label>Allergènes</label>
                            {
                                allergenes.length > 0 && (
                                    allergenes.map((el, index) =>
                                        <div key={index} className="form-group">
                                            <input type="text" name="allergene" onBlur={(event) => this.updateState(event, index)}  className="form-control" defaultValue={el}/>
                                        </div>
                                    )
                                )
                            }
                        </div>
                        <button onClick={() => this.addAllergene()} className="btn btn-primary" type="button">Ajouter un allergène</button>
                    </div>
                    <div className="text-right col-xs-12">
                            <input type="submit" value="Enregistrer" className="btn btn-primary" />
                    </div>                                     
                </div>
            </form>
        )
    }
}

const mapDispatchToProps = {
    addIngredient
}
const mapStateToProps = (state, props) => ({
    allergenes: []
})
const FormIngredient = connect(
    mapStateToProps,
    mapDispatchToProps
  )(formIngredient)

export default FormIngredient