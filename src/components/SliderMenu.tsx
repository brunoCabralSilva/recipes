import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import contextRecipes from '../contextRecipes/context';
import 'swiper/css';
import 'swiper/css/navigation';

export default function SliderMenu() {
  const context = useContext(contextRecipes);
  const {
    type,
    buttons,
    buttonsNavigation,
    listAllFoods,
    listAllDrinks,
    reqApiCategory,
    setFilterCat,
    setFixedList,
  } = context;
  let btn = [];

  if(buttons.length > 0) {
    btn = buttons
  } else {
    btn = buttonsNavigation;
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
        onClick={ () => {
          setFilterCat([]);
          if (type === 'foods') {
            listAllFoods();
          } else {
            listAllDrinks();
          }
         }}
        className="border border-dark-brown hover:border-black bg-white transition duration-500 hover:text-dark-brown text-dark-brown mx-1 flex items-center justify-center rounded text-sm p-2 cursor-pointer">
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
        btn.length > 0 && btn.slice(0, +'5')
          .filter((bt: any) => bt.strCategory !== 'Goat')
          .map((button: any, index: number) => (
          <SwiperSlide
            key={ index }
            data-testid={ `${button.strCategory}-category-filter` }
            onClick={ () => { 
              setFilterCat([]);
              setFixedList([]);
              reqApiCategory(button.strCategory, type);
            }}
            className="border hover:border-black border-dark-brown bg-white transition duration-500 hover:text-dark-brown text-dark-brown mx-1 flex items-center justify-center rounded text-sm p-2 cursor-pointer">
              <img
                src={require(`../images/${button.strCategory === "Other / Unknown" ? "Other-Unknown" : button.strCategory }.jpg`)}
                alt=""
                className="rounded-full w-14 h-14"
              />
              <span className="w-full font-bold sm:text-base text-center">
              {button.strCategory === "Other / Unknown" ? "Other" : button.strCategory }
            </span>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}