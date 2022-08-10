import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import contexto from '../context';
import Header from '../components/Header';

export default function SearchBar() {
  const cont = useContext(contexto);
  const history = useHistory();
  const { context } = cont;
  const { type, setSearchItem } = context;
  const [endPoint, setEndPoint] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const meal = 'www.themealdb';
  const cock = 'www.thecocktaildb';

  const drinksFetch = (call) => {
    console.log(call);
    const { drinks } = call;
    if (Object.values(call).includes(null)) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (drinks.length === 1) {
      setSearchItem(call);
      history.push(`/drinks/${drinks[0].idDrink}`);
    } else {
      setSearchItem(call);
    }
  };

  const foodsFetch = (call) => {
    const { meals } = call;
    if (Object.values(call).includes(null)) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (meals.length === 1) {
      setSearchItem(call);
      history.push(`/foods/${meals[0].idMeal}`);
    } else {
      setSearchItem(call);
    }
  };

  const fetchApiFunc = async (end) => {
    const fetchApi = await fetch(`https://${type === 'drinks' ? cock : meal}.com/api/json/v1/1/${end}${inputSearch}`);
    const fetchJson = await fetchApi.json();
    return fetchJson;
  }

  const search = async () => {
    const end = Object.values(endPoint)[0];
    if (Object.keys(endPoint).includes('firstLetter')) {
      if (inputSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const fetchDataFinal = await fetchApiFunc(end);
        if (type === 'drinks') {
          drinksFetch(fetchDataFinal);
        } else {
          foodsFetch(fetchDataFinal);
        }
      }
    } else {
      const fetchApi = await fetchApiFunc(end);
      if (type === 'drinks') {
        drinksFetch(fetchApi);
      } else {
        foodsFetch(fetchApi);
      }
    }
    setInputSearch('');
  };

  return (
    <div>
    <Header searchIcon="visible" className="w-full" title="" />
    <div className="flex flex-col w-1/4 px-5 mx-auto items-center glassmorphism h-screen fixed">
        <input
          type="text"
          data-testid="search-input"
          value={ inputSearch }
          onChange={ (e) => setInputSearch(e.target.value) }
          placeholder="Search"
          className="rounded-full text-center mt-6 mb-2 w-full my-4 p-2 glassmorphism"
        />
      <div className="flex flex-col rounded-full justify-center items-center sm:justify-around w-full md:w-full my-1">
        <label htmlFor="ingredient" className="w-full text-center my-2 p-1 bg-white flex justify-center rounded-full">
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
        <label htmlFor="name" className="w-full text-center p-1 bg-white flex justify-center rounded-full">
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
        <label htmlFor="letter" className="py-2 w-full text-center my-2 p-1 bg-white flex justify-center rounded-full">
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
      <a href={inputSearch !== '' && "#text"} className="w-full">
        <button
          type="button"
          onClick={ search }
          className="rounded-full w-full md:w-full mt-3 py-3 bg-dark-brown text-white font-bold hover:bg-medium-brown transition duration-1000"
        >
          Buscar
        </button>
      </a>
    </div>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
