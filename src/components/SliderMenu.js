import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

export default function SliderMenu({setFil, btnFoods, change}) {
  const valor = window.innerWidth;
  console.log(valor);
  let slides = 0;
  if( valor < 768) { 
    slides = 4;
  }
  else { 
    slides=3; 
  }
  const settings = {
    navigation: true,
    slidesPerView: slides,
    loop: true,
  }

  return(
    <Swiper {...settings} modules={[Navigation]} className="h-36">
        <SwiperSlide
          data-testid="All-category-filter"
          onClick={ () => setFil() }
          className="bg-madeira m-2 relative flex h-36"
        >
          <img src={require("../images/all.jpg")} alt="all foods" className="w-128 h-full object-cover" />
          <div className="absolute bg-gradient-to-t from-black to-transp w-full h-full" />
          <span className="w-full h-full flex items-end font-bold text-xl text-left pl-3 pb-4 absolute text-white">All</span>
        </SwiperSlide>
        {btnFoods.slice(0, +'5').map((button, index) => (
          <SwiperSlide
            key={ index }
            type="button"
            data-testid={ `${button.strCategory}-category-filter` }
            onClick={ () => change(button.strCategory) }
            className="bg-madeira m-2 relative flex h-36"
          >
            <img src={require(`../images/${button.strCategory}.jpg`)} alt="all foods" className="w-128 h-full object-cover" />
            <div className="absolute bg-gradient-to-t from-black to-transp w-full h-full" />
            <span className="w-full h-full flex items-end font-bold text-xl text-left pl-3 pb-4 absolute text-white">{button.strCategory}</span>
          </SwiperSlide>
        ))}
      </Swiper>
  );
}