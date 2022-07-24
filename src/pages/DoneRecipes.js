import React, { useEffect, useState } from 'react';
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
    const storageRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setStorage(storageRecipes);
    setOptions(storageRecipes);
    console.log(storageRecipes);
  }, []);

  const foodItemReturn = (item, index) => (
    <div>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { `${item.nationality} - ${item.category}`}
      </p>
      { item.tags.map((tag, i) => (
        <span
          data-testid={ `${index}-${tag}-horizontal-tag` }
          key={ i + 1 }
        >
          { tag }
        </span>))}
    </div>
  );

  const drinkItemReturn = (item, index) => (
    <div>
      <p data-testid={ `${index}-horizontal-top-text` }>{item.alcoholicOrNot}</p>
    </div>
  );

  const clickLink = (type, id) => {
    setTimeout(() => {
      setLink('');
    }, +'3000');
    setLink('Link copied!');
    copy(
      `http://localhost:3000/${type}s/${id}`,
    );
  };

  const storageReturn = () => {
    console.log('storageReturn', options);
    if (options.length > 0) {
      const storageMap = options.map((item, index) => (
        <div key={ index }>
          <Link
            to={ `/${item.type}s/${item.id}` }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ item.image }
              alt="imagem"
              className="imageItem"
            />
          </Link>
          <Link
            to={ `/${item.type}s/${item.id}` }
          >
            <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>
            {item.doneDate}
          </p>
          { item.type === 'food'
            ? foodItemReturn(item, index)
            : drinkItemReturn(item, index)}
          <p data-testid={ `${index}-horizontal-done-date` }>{item.startTime}</p>
          <button
            type="button"
            src={ iconeCompartilhar }
            onClick={ () => clickLink(item.type, item.id) }
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img
              src={ iconeCompartilhar }
              alt="compartilhar"
              className="imageItem"
            />
          </button>
          {link && <p>{link}</p>}
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
    <div>
      <Header searchIcon="hidden" title="Done Recipes" history={ history } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setOptions(storage) }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => foodFilterBtn(storage) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => drinkFilterBtn(storage) }
        >
          Drinks
        </button>
      </div>
      {options ? storageReturn() : <p>No recipes yet</p>}
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.func.isRequired,
};
