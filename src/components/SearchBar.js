import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import contexto from '../context';

export default function SearchBar(props) {
  const { title, history } = props;
  const cont = useContext(contexto);
  const { context } = cont;
  const { inputSearch, setFetch } = context;
  const [endPoint, setEndPoint] = useState('');
  const meal = 'www.themealdb';
  const cock = 'www.thecocktaildb';

  const drinksFetch = (call) => {
    const { drinks } = call;
    if (Object.values(call).includes(null)) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (drinks.length === 1) {
      setFetch(call);
      history.push(`/drinks/${drinks[0].idDrink}`);
    } else {
      setFetch(call);
    }
  };

  const foodsFetch = (call) => {
    const { meals } = call;
    if (Object.values(call).includes(null)) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (meals.length === 1) {
      setFetch(call);
      history.push(`/foods/${meals[0].idMeal}`);
    } else {
      setFetch(call);
    }
  };

  const search = async () => {
    let api = '';
    if (title === 'Foods') {
      api = meal;
    } else if (title === 'Drinks') {
      api = cock;
    }

    const end = Object.values(endPoint)[0];
    if (Object.keys(endPoint).includes('firstLetter')) {
      if (inputSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const fetchApi = await fetch(`https://${api}.com/api/json/v1/1/${end}${inputSearch}`);
        const fetchJson = await fetchApi.json();
        // setFetch(fetchJson);
        if (title === 'Drinks') {
          drinksFetch(fetchJson);
        } else if (title === 'Foods') {
          foodsFetch(fetchJson);
        }
      }
    } else {
      const fetchApi = await fetch(`https://${api}.com/api/json/v1/1/${end}${inputSearch}`);
      const fetchJson = await fetchApi.json();
      // setFetch(fetchJson);
      if (title === 'Drinks') {
        drinksFetch(fetchJson);
      } else if (title === 'Foods') {
        foodsFetch(fetchJson);
      }
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col sm:flex-row w-full justify-center items-center sm:justify-around">
        <label htmlFor="ingredient" className="w-full sm:w-1/3 text-center my-2 sm:my-0">
          <input
            type="radio"
            id="ingredient"
            name="option"
            data-testid="ingredient-search-radio"
            onClick={ () => setEndPoint({ ingredient: 'filter.php?i=' }) }
            className="m-2"
          />
          Ingredient
        </label>
        <label htmlFor="name" className="w-full sm:w-1/3 text-center my-2 sm:my-0">
          <input
            type="radio"
            id="name"
            name="option"
            data-testid="name-search-radio"
            onClick={ () => setEndPoint({ nameInput: 'search.php?s=' }) }
            className="m-2"
          />
          Name
        </label>
        <label htmlFor="letter" className="w-full sm:w-1/3 text-center my-2 sm:my-0">
          <input
            type="radio"
            id="letter"
            name="option"
            data-testid="first-letter-search-radio"
            onClick={ () => setEndPoint({ firstLetter: 'search.php?f=' }) }
            className="m-2"
          />
          First letter
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => search() }
        className="w-full my-2 py-2 bg-dark-brown text-white font-bold hover:bg-medium-brown transition duration-1000"
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
