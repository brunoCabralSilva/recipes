import { ReactNode, useState } from 'react';
import contexto from './context';
import fetchs from '../fetchs';
const copy = require('clipboard-copy');
const {
  fetchFoods,
  fetchBtnFoods,
  fetchDrinks,
  fetchBtnDrinks,
  reqCategoryDrink,
  reqCategoryFood,
  reqApiFoodsID,
  reqApiDrinksID,
} = fetchs;

interface RecipesProvidesProps { children: ReactNode }

export default function RecipesProvider({children }: RecipesProvidesProps) {
  const [fixedList, setFixedList] = useState([]);
  const [buttonsNavigation, setButtonsNavigation] = useState([]);
  const [favAndSharedInItem, setFavAndSharedInItem] = useState([]);
  const [listFavorites, setListFavorites] = useState([
    {
      name: '',
      image: '',
      category: '',
      instructions: '',
      youtube: '',
      id: '',
      nationality: '',
      alcoholicOrNot: '',
      type: '',
      tags: '',
    }
  ]);
  const [messageShared, setMessageShared] = useState('');
  const [listOfItemsFromCat, setListOfItemsFromCat] = useState([]);
  const [typeOfList, setTypeOfList] = useState('foods');
  const [objIngrMeas, setObjIngrMeas] = useState({}); //
  const [objSelected, setObjSelected] = useState({});

  const initialRequest = async (): Promise<void> => {
    const foodList = await fetchFoods();
    setFixedList(foodList.meals);
    const btnFoods = await fetchBtnFoods();
    setButtonsNavigation(btnFoods.meals);
  };

  const listAllDrinks = async(): Promise<void> => {
    const drinkList = await fetchDrinks();
    setFixedList(drinkList.drinks);
    const btnFoods = await fetchBtnDrinks();
    setButtonsNavigation(btnFoods.drinks);
  };

  const listAllFoods = async (): Promise<void> => {
    const foodList = await fetchFoods();
    setFixedList(foodList.meals);
    const btnFoods = await fetchBtnFoods();
    setButtonsNavigation(btnFoods.meals);
  };

  const reqApiCategory = async (category: string): Promise<void> => {
    if(typeOfList === 'foods') {
      const req = await reqCategoryFood(category);
      setListOfItemsFromCat(req.meals);
    } else {
      const req = await reqCategoryDrink(category);
      setListOfItemsFromCat(req.drinks);
    }
  };

  const requestFoodById = async (id: string): Promise<any> => {
    const reqId = await reqApiFoodsID(id);
    return reqId;
  };

  const requestDrinkById = async (id: string): Promise<any> => {
    const reqId = await reqApiDrinksID(id);
    return reqId;
  };

  const getFavorites = (): void => {
    const favorite = localStorage.getItem('favoriteRecipes');
    if (favorite !== null) {
      const favorites = JSON.parse(favorite);
      setListFavorites(favorites);
    }
  };

  const verifyIfIsFavorite = (id: string): boolean => {
    const listFavorites = localStorage.getItem('favoriteRecipes');
    if (listFavorites) {
      const fil = JSON.parse(listFavorites).filter((f: any) => id === f.id);
      if (fil.length > 0) {
        return true;
      } return false;
    } 
    return false;
  };

  const alterFavorites = (objectFavorite: any): void => {
    const objFav = {
      name: objectFavorite.name,
      image: objectFavorite.image,
      category: objectFavorite.category,
      instructions: '',
      youtube: '',
      id: objectFavorite.id,
      nationality: objectFavorite.nationality,
      alcoholicOrNot: objectFavorite.alcoholicOrNot,
      type: objectFavorite.type,
      tags: objectFavorite.tags,
    };
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([objFav]));
      setListFavorites([objFav]);
    } else {
      const ids = listFavorites.filter((f) => f.id === objFav.id);
      if (ids.length > 0) {
        const filtro = listFavorites.filter((fil) => fil.id !== objFav.id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(filtro));
        setListFavorites(filtro);
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...listFavorites, objFav]));
        setListFavorites([...listFavorites, objFav]);
      }
    }
  };

  const sharedLink = (type: string, id: string) => {
    setTimeout(() => {
      setMessageShared('');
    }, +'3000');
    setMessageShared('Link copied!');
    copy(`http://localhost:3000/recipes/${type}/${id}`);
  };

  const createElement = async (type: string, id: string): Promise<void> => {
    if (type === 'food') {
      const search = await requestFoodById(id);
      setObjSelected({
        name: search.meals[0].strMeal,
        image: search.meals[0].strMealThumb,
        category: search.meals[0].strCategory,
        instructions: search.meals[0].strInstructions,
        youtube: search.meals[0].strYoutube,
        id: search.meals[0].idMeal,
        nationality: search.meals[0].strArea,
        alcoholicOrNot: '',
        type: 'food',
        tags: search.meals[0].strTags,
      });
      setObjIngrMeas(search.meals[0]);
    } else {
      const search = await requestDrinkById(id);
      setObjSelected({
        name: search.drinks[0].strDrink,
        image: search.drinks[0].strDrinkThumb,
        category: search.drinks[0].strCategory,
        instructions: search.drinks[0].strInstructions,
        youtube: search.drinks[0].strYoutube,
        id: search.drinks[0].idDrink,
        nationality: '',
        alcoholicOrNot: search.drinks[0].strAlcoholic,
        type: 'drink',
        tags: '',
      });
      setObjIngrMeas(search.drinks[0]);
    }
  };

  return (
    <contexto.Provider
      value={{
        fixedList, setFixedList,
        buttonsNavigation, setButtonsNavigation,
        favAndSharedInItem, setFavAndSharedInItem,
        listOfItemsFromCat, setListOfItemsFromCat,
        typeOfList, setTypeOfList,
        listFavorites, setListFavorites,
        messageShared, setMessageShared,
        objIngrMeas, setObjIngrMeas,
        objSelected, setObjSelected,
        initialRequest, reqApiCategory, 
        requestFoodById, requestDrinkById,
        listAllDrinks, listAllFoods,
        verifyIfIsFavorite,
        getFavorites, alterFavorites,
        sharedLink,
        createElement, 
      }}
    >
      {children}
    </contexto.Provider>
  );
}
