import { createContext } from 'react';
import { mealFixedListTypes, buttonsNavigationTypes, drinkFixedListTypes } from '../interfaces';

interface RecipesContext {
  user: string,
  setUser: (newState: any) => void,
  fixedList: any[],
  setFixedList: (newState: any) => void,
  buttonsNavigation: any | buttonsNavigationTypes[],
  setButtonsNavigation: (newState: any | buttonsNavigationTypes[]) => void,
  foodId: any[],
  setFoodId: (newState: any) => void,
  drinkId: any[],
  setDrinkId: (newState: any) => void,
  buttons: any[],
  setButtons: (newState: any) => void,
  listApi: any[],
  setListApi: (newState: any) => void,
  filterCat: any[],
  setFilterCat: (newState: any) => void,
  objItem: any,
  setObjItem: (newState: any) => void,
  type: string,
  setType: (newState: string) => void,
  reqApiCategory: (category: string, type: string) => void,
  reqApiFId: (newState: any) => any,
  reqApiDId: (newState: any) => any,
  initialRequest: () => void,
  listAllDrinks: () => void,
  listAllFoods: () => void,
}

const initialValue: RecipesContext = {
  user: '',
  setUser: () => {},
  fixedList: [],
  setFixedList: () => {},
  buttonsNavigation: [],
  setButtonsNavigation: () => {},
  foodId: [],
  setFoodId: () => {},
  drinkId: [],
  setDrinkId: () => {},
  buttons: [],
  setButtons: () => {},
  listApi: [],
  setListApi: () => {},
  filterCat: [],
  setFilterCat: () => {},
  objItem: {},
  setObjItem: () => {},
  type: '',
  setType: () => {},
  reqApiCategory: () => {},
  reqApiFId: () => {},
  reqApiDId: () => {},
  initialRequest: () => {},
  listAllDrinks: () => {},
  listAllFoods: () => {},
}

const contexto = createContext(initialValue);
export default contexto;

