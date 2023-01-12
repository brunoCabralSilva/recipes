// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import contexto from './index';
// import fetchs from '../fetchs';
// const {
//   fetchFoods,
//   fetchBtnFoods,
//   fetchDrinks,
//   fetchBtnDrinks,
//   reqCategoryDrink,
//   reqCategoryFood,
//   reqApiFoodsID,
//   reqApiDrinksID,
// } = fetchs;

// export default function RecProvider({ children }: any) {
//   const [mealFixedList, setMealFixedList] = useState([]);
//   const [drinkFixedList, setDrinkFixedList] = useState([]);
//   const [btnFoodFixedList, setBtnFoodFixedList] = useState([]);
//   const [btnDrinkFixedList, setBtnDrinkFixedList] = useState([]);
//   const [foodId, setFoodId] = useState([]);
//   const [drinkId, setDrinkId] = useState([]);
//   const [buttons, setButtons] = useState([]);
//   const [listApi, setListApi] = useState([]);
//   const [filterCat, setFilterCat] = useState([]);
//   const [objItem, setObjItem] = useState({});
//   const [type, setType] = useState('foods');
//   const [searchArea, setSearchArea] = useState(false);

//   const initialRequest = async () => {
//     const food = await fetchFoods();
//     setMealFixedList(food.meals);
//     const btnApiFood = await fetchBtnFoods();
//     setBtnFoodFixedList(btnApiFood.meals);
//     const drink = await fetchDrinks();
//     setDrinkFixedList(drink.drinks);
//     const btnApiDrink = await fetchBtnDrinks();
//     setBtnDrinkFixedList(btnApiDrink.drinks);
//       if (type === 'drinks') {
//       setButtons(btnDrinkFixedList);
//       setListApi(drinkFixedList);
//     } else {
//       setButtons(btnFoodFixedList);
//       setListApi(mealFixedList);
//     }
//   }

//   const reqApiCategory = async (category: any) => {
//     if(type === 'drinks') {
//       const req = await reqCategoryDrink(category);
//       setFilterCat(req.drinks);
//     } else {
//       const req = await reqCategoryFood(category);
//       setFilterCat(req.meals);
//     }
//   }

//   const alterType = (type: any) => {
//     setType(type);
//   }

//   const clearFilterCat = () => {
//     setFilterCat([]);
//   }

//   const setSearchBar = (bool: any) => {
//     if(bool === undefined) {
//     setSearchArea(!searchArea);
//     } else setSearchArea(bool);
//   }

//   const setInListApi = (list: any) => {
//     setListApi(list);
//   }

//   const setSearchItem = (items: any) => {
//     if(type === 'drinks') {
//       setFilterCat(items.drinks);
//     } else setFilterCat(items.meals);
//   }

//   const reqApiFId = async (id: any) => {
//     const reqId = await reqApiFoodsID(id);
//     setFoodId(reqId);
//   };

//   const reqApiDId = async (id: any) => {
//     const reqId = await reqApiDrinksID(id);
//     setDrinkId(reqId);
//   };

//   const sendObjItem = (object: any) => {
//     setObjItem(object);
//   }

//   // const reqApiProgressDrinks = async (id) => {
//   //   const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
//   //   const result = await fetch(url);
//   //   const data = await result.json();
//   //   setDrinksInProgress(data.drinks);
//   // };

//   // const reqApiProgressFoods = async (id) => {
//   //   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
//   //   const result = await fetch(url);
//   //   const data = await result.json();
//   //   setFoodsInProgress(data.meals);
//   // };

//   //  const setFetch = (apiReq) => {
//   //   if (Object.keys(apiReq).includes('drinks')) {
//   //     setDrink(apiReq.drinks);
//   //   } else if (Object.keys(apiReq).includes('meals')) {
//   //     setFood(apiReq.meals);
//   //   }
//   // };

//   // const sendInputSearch = (e) => {
//   //   setInputSearch(e);
//   // };

//   return (
//     <contexto.Provider value={{
//       buttons,
//       listApi,
//       type,
//       searchArea,
//       filterCat,
//       btnFoodFixedList,
//       btnDrinkFixedList,
//       mealFixedList,
//       drinkFixedList,
//       foodId,
//       drinkId,
//       objItem,
//       // setInListApi,
//       // alterType,
//       // setSearchBar,
//       // reqApiCategory,
//       // clearFilterCat,
//       // setSearchItem,
//       // initialRequest,
//       // reqApiFId,
//       // reqApiDId,
//       // sendObjItem,
//       }}
//       >
//       {children}
//     </contexto.Provider>
//   );
// }

// RecProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
