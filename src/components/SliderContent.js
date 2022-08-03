import React from 'react';
import { Link } from 'react-router-dom';

export default function SliderContent({ filterCategory, food, foodsIn12, handleCategoryFilter, type }) {
  const tagsItem = (item) => {
    if (item.strTags) {
      const splitItem =  item.strTags.split(',');
      const filterItem = splitItem.filter((item, index) => index < 2);
      const mapItem = filterItem.map((item, index) => {
        if(index === filterItem.length -1) {
          return (<p key={index}>{item}</p>);
        } return (<p className="pt-1" key={index}>{item}{', '}</p>);
      });
      return mapItem;
    }
  }
  const returnItem = () => {
    if (type === "food") {
      let data = '';
      if (food.length) {
        data = food;
      } else {
         data = foodsIn12;
      }
      return data.slice(0, +'12')
      .map((item, index) => (
        <Link
        to={ `/foods/${item.idMeal}` }
        key={ index }
          data-testid={ `${index}-recipe-card` }
          className="rounded-xl m-3 w-11/12 sm:w-43% md:w-30% xl:w-23% hover:border hover:border-1 hover:border-black transition duration-1000"
        >
        {console.log(item)}
          <div className="w-full relative flex h-28 shadow-xl">
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt=""
              className="rounded-l-xl object-cover h-full w-1/2"
            />
            <div className="p-2">
              <p data-testid={ `${index}-card-name` } className="flex items-end z-30 font-bold leading-4 text-xl">{item.strMeal}</p>
              <p clasName="text-sm"><em>{item.strArea}</em></p>
              {tagsItem(item)}
            </div>
          </div>
        </Link>
        ))}
    
        else {
          let valor = '';
      if (food.length) {
        valor = food;
      } else {
         valor = foodsIn12;
      }
      return valor.slice(0, +'12')
      .map((item, index) => (
        <Link
          to={ `/drinks/${item.idDrink}` }
          key={ index }
          data-testid={ `${index}-recipe-card` }
          className="snap-center m-3 w-11/12 sm:w-43% md:w-30% xl:w-22.5% hover:border hover:border-1 hover:border-black"
        >
          <div className="relative flex h-80">
            <div className="absolute bg-gradient-to-t from-min-transp to-transp w-full h-full z-20" />
            <img
              data-testid={ `${index}-card-img` }
              src={ item.strDrinkThumb }
              alt=""
              className="object-cover h-full w-full absolute"
            />
            <p data-testid={ `${index}-card-name` } className="flex items-end z-30 text-white p-2 font-bold text-xl">{item.strDrink}</p>
          </div>
        </Link>
        ))}
  }

  return(
    <div className="flex flex-col flex-wrap justify-center">
      <h1 className="text-3xl font-bold pb-4 pt-5 px-4 w-full text-center">Results:</h1>
      <div className="flex flex-row flex-wrap justify-center w-full">
        {filterCategory.length
          ? handleCategoryFilter(filterCategory)
          : returnItem()
        }
      </div>
    </div>
  );
}