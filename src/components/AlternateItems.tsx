import React, { useContext } from 'react';
import contextoRecipes from '../contextRecipes/context';

interface AlternativeItemsType {
  setShowMenu: (newState: boolean) => void;
  showMenu: boolean
}

export default function AlternateItems(props: AlternativeItemsType) {
  const context = useContext(contextoRecipes);
  const { setShowMenu, showMenu } = props;
  const {
    setTypeOfList,
    setListOfItemsFromCat,
    listAllDrinks,
    listAllFoods,
    reqApiCategory,
  } = context;

  const drinkRedirect = () => {
    listAllDrinks();
    setListOfItemsFromCat([]);
    setTypeOfList('drinks');
    reqApiCategory('Ordinary Drink');
    setShowMenu(!showMenu);
  };

  const foodRedirect = () => {
    listAllFoods();
    setListOfItemsFromCat([]);
    setTypeOfList('foods');
    setShowMenu(!showMenu);
  };


  return (
    <footer className="flex flex-row items-end w-full justify-center pb-10">
      <button
        type="button"
        aria-label="drinks"
        className="mx-2 sm:mx-4 bg-white rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center border border-black"
        data-testid="drinks-bottom-btn"
        onClick={ drinkRedirect }
      >
        <img src={ require('../images/icons/drinkIcon.jpg') } alt="dreakIcon" className="w-full h-full rounded-full border-2 border-white sm:w-22" />
      </button>
      <button
        type="button"
        aria-label="foods"
        className="mx-2 sm:mx-4 bg-white rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center"
        data-testid="food-bottom-btn"
        onClick={ foodRedirect }
      >
        <img
          src={ require('../images/icons/mealllicon.jpg')}
          alt="mealIcon"
          className="w-full h-full rounded-full border border-white sm:w-22"
        />
      </button>
    </footer>
  );
}
