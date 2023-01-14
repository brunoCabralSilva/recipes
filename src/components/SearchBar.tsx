import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import contextRecipes from '../contextRecipes/context';
import AlternateItems from './AlternateItems';

export default function SearchBar() {
  const context = useContext(contextRecipes);
  const history = useHistory();
  const { typeOfList, setListOfItemsFromCat: setFilterCat} = context;
  const [endPoint, setEndPoint] = useState({});
  const [inputSearch, setInputSearch] = useState('');
  const meal = 'www.themealdb';
  const cock = 'www.thecocktaildb';

  const [ showMenu, setShowMenu] = useState(false);

  const drinksFetch = (call: any) => {
    const { drinks } = call;
    if (Object.values(call).includes(null)) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (drinks.length === 1) {
      setFilterCat(call.drinks);
      history.push(`/drinks/${drinks[0].idDrink}`);
    } else {
      setFilterCat(call.drinks);
    }
  };

  const foodsFetch = (call: any) => {
    const { meals } = call;
    if (Object.values(call).includes(null)) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (meals.length === 1) {
      setFilterCat(call.drinks);
      history.push(`/foods/${meals[0].idMeal}`);
    } else {
      setFilterCat(call.drinks);
    }
  };

  const fetchApiFunc = async (end: any) => {
    const fetchApi = await fetch(`https://${typeOfList === 'drinks' ? cock : meal}.com/api/json/v1/1/${end}${inputSearch}`);
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
        if (typeOfList === 'drinks') {
          drinksFetch(fetchDataFinal);
        } else {
          foodsFetch(fetchDataFinal);
        }
      }
    } else {
      const fetchApi = await fetchApiFunc(end);
      if (typeOfList === 'drinks') {
        drinksFetch(fetchApi);
      } else {
        foodsFetch(fetchApi);
      }
    }
    setInputSearch('');
    setShowMenu(!showMenu);
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
        <div className={`fixed top-0 right-0 z-50 mr-1 mt-1 flex flex-col ${returnItemsMenu()}`}>
          <div onClick={menu} className={`z-50 py-4 px-3 ${showMenu ? '' : 'bg-white'} rounded-full`}>
            <div className={`h-1 w-8 mb-1 z-50 ${showMenu ? 'bg-white' : 'bg-black'} ${barra1()}`}> </div>
            <div className={`h-1 w-8 mb-1 z-50 ${showMenu ? 'bg-white' : 'bg-black'} ${barra2()}`}> </div>
            <div className={`h-1 w-8 z-50 ${showMenu ? 'bg-white' : 'bg-black'} ${barra3()}`}> </div>
          </div>
          <ul className={`${returnItemMenu()}`}>
            <button
              className="text-xl my-1 py-2 w-full text-center hover:bg-black duration-500 transition-colors"
              type="button"
              onClick={ () => history.push('/recipes') }
            >
              Home
            </button>
            <button
              className="text-xl my-1 py-2 w-full text-center hover:bg-black duration-500 transition-colors"
              type="button"
              onClick={ () => history.push('/search') }
            >
              Search
            </button>
            <button
              className="text-xl my-1 py-2 w-full text-center hover:bg-black duration-500 transition-colors"
              type="button"
              onClick={ () => history.push('/favorite-recipes') }
            >
              Favorite Recipes
            </button>
            <button
              className="text-xl my-1 py-2 w-full text-center hover:bg-black duration-500 transition-colors"
              type="button"
              onClick={ () => history.push('/done-recipes') }
            >
              Done Recipes
            </button>
            <button
              className="text-xl my-1 py-2 w-full text-center hover:bg-black duration-500 transition-colors"
              type="button"
              onClick={ () => history.push('/profile') }
            >
              Profile
            </button>
            <div className="py-7 flex justify-center w-full">
              <hr className="bg-crepusculo w-1/2" />
            </div>
            <AlternateItems
              setShowMenu={setShowMenu}
              showMenu={showMenu}
            />
            <button
              className="absolute right-0 bottom-0 text-xl my-1 py-2 w-full text-center hover:bg-black duration-500 transition-colors"
              type="button"
              onClick={ () => {
                localStorage.removeItem('user');
                history.push('/trybe-20-recipes');
              } }
            >
              Logout
            </button>
          </ul>
      </div>
    </nav> 
  );
}
