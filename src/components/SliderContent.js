import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';

export default function SliderContent({ list, in12, filterCategory, handleCategoryFilter }) {
  const settings = {
    navigation: true,
    slidesPerView: 2,
    loop: true,
  }

  return(
    <Swiper {...settings} modules={[Navigation]} className="h-96">
      {filterCategory.length
        ? handleCategoryFilter(filterCategory)
        : (list.length ? list : in12)
        .slice(0, +'12')
        .map((item, index) => (
          <Link
          to={ `/foods/${item.idMeal}` }
          key={ index }
          data-testid={ `${index}-recipe-card` }
          >
            <SwiperSlide>
              <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
              <img
              data-testid={ `${index}-card-img` }
              src={ item.strMealThumb }
              alt=""
              className="object-cover w-full h-full"
              />
            </SwiperSlide>
          </Link>
      ))}
    </Swiper>
  );
}