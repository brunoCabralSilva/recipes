import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import share from '../images/shareIcon.svg';
import vazio from '../images/whiteHeartIcon.svg';
import preenchido from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function TwelveItems(props) {
  const { drinkId, foodId, type } = props;
  const [link, setLink] = useState('');
  const [fav, setFav] = useState([]);
  const [itemFD, setItemFD] = useState('');
  const { pathname } = useLocation();

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites !== null) {
      setFav(favorites);
    }
    let text = '';
    if (type === 'drink') {
      text = pathname.replace('/drinks/', '');
    } else {
      text = pathname.replace('/foods/', '');
    } setItemFD(text);
  }, []);

  const retornaIcone = () => {
    if (fav[0] === null) {
      return vazio;
    }
    const ids = fav.map((f) => f.id);
    if (ids.includes(itemFD)) {
      return preenchido;
    }
    return vazio;
  };

  const clickLink = () => {
    setTimeout(() => {
      setLink('');
    }, +'3000');
    setLink('Link copied!');
    copy(
      `http://localhost:3000/${pathname.split('/')[1]}/${
        pathname.split('/')[2]
      }`,
    );
  };

  const favoriteRecipesFunc = () => {
    let itemAdd = {};
    if (type === 'drink') {
      itemAdd = {
        id: drinkId[0].idDrink,
        type: 'drink',
        nationality: '',
        category: drinkId[0].strCategory,
        alcoholicOrNot: drinkId[0].strAlcoholic,
        name: drinkId[0].strDrink,
        image: drinkId[0].strDrinkThumb,
      };
    } else {
      console.log(foodId);
      itemAdd = {
        id: foodId[0].idMeal,
        type: 'food',
        nationality: foodId[0].strArea,
        category: foodId[0].strCategory,
        alcoholicOrNot: '',
        name: foodId[0].strMeal,
        image: foodId[0].strMealThumb,
      };
    }

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([itemAdd]));
      setFav([itemAdd]);
    } else {
      const ids = fav.map((f) => f.id);
      if (ids.includes(itemFD)) {
        const filtro = fav.filter((fil) => fil.id !== itemFD);
        localStorage.setItem('favoriteRecipes', JSON.stringify(filtro));
        setFav(filtro);
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, itemAdd]));
        setFav((prevState) => [...prevState, itemAdd]);
      }
    }
  };

  const handleIng = (x) => {
    const obj = Object.entries(x);
    const ingredients = obj
      .filter((name) => name[0].includes('strIngredient'))
      .filter((item) => item[1] !== '' && item[1] !== null);
    const measure = obj
      .filter((name) => name[0].includes('strMeasure'))
      .filter((item) => item[1] !== '' && item[1] !== null);
    const array = [];
    for (let i = 0; i < ingredients.length; i += 1) {
      array.push(
        <li data-testid={ `${i}-ingredient-name-and-measure` }>
          <span>{ingredients[i][1]}</span>
          <span>
            {measure[i] && ` - ${measure[i][1]}`}
          </span>
        </li>,
      );
    }
    return array;
  };

  const drinkFunc = () => drinkId.map((drink, index) => (
    <div key={ index }>
      <img src={ drink.strDrinkThumb } alt="" data-testid="recipe-photo" />
      <p data-testid="recipe-title">{drink.strDrink}</p>
      <p data-testid="recipe-category">{drink.strAlcoholic}</p>
      <ul>{handleIng(drink)}</ul>
      <p data-testid="instructions">{drink.strInstructions}</p>
      <iframe
        data-testid="video"
        title="vídeo"
        width="420"
        height="345"
        src={ drink.strYoutube }
      >
        {' '}
        Vídeo
        {' '}
      </iframe>
    </div>
  ));

  const foodFunc = () => foodId.map((food, index) => (
    <div key={ index }>
      <img src={ food.strMealThumb } alt="" data-testid="recipe-photo" />
      <p data-testid="recipe-title">{food.strMeal}</p>
      <p data-testid="recipe-category">{food.strCategory}</p>
      <ul>{handleIng(food)}</ul>
      <p data-testid="instructions">{food.strInstructions}</p>
      <iframe
        data-testid="video"
        title="vídeo"
        width="420"
        height="345"
        src={ food.strYoutube }
      >
        {' '}
        Vídeo
        {' '}
      </iframe>
    </div>
  ));

  return (
    <div>
      {type === 'food'
        ? foodFunc()
        : drinkFunc()}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ clickLink }
      >
        <img src={ share } alt="Botão Compartilhar" />
      </button>
      {link && <p>{link}</p>}
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ favoriteRecipesFunc }
        src={ retornaIcone() }
      >
        <img src={ retornaIcone() } alt="botão favoritar/desfavoritar" />
      </button>
    </div>
  );
}

TwelveItems.propTypes = {
  drinkId: PropTypes.string.isRequired,
  foodId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
