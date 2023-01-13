import React, { ReactNode, useState } from 'react';
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

interface RecipesProvidesProps {
  children: ReactNode,
}

interface ItemFavoriteType {
  id: string,
  link: string,
  name: string,
  image: string,
  youtube: string,
  category: string,
  nationality: string,
  instructions: string,
  alcoholicOrNot: string,
};

export default function RecipesProvider({children }: RecipesProvidesProps) {
  const [fixedList, setFixedList] = useState([]);
  const [buttonsNavigation, setButtonsNavigation] = useState([]);
  const [foodId, setFoodId] = useState([]);
  const [drinkId, setDrinkId] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [listApi, setListApi] = useState([]);
  const [fav, setFav] = useState([
    {
      id: '',
      link: '',
      name: '',
      image: '',
      youtube: '',
      category: '',
      nationality: '',
      instructions: '',
      alcoholicOrNot: '',
    }
  ]);
  const [link, setLink] = useState('');
  const [filterCat, setFilterCat] = useState([]);
  const [objItem, setObjItem] = useState({});
  const [type, setType] = useState('foods');
  const [objIngrMeas, setObjIngrMeas] = useState({});
  const [objGeneralist, setObjGeneralist] = useState({
    name: '',
    image: '',
    category: '',
    instructions: '',
    youtube: '',
    id: '',
    nationality: '',
    alcoholicOrNot: '',
  });

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

  const reqApiCategory = async (category: string, theType: string): Promise<void> => {
    if(theType === 'foods') {
      const req = await reqCategoryFood(category);
      setFilterCat(req.meals);
    } else {
      const req = await reqCategoryDrink(category);
      setFilterCat(req.drinks);
    }
  };

  const reqApiFId = async (id: string): Promise<any> => {
    const reqId = await reqApiFoodsID(id);
    return reqId;
  };

  const reqApiDId = async (id: string): Promise<any> => {
    const reqId = await reqApiDrinksID(id);
    return reqId;
  };

  const getFavorites = () => {
    const favorite = localStorage.getItem('favoriteRecipes');
    if (favorite !== null) {
      const favorites = JSON.parse(favorite);
      setFav(favorites);
    }
  };

  const isFav = (id: string) => {
    const listFavorites = localStorage.getItem('favoriteRecipes');
    if (listFavorites) {
      const fil = JSON.parse(listFavorites).filter((f: any) => id === f.id);
      if (fil.length > 0) {
        return true;
      } return false;
    } 
    return false;
  };

  const addFavorites = (objectFavorite: ItemFavoriteType) => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([objectFavorite]));
      setFav([objectFavorite]);
    } else {
      const ids = fav.filter((f) => f.id === objectFavorite.id);
      if (ids.length > 0) {
        const filtro = fav.filter((fil) => fil.id !== objectFavorite.id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(filtro));
        setFav(filtro);
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify([...fav, objectFavorite]));
        setFav([...fav, objectFavorite]);
      }
    }
  };

  const clickLink = (props: any) => {
    const { match: { params: { type, id }} } = props;
    setTimeout(() => {
      setLink('');
    }, +'3000');
    setLink('Link copied!');
    copy(`http://localhost:3000/recipes/${type}/${id}`);
  };

  const createElement = async (props: any): Promise<void> => {
    const { match: { params: { id }} } = props;
    if (type === 'foods') {
      const search = await reqApiFId(id);
      setObjGeneralist({
        name: search.meals[0].strMeal,
        image: search.meals[0].strMealThumb,
        category: search.meals[0].strCategory,
        instructions: search.meals[0].strInstructions,
        youtube: search.meals[0].strYoutube,
        id: search.meals[0].idMeal,
        nationality: search.meals[0].strArea,
        alcoholicOrNot: '',
      });
      setObjIngrMeas(search.meals[0]);
    } else {
      const search = await reqApiDId(id);
      setObjGeneralist({
        name: search.drinks[0].strDrink,
        image: search.drinks[0].strDrinkThumb,
        category: search.drinks[0].strCategory,
        instructions: search.drinks[0].strInstructions,
        youtube: search.drinks[0].strYoutube,
        id: search.drinks[0].idDrink,
        nationality: '',
        alcoholicOrNot: search.drinks[0].strAlcoholic,
      });
      setObjIngrMeas(search.drinks[0]);
    }
  };

  return (
    <contexto.Provider
      value={{
        fixedList, setFixedList,
        buttonsNavigation, setButtonsNavigation,
        foodId, setFoodId,
        drinkId, setDrinkId,
        buttons, setButtons,
        listApi, setListApi,
        filterCat, setFilterCat,
        objItem, setObjItem,
        type, setType,
        fav, setFav,
        initialRequest, reqApiCategory, 
        reqApiFId, reqApiDId,
        listAllDrinks, listAllFoods,
        isFav,
        addFavorites,
        clickLink,
        link,
        setLink,
        getFavorites,
        createElement,
        objIngrMeas,
        setObjIngrMeas,
        objGeneralist,
        setObjGeneralist,
      }}
    >
      {children}
    </contexto.Provider>
  );
}
