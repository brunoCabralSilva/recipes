import React from 'react';
import { useHistory } from 'react-router-dom';

export default function StartRecipe(props) {
  const { type, id } = props;
  const history = useHistory();

  const redirect = () => {
    if (type === 'drink') {
      history.push(`/drinks/${id}/in-progress`);
    } else {
      history.push(`/foods/${id}/in-progress`);
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
          className="btn-start-recipe"
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
          className="btn-start-recipe"
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
