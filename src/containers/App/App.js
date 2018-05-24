import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import logo from '../../assets/img/logo-fmu.png';
import '../../assets/style/index.scss';
import './App.scss'; 
import Sidebar from '../../components/Sidebar/Sidebar';
import ListRecipes from '../ListRecipes/ListRecipes';
import ListIngredients from '../ListIngredients/ListIngredients';
import DetailIngredient from '../DetailIngredient/DetailIngredient';
import DetailRecipe from '../DetailRecipe/DetailRecipe';
import FormIngredient from '../FormIngredient/FormIngredient';
import FormRecipe from '../FormRecipe/FormRecipe';

class App extends Component {

  render() {
    return (
      <section className="App container-fluid">
        <img src={logo} alt="Logo Food Me Up" width="300" />
        <Sidebar />
        <div className="row">
          <div className="col-xs-3">
            <ul className="list-group">
              <li className="list-group-item "><Link to="/add/ingredient" className="btn btn-primary">Ajouter un ingrédient</Link></li>
              <li className="list-group-item"><Link to="/add/recipe" className="btn btn-primary">Ajouter une recette</Link></li>
            </ul>
          </div>
          <div className="col-xs-9">
            <Switch>
              <Route path="/" exact={true} />
              <Route path="/add/recipe" component={FormRecipe} />
              <Route path="/add/ingredient" component={FormIngredient} />
              <Route path="/recipe/:id" component={DetailRecipe} />
              <Route path="/ingredient/:id" component={DetailIngredient} />
              <Route path="/recipes" component={ListRecipes} />
              <Route path="/ingredients" component={ListIngredients} />
            </Switch>
          </div>
        </div>
      </section>
    );
  }
}

export default App;