import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import contexto from '../context';
import Header from '../components/Header';
import AlternateItems from '../components/AlternateItems';

export default function SearchBar() {
  const cont = useContext(contexto);
  const history = useHistory();
  const { context } = cont;
  const { type, setSearchItem, setSearchBar } = context;
  const [endPoint, setEndPoint] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const meal = 'www.themealdb';
  const cock = 'www.thecocktaildb';

  const [ showMenu, setShowMenu] = useState(false);

  const drinksFetch = (call) => {
    const { drinks } = call;
    if (Object.values(call).includes(null)) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (drinks.length === 1) {
      setSearchItem(call);
      setSearchBar();
      history.push(`/drinks/${drinks[0].idDrink}`);
    } else {
      setSearchItem(call);
      setSearchBar();
    }
  };

  const foodsFetch = (call) => {
    const { meals } = call;
    if (Object.values(call).includes(null)) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (meals.length === 1) {
      setSearchItem(call);
      setSearchBar();
      history.push(`/foods/${meals[0].idMeal}`);
    } else {
      setSearchItem(call);
      setSearchBar();
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

  const menu = () => {
    setShowMenu(!showMenu);
  }

  const barra1 = () => {
    if(!showMenu) {
      return 'rotate-0 transition duration-500';
    } return 'rotate-_45deg transition duration-500 translate-y-2';
  }

  const barra2 = () => {
    if(!showMenu) {
      return 'rotate-0 transition duration-500';
    } return 'rotate-45 transition duration-500';
  }

  const barra3 = () => {
    if(!showMenu) {
      return 'opacity-1 transition duration-500';
    } return 'opacity-0 transition duration-500';
  }

  const returnItemMenu = () => {
    if(showMenu) {
      return 'bg-half-transp fixed top-0 right-0 opacity-1 z-30 w-screen sm:w-60  h-screen items-end pt-10 transition duration-500 flex flex-col text-white justify-center'
    } else return 'opacity-0 hidden items-end p-3 transition duration-500 text-white';
  }

  const returnItemsMenu = () => {
    if(showMenu) {
      return 'items-center justify-center';
    } return 'items-end';
  }

    return (
      <nav className="w-full font-andika text-base absolute 2xl:text-xl leading-6 z-50">
        <div className={`fixed right-0 top-0 z-40 mr-4 mt-4 flex flex-col ${returnItemsMenu()}`}>
            <div onClick={menu} className="z-50">
              <div className={`h-1 w-8 mb-1 z-40 ${showMenu ? 'bg-white' : 'bg-black'} ${barra1()}`}> </div>
              <div className={`h-1 w-8 mb-1 z-40 ${showMenu ? 'bg-white' : 'bg-black'} ${barra2()}`}> </div>
              <div className={`h-1 w-8 z-40 ${showMenu ? 'bg-white' : 'bg-black'} ${barra3()}`}> </div>
            </div>
          <ul
            className={`${returnItemMenu()}`}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            exit={{ y: -30, opacity: 0, transition: { duration: 0.5 } }}
          >
            <div className="flex flex-col w-10/12 mx-auto items-center h-screen">
           <input
            type="text"
            data-testid="search-input"
            value={ inputSearch }
            onChange={ (e) => setInputSearch(e.target.value) }
            placeholder="Type here"
            className="text-center text-white mt-6 mb-2 w-full my-4 p-2 bg-transp border-b "
          />
        <div className="flex flex-col rounded-full justify-center items-center sm:justify-around w-full md:w-full my-1">
          <div className="flex flex-col">
            <label htmlFor="ingredient" className="w-full text-left my-1 p-1 flex justify-left rounded-full">
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
            <label htmlFor="name" className="w-full text-left my-1 p-1 flex justify-left rounded-full">
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
            <label htmlFor="letter" className="w-full text-left my-1 p-1 flex justify-left rounded-full">
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
        </div>
        <a href={inputSearch !== '' && "#text"} className="w-full">
          <button
            type="button"
            onClick={ search }
            className="w-full md:w-full mt-2 py-2 bg-white hover:bg-black hover:border hover:border-white hover:text-white text-black font-bold transition duration-1000"
          >
            Search
          </button>
        </a>
      </div>
          <div className="py-7 flex justify-center w-full">
            <hr className="bg-crepusculo w-1/2" />
          </div>
          <AlternateItems />
        </ul>
      </div>
    </nav> 
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
