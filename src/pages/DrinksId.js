import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import contexto from '../context';
import Recomended from '../components/Recomended';
import TwelveItems from '../components/TwelveItems';
import StartRecipe from '../components/StartRecipe';

export default function DrinksId(props) {
  const cont = useContext(contexto);
  const [identificador, setIdentificador] = useState('');
  const { context } = cont;
  const { reqApiDrinksID, drinkId, reqApiFoods, foodsIn12 } = context;

  useEffect(() => {
    reqApiFoods();
  }, []);

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;
    setIdentificador(id);
    reqApiDrinksID(id);
  }, []);
  return (
    <div>
      <TwelveItems drinkId={ drinkId } type="drink" />
      <Recomended in12={ foodsIn12 } type="food" />
      <StartRecipe type="drink" id={ identificador } />
    </div>
  );
}

DrinksId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
