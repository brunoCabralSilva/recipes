import React from 'react';
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import RecipesProvider from './contextRecipes/RecipesProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipesDetails from './pages/RecipesDetails';
import RecipesInProgress from './pages/RecipesInProgress';
import DoneRecipes from './pages/DoneRecipes';
// import Profile from './pages/Profile';
// import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  const location = useLocation();
  return (
    <RecipesProvider>
      <AnimateSharedLayout>
        <AnimatePresence>
          <Switch
            location={location}
            key={location.key}
          >
            <Route exact path="/trybe-20-recipes" component={ Login } />
            <Route exact path="/recipes" component={ Recipes } />
            <Route exact path="/in-progress/:type/:id/" component={ RecipesInProgress } />
            <Route exact path="/:type/:id" component={ RecipesDetails } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            {/* <Route exact path="/profile" component={ Profile } /> */}
            {/* <Route exact path="/favorite-recipes" component={ FavoriteRecipes } /> */}
          </Switch>
        </AnimatePresence>
      </AnimateSharedLayout>
    </RecipesProvider>
  );
}

export default App;
