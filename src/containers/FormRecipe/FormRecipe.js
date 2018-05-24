import React, { Component } from 'react'
import { connect } from 'react-redux';
import Search from '../../components/Search/Search'
import { addRecipe } from '../../actions'
import IngredientItem from '../../components/IngredientItem/IngredientItem'
import RecipeItem from '../../components/RecipeItem/RecipeItem'

class formRecipe extends Component {

    static defaultProps = {
        ingredients: [],
        recipes: []
    }

    constructor(props) {
        super(props)
        this.state = {
            name: props.name,
            ingredients: props.ingredients || [],
            recipes: props.recipes || [],
            message: '',
            dataAutocomplete: props.dataAutocomplete
        }
        this.checkQuantity = this.checkQuantity.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateState = this.updateState.bind(this)
        this.reset = this.reset.bind(this)
        this.actionAutocomplete = this.actionAutocomplete.bind(this)
    }

    addAllergene() {
        const { ingredients } = this.state;
        const newIngredient = [''];
        this.setState({ingredients: [...ingredients, newIngredient]})    
    }

    checkQuantity(event, id, type) {
        const { ingredients, recipes } = this.state

        let t = ""
        if(type === "ingredients") t = ingredients
        else t = recipes

        const newData = t.map((el) => {
            if(el.id === id) el.quantity = event.target.value.replace(/\D/g, "")
            return el
        })

        this.setState({type: newData});
    }

    handleSubmit(event) {
        event.preventDefault();

        if(this.verifForm()) {
            // const { name, cost, allergenes } = this.state
            // this.props.addRecipe({name: name});
            this.reset()
        }
    }

    reset() {
        const initialState = {
            name: '',
            ingredients: [],
            recipes: [],
            dataAutocomplete: {
                ingredients: this.state.dataAutocomplete.ingredients.map((el) => {el.dataAutocompleteActif = null 
                    return el}), 
                recipes: this.state.dataAutocomplete.recipes.map((el) => {el.dataAutocompleteActif = null
                    return el})}
        }
        this.setState(initialState)
    }

    verifForm() {
        const { name, ingredients, recipes } = this.state;
        if (typeof name === 'undefined') {
            this.setState({message : {type:"danger", content:'Le champ nom est obligatoire'}})
            return false;
        }
        else if ( (ingredients.length + recipes.length) < 2) {
            this.setState({message : {type:"danger", content:'Une recette doit comporter au minimum 2 éléments'}})
            return false;
        }
        else if(ingredients.filter((el) => el.quantity === 0).length > 0) {
            this.setState({message : {type:"danger", content:'Tous les ingrédients doivent avoir une quantité supérieur à 0'}})
            return false;
        }
        else if(recipes.filter((el) => el.quantity === 0).length > 0) {
            this.setState({message : {type:"danger", content:'Toutes les recettes doivent avoir une quantité supérieur à 0'}})
            return false;
        }

        this.setState({message : {type:"success", content:'Recette bien enregistrée'}})
        return true
    }

    updateState(event, index) {
        const el = event.target
        
        this.setState({[el.name] : el.value})
    }

    actionAutocomplete(el) {
        const { ingredients, recipes, dataAutocomplete } = this.state
        el.quantity = 0;

        let t = null;
        if("allergenes" in el) t = {data:ingredients, key:"ingredients"}
        else if("ingredients" in el) t = {data:recipes, key:"recipes"}

        if(t) {
            const dataAuto = dataAutocomplete[t.key].map((element) => {
                if(element.id === el.id) element.dataAutocompleteActif = 0
                return element
            })
            dataAutocomplete[t.key] = dataAuto

            this.setState({[t.key]: [...t.data, el], dataAutocomplete: dataAutocomplete})
        }
    }

    render() {
        const { name, message, ingredients, recipes, dataAutocomplete } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    {
                        message !== "" && 
                            <div className={"alert alert-"+message.type}>
                                {message.content}
                            </div>
                    }
                    <div className="col-xs-12">
                        <div className="form-group">
                            <label>Nom</label>
                            <input type="text" name="name" className="form-control"  onBlur={this.updateState} defaultValue={name} />
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="form-group">
                            <label>Ajouter un ingrédient ou une recette</label>
                            <Search data={dataAutocomplete} action={this.actionAutocomplete} />
                        </div>
                    </div>
                    <div className="col-xs-12">
                        {
                            ingredients && ingredients.length > 0 &&
                                ingredients.map(({id, name, cost, allergenes, quantity}) => (
                                    <div className="row" key={id}>
                                        <div className="col-xs-8">
                                            <IngredientItem name={name} cost={cost} allergenes={allergenes} />
                                        </div>
                                        <div className="col-xs-4">
                                            <div className="form-group">
                                                <label>Quantité (g)</label>
                                                <input type="text" name={'quantity_ingredient_'+id} className="form-control" onChange={(event) => this.checkQuantity(event, id, 'ingredients')} value={quantity} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            
                        }
                    </div>
                    <div className="col-xs-12">
                    {

                        recipes && recipes.length > 0 &&
                            recipes.map(({id, name, recipes, ingredients}) => (
                                <RecipeItem name={name} ingredients={ingredients} recipes={recipes} key={id} />
                            ))
                        
                    }
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
    addRecipe
}
const mapStateToProps = (state, props) => ({
    dataAutocomplete: 
        {
            ingredients: state.ingredient.list,
            recipes: state.recipe.list,
        }
})
const FormRecipe = connect(
    mapStateToProps,
    mapDispatchToProps
  )(formRecipe)

export default FormRecipe