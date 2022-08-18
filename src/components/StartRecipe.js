import React, { useContext } from 'react';
import contexto from '../context';
import { useHistory } from 'react-router-dom';

export default function StartRecipe() {
  const cont = useContext(contexto);
  const { context } = cont;
  const { type, drinkId, foodId } = context;
  const history = useHistory();

  const redirect = () => {
    if (type === 'foods' && foodId.meals) {
      history.push(`/foods/${foodId.meals[0].idMeal}/in-progress`);
    } else if ( (type === 'drinks' && drinkId.drinks)){
      history.push(`/drinks/${drinkId.drinks[0].idDrink}/in-progress`);
    }
  };

  const buttonStart = () => {
    const getDone = JSON.parse(localStorage.getItem('doneRecipes'));
    const getInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getDone === null && getInProgress === null) {
      return (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="px-3 text-xl py-4 border border-black hover:bg-black transition duration-1000 hover:text-white z-40"
          onClick={ redirect }
        >
          Start Recipe
        </button>
      );
    } if (getInProgress !== null) {
      return (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className=" m-4 px-3 py-4 border border-white hover:bg-red-700 transition duration-1000 hover:text-white z-40"
          onClick={ redirect }
        >
          Continue Recipe
        </button>
      );
    } if (getDone !== null) {
      return null;
    }
  };

  return buttonStart();
}
