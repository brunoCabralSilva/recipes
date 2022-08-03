import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

export default function SliderMenu({setFil, btn, change, type}) {
  
  let slides = 0;
  setInterval(() => {
    const valor = window.innerWidth;
    if( valor < 768) { 
      slides = 4;
    } else { 
      slides = 3; 
    }
  }, 1000);
  
  const settings = {
    navigation: true,
    slidesPerView: 2,
    loop: true,
  }

  return(
    <Swiper {...settings} modules={[Navigation]} className="h-16">
        <SwiperSlide
        data-testid="All-category-filter"
        onClick={ () => setFil() }
        className="bg-madeira m-2 relative flex h-16"
      >
        <img src={require("../images/all.jpg")} alt="all foods" className="w-full h-full object-cover" />
        <div className="absolute bg-gradient-to-t from-black to-transp w-full h-full" />
        <span className="w-full h-full flex items-end font-bold text-xl text-left pl-3 pb-4 absolute text-white">
          All
        </span>
      </SwiperSlide>
      {
        btn.slice(0, +'5').map((button, index) => (
          <SwiperSlide
            key={ index }
            type="button"
              data-testid={ `${button.strCategory}-category-filter` }
              onClick={ () => change(button.strCategory) }
              className="bg-madeira m-2 relative flex h-16"
              >
              <img src={require(`../images/${
                button.strCategory === "Other/Unknown"
                ? "Other-Unknown"
              : button.strCategory
              }.jpg`)} alt="all foods" className="w-full h-full object-cover" />
              <div className="absolute bg-gradient-to-t from-black to-transp w-full h-full" />
              <span className="w-full h-full flex items-end font-bold sm:text-xl text-left pl-3 pb-4 absolute text-white">
                {button.strCategory === "Other/Unknown" ? "Other" : button.strCategory }
              </span>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}