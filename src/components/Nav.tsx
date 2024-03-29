import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import contextRecipes from '../contextRecipes/context';
import { IoIosLogOut } from "react-icons/io";

export default function SearchBar() {
  const context = useContext(contextRecipes);
  const history = useHistory();
  const { nameOfPage } = context;
  const [logout, setLogout] = useState(false);

  const [ showMenu, setShowMenu] = useState(false);

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
      return 'border-l border-black bg-white/90 sm:bg-white fixed top-0 right-0 opacity-1 z-30 w-screen sm:w-60 h-screen items-center transition duration-500 flex flex-col text-white justify-center'
    } else return 'opacity-0 hidden items-end p-3 transition duration-500 text-white';
  };

  const returnItemsMenu = () => {
    if(showMenu) {
      return 'items-center justify-center';
    } return 'items-end';
  };

  const returnStyleOfEachLink = (name: string) => {
    return (`my-1 pt-6 pb-1 transition-colors duration-500 border-b-2  hover:border-black text-black ${nameOfPage === name ? 'font-bold border-b-2 border-gray-400' : 'border-transparent' }`);
  };

  return (
    <nav className="font-andika text-base 2xl:text-xl leading-6 z-50">
      {
        logout && 
        <div className="fixed top-0 left-0 z-50 h-screen w-screen flex flex-col items-center justify-center bg-black/40">
          <div className="w-10/12 mr-5 sm:w-1/2 bg-black/80 h-50vh flex flex-col items-center text-white justify-center rounded font-bold">
            <h1 className="text-xl pb-5 text-center px-3">Tem certeza que deseja sair?</h1>
            <div className="grid grid-cols-2 sm:w-1/2 gap-3">
              <button
                type="button"
                className="bg-red-500 px-5 py-2 rounded"
                onClick={() => {
                  localStorage.removeItem('user');
                  history.push('/');
                }}
              >
                Sim
              </button>
              <button
                type="button"
                className="bg-green-500 px-5 py-2 rounded"
                onClick={() => setLogout(false)}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      }
      <div className={`text-lg top-0 right-0 z-40 mr-1 mt-1 flex flex-col ${returnItemsMenu()}`}>
        <div onClick={menu} className={`z-40 py-4 px-3 ${showMenu ? 'fixed top-0 right-0' : 'bg-white'} rounded-full`}>
          <div className={`h-1 w-8 mb-1 z-50 bg-black ${barra1()}`}> </div>
          <div className={`h-1 w-8 mb-1 z-50 bg-black ${barra2()}`}> </div>
          <div className={`h-1 w-8 z-50 bg-black ${barra3()}`}> </div>
        </div>
        <ul className={`${returnItemMenu()}`}>
          <button
            className={returnStyleOfEachLink('Home')}
            type="button"
            onClick={ () => history.push('/home') }
          >
            Home
          </button>
          <button
            className={returnStyleOfEachLink('Search')}
            type="button"
            onClick={ () => history.push('/search') }
          >
            Search
          </button>
          <button
            className={returnStyleOfEachLink('Favorite Recipes')}
            type="button"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
          <button
            className={returnStyleOfEachLink('Done Recipes')}
            type="button"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
        <button
          className="fixed bottom-0 right-0 text-4xl my-1 text-center duration-500 transition-colors text-red-800 hover:text-black py-4 px-3"
          type="button"
          onClick={ () => {
            setLogout(true);
            menu() }}
        >
          <IoIosLogOut />
        </button>
        </ul>
      </div>
    </nav> 
  );
}
