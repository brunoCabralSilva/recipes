import React, { useState, useContext, useEffect } from 'react';
import contexto from '../context';
import fetchs from '../fetchs';
const { fetchFoods, fetchDrinks } = fetchs;

export default function Recomended() {
  const cont = useContext(contexto);
  const [list, setList] = useState('');
  const { context } = cont;
  const { type } = context;

  useEffect(() => {
    const fetchFunction = async () => {
      const foodsList = await fetchFoods();
      const drinksList = await fetchDrinks();
      if (type === 'foods') {
        setList(drinksList.drinks);
      } else {
        setList(foodsList.meals);
      }
    }
    fetchFunction();
  }, []);

  const returnList = (str, img) => {
      const listItems = list.slice(6, +'12').map((item) => {
        let str = "";
        let img = "";
        if (type === "drinks") {
          str = item.strMeal;
          img = item.strMealThumb;
        } else {
          str = item.strDrink;
          img = item.strDrinkThumb;
        }
        return (
        <div className="relative flex m-1 h-30vh">
          <div className="absolute bg-gradient-to-t from-transp to-min-transp w-full h-full
          z-20" />
          <p
            data-testid="recomendation-title"
            className="absolute flex h-full top-0 w-full p-3 text-white font-bold text-xl z-30"
          >
            {str}
          </p>
          <img src={ img } alt="" className="object-cover w-full" />
        </div >
        )});
      return listItems;
  }

  return (
    <div
      className="w-11/12 grid grid-cols-3 grid-rows-3"
    > 
      { list.length > 0 && returnList() }
    </div>
    );
}