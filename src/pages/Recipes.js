import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SwiperSlide } from 'swiper/react';
import Header from '../components/Header';
import SliderMenu from '../components/SliderMenu';
import Footer from '../components/Footer';
import contexto from '../context';

export default function Recipes(props) {
  const { history } = props;
  const [currentCategory, setCurrentCategory] = useState('');
  const cont = useContext(contexto);
  const { context } = cont;

  const {
    food,
    reqApiFoods,
    foodsIn12,
    btnFoods,
    reqApiBtnFoods,
    filterCategory,
    reqApiCategory,
    setFilterCategory,
    resetFilters,
  } = context;

  useEffect(() => {
    reqApiFoods();
  }, []);

  useEffect(() => {
    reqApiBtnFoods();
  }, []);

  const handleCategoryFilter = (category) => category
    .slice(0, +'12').map((item, index) => (
      <Link
        to={ `/foods/${item.idMeal}` }
        key={ item.idMeal }
        data-testid={ `${index}-recipe-card` }
      >
        <div>
          <p data-testid={ `${index}-card-name` }>{ item.strMeal }</p>
          <img
            src={ item.strMealThumb }
            alt=""
            className="imageItem"
            data-testid={ `${index}-card-img` }
          />
        </div>
      </Link>
    ));

  const changeToogle = (category) => {
    if (currentCategory !== category) {
      setCurrentCategory(category);
      return reqApiCategory(category);
    }
    setCurrentCategory('');
    resetFilters();
  };

  const setFilter = () => {
    setFilterCategory([]);
  }

  return (
    <div className="flex flex-col">
      <Header searchIcon="visible" title="Foods" className="" />
      <section>
        <div className="flex flex-row justify-center">
          <SliderMenu setFil={setFilter} btnFoods={btnFoods} change={changeToogle} />
        </div>
        {filterCategory.length
          ? handleCategoryFilter(filterCategory)
          : (food.length ? food : foodsIn12)
            .slice(0, +'12')
            .map((item, index) => (
              <Link
                to={ `/foods/${item.idMeal}` }
                key={ index }
                data-testid={ `${index}-recipe-card` }
                className=""
              >
                <SwiperSlide>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ item.strMealThumb }
                    alt=""
                    className="object-cover mt-4 h-96"
                  />
                  <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
                </SwiperSlide>
              </Link>
            ))}
        <Footer history={ history } />
      </section>
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
