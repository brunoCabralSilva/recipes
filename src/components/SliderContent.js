import React, { useContext, useEffect } from 'react';
import Item from './Item';
import contexto from '../context';

export default function SliderContent() {
  const cont = useContext(contexto);
  const { context } = cont;
  const { listApi, type, filterCat, setInListApi, mealFixedList, drinkFixedList } = context;

  useEffect(() => {
      setInListApi(mealFixedList);
  }, []);

  const handleCategoryFilter = (list) => {
    if(type==="foods") {
      const cat = list.slice(0, +'18').map((item, index) => (
        <Item
          link={item.idMeal}
          index={index}
          image={item.strMealThumb}
          text={item.strArea}
          name={item.strMeal}
          tags={item.strTags}
        />
        ));
      return cat;
    } else {
        const cat = list.slice(0, +'18').map((item, index) => (
          <Item
          link={item.idDrink}
          index={index}
          image={item.strDrinkThumb}
          text={item.strDrink}
          name={item.strDrink}
          item={item}
          />
        ));
      return cat;
    }
  }

  return(
    <div className="flex flex-col flex-wrap justify-center">
      <div className="flex flex-row flex-wrap justify-center w-full">
        { filterCat.length > 0
          ? handleCategoryFilter(filterCat)
          : type === 'foods' ? handleCategoryFilter(mealFixedList) : handleCategoryFilter(drinkFixedList)
          }
      </div>
    </div>
  );
}