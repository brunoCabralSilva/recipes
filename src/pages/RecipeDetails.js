import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import TwelveItems from '../components/TwelveItems';
import Recomended from '../components/Recomended';
import StartRecipe from '../components/StartRecipe';
import { motion } from 'framer-motion';
import contexto from '../context';

export default function RecipeDetails(props) {
  const cont = useContext(contexto);
  const [identificador, setIdentificador] = useState('');
  const { context } = cont;
  const { reqApiFoodsID, foodId, reqApiDrinks, drinksIn12 } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <motion.div
    initial={{ y: 20, opacity: 0.5 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      delay: 0.5,
      duration: 1,
    }}
    exit={{ y: -20, opacity: 0.5, transition: { duration: 0.3 } }}
    >
      <TwelveItems foodId={ foodId } type="food" />
      <Recomended in12={ drinksIn12 } type="drink" />
      <StartRecipe type="food" id={ identificador } />
    </motion.div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
