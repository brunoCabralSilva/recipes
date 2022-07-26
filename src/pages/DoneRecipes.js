import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import iconeCompartilhar from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DoneRecipes(props) {
  const { history } = props;
  const [storage, setStorage] = useState([]);
  const [options, setOptions] = useState([]);
  const [link, setLink] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const storageRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setStorage(storageRecipes);
    setOptions(storageRecipes);
    console.log(storageRecipes);
  }, []);

  const foodItemReturn = (item, index) => (
    <span>
      <span data-testid={ `${index}-horizontal-top-text` }>
        { `${item.nationality} - ${item.category}`}
      </span>
      { item.tags.map((tag, i) => (
        <span
          data-testid={ `${index}-${tag}-horizontal-tag` }
          key={ i + 1 }
        >
          { tag }
        </span>))}
    </span>
  );

  const drinkItemReturn = (item, index) => (
      <span data-testid={ `${index}-horizontal-top-text` }>{item.alcoholicOrNot}</span>
  );

  const clickLink = (type, id) => {
    setTimeout(() => {
      setLink('');
    }, +'3000');
    setLink('Link copied!');
    copy(
      `https://brunocabralsilva.github.io//${type}s/${id}`,
    );
  };

  const storageReturn = () => {
    if (options.length > 0) {
      const storageMap = options.map((item, index) => (
        <div key={ index } className="m-3 w-full sm:w-43% md:w-30% xl:w-23% flex h-80 relative">
          <Link
            to={ `/${item.type}s/${item.id}` }
          >
          <div className="absolute bg-gradient-to-t from-min-transp to-transp w-full h-80
          z-20" />
          </Link>
          <Link
            to={ `/${item.type}s/${item.id}` }
            className="w-full"
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt="imagem"
              className="h-full w-full object-cover"
            />
          </Link>
          <Link
              to={ `/${item.type}s/${item.id}`}
              className="absolute z-30 flex flex-col justify-end h-full w-full font-bold text-white text-xl p-3"
            >
              <p data-testid={ `${index}-horizontal-name` }>
                {item.name}
                {' - '}
                { item.type === 'food'
                  ? foodItemReturn(item, index)
                  : drinkItemReturn(item, index)}
              </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {item.doneDate}
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>{item.startTime}</p>
            </Link>
            <div className="absolute top-0 right-0 p-1 w-full z-40 flex items-end flex-col">
              <button
                type="button"
                src={ iconeCompartilhar }
                onClick={ () => clickLink(item.type, item.id) }
                data-testid={ `${index}-horizontal-share-btn` }
                className="absolute top-0 right-0 p-1 w-full z-40 flex justify-end"
              >
                <img
                  src={ iconeCompartilhar }
                  alt="compartilhar"
                  className="bg-light-transp p-3"
                  />
              </button>
              {link && <p className="absolute font-bold z-40 top-16 text-black">{link}</p>}
            </div>
        </div>
      ));
      return storageMap;
    }
  };

  const foodFilterBtn = (filter) => {
    const filterFood = filter.filter((food) => food.type === 'food');
    setOptions(filterFood);
  };

  const drinkFilterBtn = (filter) => {
    const filterDrink = filter.filter((drink) => drink.type === 'drink');
    setOptions(filterDrink);
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
      <Header searchIcon="hidden" title="Done Recipes" history={ history } />
      <div className="bg-medium-brown w-full text-white font-bold mt-1">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setOptions(storage) }
          className="w-1/3 border border-white hover:bg-dark-brown transition duration-1000 py-2"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => foodFilterBtn(storage) }
          className="w-1/3 border border-white hover:bg-dark-brown transition duration-1000 py-2"
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => drinkFilterBtn(storage) }
          className="w-1/3 border border-white hover:bg-dark-brown transition duration-1000 py-2"
        >
          Drinks
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center">
      {options ? storageReturn() : <p className="w-full text-center text-5xl mt-20">No recipes yet</p>}
      </div>
    </motion.div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.func.isRequired,
};
