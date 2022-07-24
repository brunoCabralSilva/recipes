import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import RecProvider from './context/RecProvider';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import Drinks from './pages/Drinks';
import Recipes from './pages/Recipes';
import DrinksId from './pages/DrinksId';
import RecipeDetails from './pages/RecipeDetails';
import DrinksProgress from './pages/DrinksProgress';

function App() {
  return (
    <RecProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ DrinksId } />
        <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinksProgress } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route path="/foods" component={ Recipes } />
      </Switch>
    </RecProvider>
  );
}

export default App;
