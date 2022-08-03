import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SliderMenu from '../components/SliderMenu';
import SliderContent from '../components/SliderContent';
import { motion } from 'framer-motion';

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


  const handleCategoryFilter = (category) => {
    if(type==="food") {
      const cat = category.slice(0, +'12').map((item, index) => (
        <Link
          to={ `/foods/${item.idMeal}` }
          key={ item.idMeal }
          data-testid={ `${index}-recipe-card` }
          className="snap-center m-3 w-11/12 sm:w-43% md:w-30% xl:w-23% hover:border hover:border-1 hover:border-black"
        >
          <div className="relative flex h-80">
            <div className="absolute bg-gradient-to-t from-min-transp to-transp w-full h-full z-20" />
            <img
              src={ item.strMealThumb }
              alt=""
              data-testid={ `${index}-card-img` }
              className="object-cover h-full w-full absolute"
            />
            <p data-testid={ `${index}-card-name` } className="flex items-end z-30 text-white p-2 font-bold text-xl">{ item.strMeal }</p>
          </div>
        </Link>
      ));
      return cat;
    } else {
        const cat = category.slice(0, +'12').map((item, index) => (
        <Link
          to={ `/drinks/${item.idDrink}` }
          key={ item.idDrink }
          data-testid={ `${index}-recipe-card` }
          className="snap-center m-3 w-11/12 sm:w-43% md:w-30% xl:w-23% hover:border hover:border-1 hover:border-black"
        >
          <div className="relative flex h-80">
            <div className="absolute bg-gradient-to-t from-min-transp to-transp w-full h-full z-20" />
            <img
              src={ item.strDrinkThumb }
              alt=""
              className="object-cover h-full w-full absolute"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` } className="flex items-end z-30 text-white p-2 font-bold text-xl">{ item.strDrink }</p>
          </div>
        </Link>
      ));
      return cat;
    }
  }

  return (
    <div className="flex flex-col bg-light-brown">
      {type === 'food'
      ? <Header searchIcon="visible" title="Foods" />
      : <Header searchIcon="visible" title="Drinks" />
    }
      <section>
        <div className="flex flex-row justify-center">
          <SliderMenu setFil={setFilter} btn={btn} change={changeToogle} type={type} />
        </div>
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
            handleCategoryFilter={ handleCategoryFilter }
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