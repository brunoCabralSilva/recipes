import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import contexto from '../context';
import share from '../images/shareIcon.svg';
import vazio from '../images/whiteHeartIcon.svg';
import preenchido from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function DrinksProgress(props) {
  const history = useHistory();
  const [save, setSave] = useState([]);
  const [link, setLink] = useState('');
  const [fav, setFav] = useState([]);
  const [itemFD, setItemFD] = useState('');
  const { pathname } = useLocation();

  const cont = useContext(contexto);
  const { context } = cont;
  const { drinksInProgress, reqApiProgressDrinks } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
    const getItens = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getItens === null) {
      setSave([getItens]);
    } else {
      setSave(getItens);
    }
    const {
      match: {
        params: { id },
      },
    } = props;

    reqApiProgressDrinks(id);

    if (favorites !== null) {
      setFav(favorites);
    } const texto = pathname.replace('/drinks/', '');
    const text = texto.replace('/in-progress', '');
    setItemFD(text);
  }, []);

  const returnDisabled = () => {
    if (drinksInProgress[0]) {
      const obj = Object.entries(drinksInProgress[0]);
      const ingredients = obj
        .filter((name) => name[0].includes('strIngredient'))
        .filter((item) => item[1] !== '' && item[1] !== null);
      const ingMapped = ingredients.map((itemIng) => itemIng[1]);
      const filterSave = save.filter((sav) => ingMapped.includes(sav));

      if (ingredients.length === filterSave.length) return false;
      if (ingredients.length !== filterSave.length) return true;
    }
  };

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

  const handleClass = (item) => {
    const getItens = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getItens !== null && getItens.includes(item)) {
      return 'through';
    }
  };

  const handleCheck = (item) => {
    if (save !== null && save.includes(item)) {
      return true;
    }
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setSave((prevState) => [...prevState, e.target.name]);
      const getItens = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (getItens === null) {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify([e.target.name]),
        );
      } else {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify([...getItens, e.target.name]),
        );
      }
      const span = e.target.parentNode.querySelector('.ing');
      span.style.textDecoration = 'line-through';
    } else {
      const span = e.target.parentNode.querySelector('.ing');
      span.style.textDecoration = 'none';
      const getItens = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const newItens = getItens.filter((item) => item !== e.target.name);
      localStorage.setItem('inProgressRecipes', JSON.stringify(newItens));
      setSave(newItens);
    }
  };

  const handleIng = (drink) => {
    const obj = Object.entries(drink);
    const ingredients = obj
      .filter((name) => name[0].includes('strIngredient'))
      .filter((item) => item[1] !== '' && item[1] !== null);
    const measure = obj
      .filter((name) => name[0].includes('strMeasure'))
      .filter((item) => item[1] !== '' && item[1] !== null);
    const array = [];
    for (let i = 0; i < ingredients.length; i += 1) {
      array.push(
        <span className="check flex w-4/5 mx-auto justify-start py-1" data-testid={ `${i}-ingredient-step` }>
          <input
            type="checkbox"
            name={ ingredients[i][1] }
            className="mr-2"
            onChange={ handleChange }
            checked={ handleCheck(ingredients[i][1]) }
            data-testid={ ingredients[i][1] }
          />
          <li
            className={ `ing ${handleClass(ingredients[i][1])}` }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            <span>{ingredients[i][1]}</span>
            <span>{measure[i] && ` - ${measure[i][1]}`}</span>
          </li>
        </span>,
      );
    }
    return array;
  };

  const favoriteRecipesFunc = () => {
    const itemAdd = {
      id: drinksInProgress[0].idDrink,
      type: 'drink',
      nationality: '',
      category: drinksInProgress[0].strCategory,
      alcoholicOrNot: drinksInProgress[0].strAlcoholic,
      name: drinksInProgress[0].strDrink,
      image: drinksInProgress[0].strDrinkThumb,
    };

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

  const directClick = () => {
    const itemDrink = {
      id: drinksInProgress[0].idDrink,
      type: 'drink',
      nationality: '',
      category: drinksInProgress[0].strCategory,
      alcoholicOrNot: drinksInProgress[0].strAlcoholic,
      name: drinksInProgress[0].strDrink,
      image: drinksInProgress[0].strDrinkThumb,
      doneDate: new Date(),
      tag: drinksInProgress[0].strTags,
    };
    const localGet = JSON.parse(localStorage.getItem('doneRecipes'));
    if (localGet === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([itemDrink]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([...localGet, itemDrink]));
    }
    history.push('/done-recipes');
  };

  const clickLink = () => {
    setTimeout(() => {
      setLink('');
    }, +'2000');
    setLink('Link copied!');
    copy(
      `http://localhost:3000/${pathname.split('/')[1]}/${
        pathname.split('/')[2]
      }`,
    );
  };

  return (
    <div>
      {drinksInProgress.map((drink) => (
        <div key={ drink.idDrink } className="flex flex-col items-center">
          <div className="flex flex-col sm:flex-row w-full">
          <img src={ drink.strDrinkThumb } alt="" data-testid="recipe-photo" clasName="object-cover w-full sm:w-50%" />
          <div className="w-full sm:w-43% justify-center items-start flex flex-col">
            <p data-testid="recipe-title" className="mt-10 mb-5 text-4xl font-bold w-full text-center">
              {drink.strDrink}
              <span>{' - '}</span>
              <span data-testid="recipe-category">{drink.strCategory}</span>
            </p>
            <p data-testid="instructions" className="text-center w-4/5 mx-auto py-4">
              {drink.strInstructions}
            </p>
            <div className="flex my-4 w-full justify-center">
              <button
                type="button"
                data-testid="favorite-btn"
                onClick={ favoriteRecipesFunc }
                src={ retornaIcone() }
                className="mx-3"
              >
                <img src={ retornaIcone() } alt="botão favoritar/desfavoritar" />
              </button>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ clickLink }
                className="mx-3"
              >
                <img src={ share } alt="Botão Compartilhar" />
              </button>
            </div>
            {link && <p className="w-full text-center py-5 font-bold">{link}</p>}
            <ul className="w-full my-6 sm:my-0">{handleIng(drink)}</ul>
            </div>
          </div>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ directClick }
            disabled={ returnDisabled() }
            className="fixed bottom-0 right-0 m-4 bg-white px-3 py-4 border border-black hover:bg-madeira transition duration-1000 hover:text-white"
          >
            Finalizar
          </button>
        </div>
      ))}
    </div>
  );
}
DrinksProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
