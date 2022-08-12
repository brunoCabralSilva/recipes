import React, { useState, useEffect, useContext } from 'react';
import contexto from '../context';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Recomended from './Recomended';
import StartRecipe from './StartRecipe';
import share from '../images/shareIcon.svg';
import vazio from '../images/whiteHeartIcon.svg';
import preenchido from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function ItemsId(props) {
  const [link, setLink] = useState('');
  const [fav, setFav] = useState([]);
  const { pathname } = useLocation();
  const cont = useContext(contexto);
  const { context } = cont;
  const { drinkFixedList, initialRequest } = context;
  const {
    name,
    image,
    category,
    instructions,
    youtube,
    id,
    nationality,
    alcoholicOrNot,
    object
  } = props;

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites !== null) {
      setFav(favorites);
    }
  }, []);


  const favoriteRecipesFunc = () => {
    let itemAdd = {
      name: name,
      image: image,
      category: category,
      instructions: instructions,
      youtube: youtube,
      id: id,
      nationality: nationality,
      alcoholicOrNot: alcoholicOrNot,
    };

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([itemAdd]));
      setFav([itemAdd]);
    } else {
      const ids = fav.map((f) => f.id);
      if (ids.includes(id)) {
        const filtro = fav.filter((fil) => fil.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(filtro));
        setFav(filtro);
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites, itemAdd]));
        setFav((prevState) => [...prevState, itemAdd]);
      }
    }
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
        <li data-testid={ `${i}-ingredient-name-and-measure` } className="w-full text-center">
          <span>{ingredients[i][1]}</span>
          <span>
            {measure[i] && ` - ${measure[i][1]}`}
          </span>
        </li>,
      );
    }
    return array;
  };

  const retornaIcone = () => {
    if (fav[0] === null) {
      return vazio;
    }
    const ids = fav.map((f) => f.id);
    if (ids.includes(id)) {
      return preenchido;
    }
    return vazio;
  };

  const buttons = () => {
    return(
      <div className="flex flex-col m-5 mt-10 sm-mt-0">
        <div className="flex flex-row">
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
        {link && <p className="w-full text-center font-bold my-3">{link}</p>}
      </div>
    );
  }


  return(
    <motion.div
      initial={{ y: 20, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
          delay: 0.5,
          duration: 1,
      }}
      exit={{ y: -20, opacity: 0.5, transition: { duration: 0.3 } }}
      >
        <div className="w-full">
        <div className="flex flex-col sm:flex-row">
          <img
            src={ image }
            alt=""
            data-testid="recipe-photo"
            className="w-full sm:w-1/2 h-50vh sm:h-screen object-cover"
          />
          <div className="flex flex-col items-center justify-center w-full sm:w-1/2">
            <p data-testid="recipe-title" className="text-4xl mt-4 sm:mt-0 mb-10 w-11/12 text-center">{name}</p>
            <p data-testid="recipe-category" className="w-full text-center">{category}</p>
            <ul>{handleIng(object)}</ul>
            { buttons() }
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-row m-4 items-center">
          <p data-testid="instructions" className="my-8 text-center sm:text-left w-full sm:w-1/2 pl-3 pr-4">{instructions}</p>
          <iframe
            data-testid="video"
            title="vídeo"
            width="420"
            height="345"
            src={ youtube }
            frameborder="0"
            allowFullScreen
            className="w-full sm:w-1/2"
          >
            {' '}
            Vídeo
            {' '}
          </iframe>
        </div>
      </div>
          <Recomended />
          <StartRecipe /> 
    </motion.div>
  );
}