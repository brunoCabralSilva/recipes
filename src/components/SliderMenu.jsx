import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import contexto from '../context';
import 'swiper/css';
import 'swiper/css/navigation';

export default function SliderMenu() {
  const cont = useContext(contexto);
  const { context } = cont;
  const { type, buttons, reqApiCategory, clearFilterCat, btnFoodFixedList, btnDrinkFixedList } = context;
  let btnList = [];
  let btn = [];
  
  if (type === 'foods') {
    btnList = btnFoodFixedList;
  } else btnList = btnDrinkFixedList;

  if(buttons.length > 0) {
    btn = buttons
  } else {
    btn = btnList;
  }

  return(
    <Swiper
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          spaceBetween: 2
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          spaceBetween: 3
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 4,
          spaceBetween: 4,
        }}}
      loop={true}
      className="w-full sm:w-11/12 mt-10"
    >
      <SwiperSlide
        data-testid="All-category-filter"
        onClick={ () => clearFilterCat() }
        className="border border-dark-brown bg-white transition duration-500 hover:text-dark-brown text-dark-brown mx-1 flex items-center justify-center rounded text-sm p-2 cursor-pointer flex">
          <img
                src={require('../images/all.jpg')}
                alt=""
                className="rounded-full w-14 h-14 object-cover"
              />
          <span className="w-full font-bold sm:text-base text-center">
            All
          </span>
      </SwiperSlide>
      {
        btn.length > 0 && btn.slice(0, +'5').map((button, index) => (
          <SwiperSlide
            key={ index }
            type="button"
            data-testid={ `${button.strCategory}-category-filter` }
            onClick={ () => reqApiCategory(button.strCategory) }
            className="border border-dark-brown bg-white transition duration-500 hover:text-dark-brown text-dark-brown mx-1 flex items-center justify-center rounded text-sm p-2 cursor-pointer flex">
              <img
                src={require(`../images/${button.strCategory === "Other/Unknown" ? "Other-Unknown" : button.strCategory }.jpg`)}
                alt=""
                className="rounded-full w-14 h-14"
              />
              <span className="w-full font-bold sm:text-base text-center">
              {button.strCategory === "Other/Unknown" ? "Other" : button.strCategory }
            </span>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}