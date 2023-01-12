import React, { ReactNode, useState } from 'react';
import contexto from './context';
import fetchs from '../fetchs';
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

export default function RecipesProvider({children }: RecipesProvidesProps) {
  const [user, setUser] = useState('');
  const [fixedList, setFixedList] = useState([]);
  const [buttonsNavigation, setButtonsNavigation] = useState([]);
  const [foodId, setFoodId] = useState([]);
  const [drinkId, setDrinkId] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [listApi, setListApi] = useState([]);
  const [filterCat, setFilterCat] = useState([]);
  const [objItem, setObjItem] = useState({});
  const [type, setType] = useState('foods');

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
      console.log(req);
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
        user, setUser,
        type, setType,
        initialRequest, reqApiCategory, 
        reqApiFId, reqApiDId,
        listAllDrinks, listAllFoods,
      }}
    >
      {children}
    </contexto.Provider>
  );
}
