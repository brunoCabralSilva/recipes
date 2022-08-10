import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SliderMenu from '../components/SliderMenu';
import SliderContent from '../components/SliderContent';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import contexto from '../context/index';

export default function DrinksFoods(props) {
  const {
    type,
    btn,
    filterCategory,
    item,
    in12,
    setFilter,
    changeToogle,
  } = props;

  const cont = useContext(contexto);
  const { context } = cont;
  const { searchArea } = context;

  return (
    <div className="flex flex-col">
      <Header searchIcon="visible" title={type === 'food' ? 'Foods' : 'Drinks' } />
      <section>
        <div className="flex flex-row justify-center my-2">
          <SliderMenu setFil={setFilter} btn={btn} change={changeToogle} type={type} />
        </div>
        {searchArea && <SearchBar title={ type } />}
        <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.7,
          duration: 1,
        }}
        exit={{ y: -20, opacity: 0, transition: { duration: 0.3 } }}
      >
          <SliderContent
            filterCategory={ filterCategory }
            food={ item }
            foodsIn12={ in12 }
            type={ type }
          />
        </motion.div>
      </section>
    </div>
  );
}

DrinksFoods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
