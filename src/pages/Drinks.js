import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.5,
        duration: 1,
      }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
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
    </motion.div>
  );
}

Drinks.propTypes = {
  history: PropTypes.func.isRequired,
};
