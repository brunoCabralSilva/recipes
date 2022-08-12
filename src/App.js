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
import FoodsId from './pages/FoodsId';
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
            <Route exact path="/foods/:id" component={ FoodsId } />
            <Route exact path="/drinks/:id" component={ DrinksId } />
            <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
            <Route exact path="/drinks/:id/in-progress" component={ DrinksProgress } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/done-recipes" component={ DoneRecipes } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          </Switch>
        </AnimatePresence>
      </AnimateSharedLayout>
      <footer className="bg-black text-white p-0 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center flex my-4 sm:my-0">
          <img src={require('./images/foods.white.png')} className="ml-0 sm:ml-3 h-10 w-10" alt="food" />
          <img src={require('./images/drink.white.png')} className="ml-3 h-8 w-8" alt="drink" />
        </div>
        <div className="sm:w-3/4 p-3 sm:pr-6">
          <p className="text-center sm:text-right w-full">© 2022 Copyright - Bruno Gabryell Cabral da Silva</p>
        </div>
      </footer>
    </RecProvider>
  );
}

export default App;
