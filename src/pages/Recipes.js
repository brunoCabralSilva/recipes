import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DrinksFoods from '../components/DrinksFoods';
import Footer from '../components/Footer';
import contexto from '../context';

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
    <div className="flex flex-col">
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
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
