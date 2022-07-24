import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Recomended(props) {
  const { in12, type } = props;
  const [direcao, setDirecao] = useState(0);

  const retornaItems = (index, item) => {
    if (type === 'food') {
      return (
        <div>
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
      <h2>Recomended</h2>
      <div className="scroll-item">
        <div className="div-button-right">
          <button
            type="button"
            className="btn-right"
            onClick={ handleClickRight }
          >
            Anterior
          </button>
        </div>
        <div className="scroll-footer">
          {in12.slice(0, +'6').map((item, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ index }
              className={ `item-recomended  ${validateItemScroll(index)}` }
            >
              {
                retornaItems(index, item)
              }
            </div>
          ))}
        </div>
        <div className="div-button-left">
          <button
            type="button"
            className="btn-left"
            onClick={ handleClickLeft }
          >
            Próximo
          </button>
        </div>
      </div>
    </section>);
}

Recomended.propTypes = {
  in12: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
