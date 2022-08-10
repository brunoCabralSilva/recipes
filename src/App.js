import React from 'react';
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import RecProvider from './context/RecProvider';
import Login from './pages/Login';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeInProgress from './pages/RecipeInProgress';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import DrinksId from './pages/DrinksId';
import RecipeDetails from './pages/RecipeDetails';
import DrinksProgress from './pages/DrinksProgress';

function App() {
  const location = useLocation();
  return (
    <RecProvider>
      <AnimateSharedLayout>
        <AnimatePresence>
          <Switch location={location} key={location.key}>
            <Route exact path="/trybe-20-recipes" component={ Login } />
            <Route exact path="/foods" component={ Foods } />
            <Route exact path="/drinks" component={ Drinks } />
            <Route exact path="/foods/:id" component={ RecipeDetails } />
            <Route exact path="/drinks/:id" component={ DrinksId } />
            <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
            <Route exact path="/drinks/:id/in-progress" component={ DrinksProgress } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          </Switch>
        </AnimatePresence>
      </AnimateSharedLayout>
    </RecProvider>
  );
}

export default App;
