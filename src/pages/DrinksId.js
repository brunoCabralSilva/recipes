import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import contexto from '../context';
import { motion } from 'framer-motion';
import Recomended from '../components/Recomended';
import TwelveItems from '../components/TwelveItems';
import StartRecipe from '../components/StartRecipe';

export default function DrinksId(props) {
  const cont = useContext(contexto);
  const [identificador, setIdentificador] = useState('');
  const { context } = cont;
  const { reqApiDrinksID, drinkId, reqApiFoods, foodsIn12 } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <motion.div
    initial={{ y: 20, opacity: 0.5 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      delay: 0.5,
      duration: 1,
    }}
    exit={{ y: -20, opacity: 0.5, transition: { duration: 0.3 } }}
    >
      <TwelveItems drinkId={ drinkId } type="drink" />
      <Recomended in12={ foodsIn12 } type="food" />
      <StartRecipe type="drink" id={ identificador } />
    </motion.div>
  );
}

DrinksId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
