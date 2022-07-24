import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
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
    reqApiFoods();
  }, []);

  useEffect(() => {
    reqApiBtnFoods();
  }, []);

  const handleCategoryFilter = (category) => category
    .slice(0, +'12').map((item, index) => (
      <Link
        to={ `/foods/${item.idMeal}` }
        key={ item.idMeal }
        data-testid={ `${index}-recipe-card` }
      >
        <div>
          <p data-testid={ `${index}-card-name` }>{ item.strMeal }</p>
          <img
            src={ item.strMealThumb }
            alt=""
            className="imageItem"
            data-testid={ `${index}-card-img` }
          />
        </div>
      </Link>
    ));

  const changeToogle = (category) => {
    if (currentCategory !== category) {
      setCurrentCategory(category);
      return reqApiCategory(category);
    }
    setCurrentCategory('');
    resetFilters();
  };

  return (
    <div>
      <Header searchIcon="visible" title="Foods" />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setFilterCategory([]) }
      >
        All
      </button>
      {btnFoods.slice(0, +'5').map((button, index) => (
        <span key={ index }>
          <button
            type="button"
            data-testid={ `${button.strCategory}-category-filter` }
            onClick={ () => changeToogle(button.strCategory) }
          >
            {button.strCategory}
          </button>
        </span>
      ))}
      {filterCategory.length
        ? handleCategoryFilter(filterCategory)
        : (food.length ? food : foodsIn12)
          .slice(0, +'12')
          .map((item, index) => (
            <Link
              to={ `/foods/${item.idMeal}` }
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <div>
                <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ item.strMealThumb }
                  alt=""
                  className="imageItem"
                />
              </div>
            </Link>
          ))}
      <Footer history={ history } />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
