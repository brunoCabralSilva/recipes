import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import DrinksFoods from '../components/DrinksFoods';
import Footer from '../components/Footer';
import contexto from '../context';
import { motion } from 'framer-motion';

export default function Recipes(props) {
  const { history } = props;
  const [currentCategory, setCurrentCategory] = useState('');
  const cont = useContext(contexto);
  const { context } = cont;

  const {
    food,
    reqApiFoods,
    foodsIn12,
    btnFoods,
    reqApiBtnFoods,
    filterCategory,
    reqApiCategory,
    setFilterCategory,
    resetFilters,
  } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
    reqApiFoods();
  }, []);

  useEffect(() => {
    reqApiBtnFoods();
  }, []);

  const changeToogle = (category) => {
    if (currentCategory !== category) {
      setCurrentCategory(category);
      return reqApiCategory(category);
    }
    setCurrentCategory('');
    resetFilters();
  };

  const setFilter = () => {
    setFilterCategory([]);
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
    className="flex flex-col">
      <DrinksFoods
        type="food"
        btn={btnFoods}
        filterCategory={filterCategory}
        item={food}
        in12={foodsIn12}
        setFilter={setFilter}
        changeToogle={changeToogle}
      />
      <Footer history={ history } />
    </motion.div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
