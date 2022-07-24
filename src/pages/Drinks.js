import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
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

  const handleCategoryFilter = (category) => category
    .slice(0, +'12').map((item, index) => (
      <Link
        to={ `/drinks/${item.idDrink}` }
        key={ item.idDrink }
        data-testid={ `${index}-recipe-card` }
      >
        <div>
          <p data-testid={ `${index}-card-name` }>{ item.strDrink }</p>
          <img
            src={ item.strDrinkThumb }
            alt=""
            className="imageItem"
            data-testid={ `${index}-card-img` }
          />
        </div>
      </Link>
    ));

  return (
    <div>
      <Header searchIcon="visible" title="Drinks" history={ history } />
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setFilterCategoryDrink([]) }
      >
        All
      </button>
      {btnDrinks.slice(0, +'5').map((button, index) => (
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
      {filterCategoryDrink.length
        ? handleCategoryFilter(filterCategoryDrink)
        : (drink.length ? drink : drinksIn12)
          .slice(0, +'12')
          .map((item, index) => (
            <Link
              to={ `/drinks/${item.idDrink}` }
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <div>
                <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ item.strDrinkThumb }
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

Drinks.propTypes = {
  history: PropTypes.func.isRequired,
};
