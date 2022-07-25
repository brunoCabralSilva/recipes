import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Recomended(props) {
  const { in12, type } = props;
  const [direcao, setDirecao] = useState(0);

  const retornaItems = (index, item) => {
    if (type === 'food') {
      return (
        <div className="w-43%">
          <p data-testid={ `${index}-recomendation-title` }>{item.strMeal}</p>
          <img src={ item.strMealThumb } alt="" className="imageItem" />
        </div>
      );
    } return (
      <div>
        <p data-testid={ `${index}-recomendation-title` }>{item.strDrink}</p>
        <img src={ item.strDrinkThumb } alt="" className="imageItem" />
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
    <section>
      <h2 className="text-2xl font-bold pb-4 pt-5 px-4">Recomended</h2>
      <div className="flex flex-row items-center">
          <button
            type="button"
            className="absolute h-40 ml-5"
            onClick={ handleClickRight }
          >
            <IoIosArrowBack className="text-6xl" />
          </button>
        <div className="flex flex-row">
          {in12.slice(0, +'6').map((item, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ index }
              className={ `w-full m-3 ${validateItemScroll(index)}` }
            >
              {
                retornaItems(index, item)
              }
            </div>
          ))}
        </div>
        <button
          type="button"
          className="absolute right-0 mr-3"
          onClick={ handleClickLeft }
        >
          <IoIosArrowForward className="text-6xl" />
        </button>
      </div>
    </section>);
}

Recomended.propTypes = {
  in12: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
