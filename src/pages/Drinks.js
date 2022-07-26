import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinksFoods from '../components/DrinksFoods';
import contexto from '../context';

export default function Drinks(props) {
  const { history } = props;

  const [cat, setCat] = useState('');

  const cont = useContext(contexto);
  const { context } = cont;

  const { drink, reqApiDrinks, drinksIn12, btnDrinks,
    reqApiBtnDrinks, filterCategoryDrink, reqApiCategoryDrink,
    setFilterCategoryDrink, resetFilters } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
    reqApiDrinks();
  }, []);

  useEffect(() => {
    reqApiBtnDrinks();
  }, []);

  const changeToogle = (category) => {
    if (cat !== category) {
      setCat(category);
      return reqApiCategoryDrink(category);
    }
    setCat('');
    resetFilters();
  };

  const setFilter = () => {
    setFilterCategoryDrink([]);
  }

  return (
    <div>
       <DrinksFoods
        type="drink"
        btn={btnDrinks}
        filterCategory={filterCategoryDrink}
        item={drink}
        in12={drinksIn12}
        setFilter={setFilter}
        changeToogle={changeToogle}
     />
      <Footer history={ history } />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.func.isRequired,
};
