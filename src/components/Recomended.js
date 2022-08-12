import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import contexto from '../context';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import fetchs from '../fetchs';
const { fetchFoods, fetchDrinks } = fetchs;

export default function Recomended() {
  const [direcao, setDirecao] = useState(0);
  const cont = useContext(contexto);
  const [item, setItem] = useState('');
  const { context } = cont;
  const { type } = context;

  useEffect(() => {
    const fetchFunction = async () => {
      const foodsList = await fetchFoods();
      const drinksList = await fetchDrinks();
      let list = [];
      if (type === 'foods') {
        list = drinksList.drinks;
      } else {
        list = foodsList.meals;
      }
      if (list.length > 0) {
      const lista = list.slice(0, +'6').map((item, index) => (
        <div
          data-testid={ `${index}-recomendation-card` }
          key={ index }
          className={ `w-full m-3 ${validateItemScroll(index)}` }
        >
          {
            retornaItems(index, item)
          }
        </div>
      ));
      setItem(lista);
      }
    }
    fetchFunction();
  }, []);

  const retornaItems = (index, item) => {
    if (type === 'drinks') {
      return (
        <div className="relative flex">
          {console.log('pei')}
          <div className="absolute bg-gradient-to-t from-transp to-min-transp w-full h-full
          z-20" />
          <p
            data-testid={ `${index}-recomendation-title` }
            className="absolute flex h-full top-0 w-full p-3 text-white font-bold text-xl z-30"
          >
            {item.strMeal}
          </p>
          <img src={ item.strMealThumb } alt="" className="h-full w-full object-cover" />
        </div>
      );
    } return (
      <div className="relative flex">
          <div className="absolute bg-gradient-to-t from-min-transp to-transp w-full h-full
          z-20" />
          <p
            data-testid={ `${index}-recomendation-title` }
            className="absolute flex h-full w-full p-3 text-white top-0 font-bold text-xl z-30"
          >
            {item.strDrink}
          </p>
        <img src={ item.strDrinkThumb } alt="" className="h-full w-full object-cover" />
        </div>
    );
  };

  const handleClickRight = () => {
    if (direcao > +'0') {
      setDirecao(((prevState) => prevState + +'-2'));
    }
  };

  const validateItemScroll = (index) => {
    if (index >= direcao && index < direcao + 2) {
      return 'visible';
    } return 'hidden';
  };

  const handleClickLeft = () => {
    if (direcao < +'4') {
      setDirecao(((prevState) => prevState + +'+2'));
    }
  };

  return (
    <section className="">
      <h2 className="text-2xl font-bold pb-4 pt-5 px-4">Recomended</h2>
      <div className="flex flex-row items-center">
          <button
            type="button"
            className="absolute h-40 ml-5 z-40"
            onClick={ handleClickRight }
          >
            <IoIosArrowBack className="text-6xl text-white" />
          </button>
        <div className="flex flex-row">
          {item}
        </div>
        <button
          type="button"
          className="absolute right-0 mr-3 z-40"
          onClick={ handleClickLeft }
        >
          <IoIosArrowForward className="text-6xl text-white" />
        </button>
      </div>
    </section>);
}