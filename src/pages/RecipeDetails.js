import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TwelveItems from '../components/TwelveItems';
import Recomended from '../components/Recomended';
import StartRecipe from '../components/StartRecipe';
import contexto from '../context';

export default function RecipeDetails(props) {
  const cont = useContext(contexto);
  const [identificador, setIdentificador] = useState('');
  const { context } = cont;
  const { reqApiFoodsID, foodId, reqApiDrinks, drinksIn12 } = context;

  useEffect(() => {
    reqApiDrinks();
  }, []);

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;
    setIdentificador(id);
    reqApiFoodsID(id);
  }, []);

  return (
    <div>
      <TwelveItems foodId={ foodId } type="food" />
      <Recomended in12={ drinksIn12 } type="drink" />
      <StartRecipe type="food" id={ identificador } />
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
