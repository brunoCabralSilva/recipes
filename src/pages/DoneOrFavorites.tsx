import React, { useEffect, useState, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { motion } from 'framer-motion';
import Item from '../components/Item';
import contextRecipes from '../contextRecipes/context';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DoneOrFavorites() {
  const {
    getFavorites,
    setNameOfPage,
  } = useContext(contextRecipes);
  const match = useRouteMatch();

  const [storage, setStorage] = useState([]);
  const [options, setOptions] = useState([]);
  const [button, setButton] = useState('All');

  const generateElements = async () => {
    let storageRecipes: string | null = '';
    if (match.path === '/done-recipes') {
      storageRecipes = localStorage.getItem('doneRecipes');
    } else {
      storageRecipes = localStorage.getItem('favoriteRecipes');
    }
    if (storageRecipes && storageRecipes.length >= 0) {
      setStorage(JSON.parse(storageRecipes));
      setOptions(JSON.parse(storageRecipes));
    } else {
      setStorage([]);
      setOptions([]);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setNameOfPage(match.path === '/done-recipes' ? 'Done Recipes' : 'Favorite Recipes');
    getFavorites();
    generateElements();
  }, []);

  const foodFilterBtn = () => {
    const filterFood = storage.filter((food: any) => food.type === 'food');
    setOptions(filterFood);
    setButton('Foods');
  };
  
  const drinkFilterBtn = () => {
    const filterDrink = storage.filter((drink: any) => drink.type === 'drink');
    setOptions(filterDrink);
    setButton('Drinks');
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.5,
        duration: 1,
      }}
      exit={{ y: -20, opacity: 0.5, transition: { duration: 0.3 } }}
    >
      <Header toggleRecipe={false} />
      <div className="">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            setButton('All');
            setOptions(storage);
          }}
          className={`w-1/3 border border-black hover:bg-dark-brown transition duration-1000 py-2 font-bold ${ button === 'All' ? 'border-b border-b-white': ''}`}
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => foodFilterBtn() }
          className={`w-1/3 border border-black hover:bg-dark-brown transition duration-1000 py-2 font-bold ${ button === 'Foods' ? 'border-b border-b-white': ''}`}
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => drinkFilterBtn() }
          className={`w-1/3 border border-black hover:bg-dark-brown transition duration-1000 py-2 font-bold ${ button === 'Drinks' ? 'border-b border-b-white': ''}`}
        >
          Drinks
        </button>
      </div>
      <p className="mt-16 p-4 md:ml-10 sm:p-0 text-4xl text-center md:text-left" id="text">
          <span className="pr-1">{match.path === '/done-recipes' ? 'Done Recipes -' : 'Favorite Recipes -'}</span>
          <span>{button}</span>
        </p>
      <div className={`grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center w-full p-6  ${options.length < 3 && 'md:h-screen' }`}>
        {
          options && options.length > 0
          ? 
            options.map((item: any, index) => (
              <Item
                item={item}
                index={index}
                buttons={true}
              />
            ))
          : 
            <p className="w-full text-center text-5xl mt-20 lg:col-span-3 sm:col-span-2 col-span-1">
              No recipes yet
            </p>
        }
      </div>
      <Footer />
    </motion.div>
  );
}
