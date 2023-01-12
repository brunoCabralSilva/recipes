import React, { useEffect, useContext, useState } from 'react';
import contextRecipes from '../contextRecipes/context';
import { motion } from 'framer-motion';
// import share from '../images/shareIcon.svg';
// import vazio from '../images/whiteHeartIcon.svg';
// import preenchido from '../images/blackHeartIcon.svg';
const copy = require('clipboard-copy');

interface RecDetailsProps {
  match: any,
}

export default function RecipesDetails(props: RecDetailsProps) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [instructions, setInstructions] = useState('');
  const [youtube, setYoutube] = useState('');
  const [id, setId] = useState('');
  const [nationality, setNationality] = useState('');
  const [alcoholicOrNot, setAlcoholicOrNot] = useState('');
  const [link, setLink] = useState('');
  const [obj, setObj] = useState({ });
  const [fav, setFav] = useState({
    user: '',
    favorites: [{
      id: '',
      link: '',
      name: '',
      image: '',
      youtube: '',
      category: '',
      nationality: '',
      instructions: '',
      alcoholicOrNot: '',
    }],
  });

  const context = useContext(contextRecipes);
  const { reqApiFId, reqApiDId, user } = context;

  const getFavorites = () => {
    const favorite = localStorage.getItem('favoriteRecipes');
    if (favorite !== null) {
      const favorites = JSON.parse(favorite);
      setFav(favorites);
    }
  };

  const createElement = async () => {
    const { match: { params: { type, id }} } = props;
    if (type === 'foods') {
      const search = await reqApiFId(id);
      setName(search.meals[0].strMeal);
      setImage(search.meals[0].strMealThumb);
      setCategory(search.meals[0].strCategory);
      setInstructions(search.meals[0].strInstructions);
      setYoutube(search.meals[0].strYoutube);
      setId(search.meals[0].idMeal);
      setNationality(search.meals[0].strArea);
      setAlcoholicOrNot('');
      setObj(search);
    } else {
      const search = await reqApiDId(id);
      setName(search.drinks[0].strDrink);
      setImage(search.drinks[0].strDrinkThumb);
      setCategory(search.drinks[0].strCategory);
      setInstructions(search.drinks[0].strInstructions);
      setYoutube(search.drinks[0].strYoutube);
      setId(search.drinks[0].idDrink);
      setNationality('');
      setAlcoholicOrNot(search.drinks[0].strAlcoholic);
      setObj(search);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getFavorites();
    createElement();
  }, []);

  const clickLink = () => {
    const { match: { params: { type, id }} } = props;
    setTimeout(() => {
      setLink('');
    }, +'3000');
    setLink('Link copied!');
    copy(`http://localhost:3000/recipes/${type}/${id}`);
  };

  const addFavorites = () => {
    let itemAdd = {
      id,
      link,
      name,
      image,
      youtube,
      category,
      nationality,
      instructions,
      alcoholicOrNot,
    };

    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(
        { 
          user,
          favorites: [itemAdd]
        },
      ));
      setFav({ user, favorites: [itemAdd] });
    } else {
      const ids = fav.favorites.filter((f) => f.id === id);
      if (ids.length > 0) {
        const filtro = fav.favorites.filter((fil) => fil.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify({ user, favorites: filtro }));
        setFav({ user, favorites: filtro });
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify(
          { 
            user,
            favorites: [...fav.favorites, itemAdd],
          },
        ));
        setFav({
          user,
          favorites:[...fav.favorites, itemAdd]
        });
      }
    }
  };

  const retornaIcone = () => {
    if (fav.favorites[0] === null) {
      // return vazio;
    }
    const ids = fav.favorites.map((f) => f.id);
    if (ids.includes(id)) {
      // return preenchido;
    }
    // return vazio;
  };

  const buttons = () => {
    return(
      <div className="flex">
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ addFavorites }
          className="mx-3"
        >
          {/* <img src={ retornaIcone() } alt="botão favoritar/desfavoritar" /> */}
        </button>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ clickLink }
          className="mx-3"
        >
          {/* <img src={ share } alt="Botão Compartilhar" /> */}
        </button>
        {link && <p className="w-full text-base sm:text-2xl text-center font-bold my-3">{link}</p>}
      </div>
    );
  };

  const handleIng = (x: any) => {
    const object: any = Object.entries(x.meals[0]);
    const ingredients = object.filter((name: string) => name[0].includes('Ingredient') && name[1].length > 2);
    const measure = object.filter((name: string) => name[0].includes('Measure') && name[1].length > 2);
    const array: any = [];
    for (let i = 0; i < ingredients.length; i += 1) {
      array.push(
        <li data-testid={ `${i}-ingredient-name-and-measure` } className="w-full">
          { <span>{ ingredients[i][1] }</span> }
          {' - '}
          { <span>{ measure[i][1] }</span> }
        </li>,
      );
    }
    return array;
  };

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
        <div className="flex-col justify-center items-center w-full mt-4 sm:mt-0 mb-10 text-left flex z-40">
          <div className="w-full flex justify-center flex-col sm:flex-row items-center my-10">
            <p data-testid="recipe-title" className="text-center text-4xl mb-10 sm:mb-0 sm:text-6xl">{name}</p>
            <div className="mx-10 flex justify-start">{ buttons() }</div>
          </div>
        <div
          className="w-full flex flex-col sm:flex-row"
        >
          <img
            src={ image }
            alt=""
            data-testid="recipe-photo"
            className="object-cover w-full sm:w-1/2 sm:ml-16"
          />
          <div className="flex justify-center w-full sm:w-1/2">
            <div className="w-full h-full text-center text-black z-40 flex flex-col items-center justify-center pb-10">
              <div className="pb-20">
                <p data-testid="recipe-title" className="w-full pt-10 text-4xl mt-4 sm:mt-0">Ingredients</p>
                <p data-testid="recipe-category" className="w-full pt-1 text-2xl sm:mt-0 mb-10 sm:mb-5 italic">{category}</p>
                <ul className="text-lg">
                  {Object.values(obj).length > 0 && handleIng(obj)}
                </ul>
              </div>
              {/* <StartRecipe />  */}
            </div>
            </div>
          </div>
        </div>
    </motion.div>
  );
}
