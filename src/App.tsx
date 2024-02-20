import React from 'react';
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import RecipesProvider from './contextRecipes/RecipesProvider';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import RecipesDetails from './pages/RecipesDetails';
import RecipesInProgress from './pages/RecipesInProgress';
import DoneOrFavorites from './pages/DoneOrFavorites';
import Search from './components/Search';

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
            <Route exact path="/" component={ Recipes } />
            <Route exact path="/home" component={ Recipes } />
            <Route exact path="/in-progress/:type/:id/" component={ RecipesInProgress } />
            <Route exact path="/:type/:id" component={ RecipesDetails } />
            <Route exact path="/done-recipes" component={ DoneOrFavorites } />
            <Route exact path="/favorite-recipes" component={ DoneOrFavorites } />
            <Route exact path="/search" component={ Search } />
          </Switch>
        </AnimatePresence>
      </AnimateSharedLayout>
    </RecipesProvider>
  );
}

export default App;
