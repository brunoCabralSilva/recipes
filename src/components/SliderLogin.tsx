import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import '../App.css';

export default function SliderLogin() {
 
  return(
    <Swiper 
      modules={[Autoplay]}
      loop={true}
      autoplay={{delay: 5000 }}
      className=""
    >
      <SwiperSlide className="h-screen w-full sm:w-1/2 ">
        <img src={require("../images/8.jpg")} alt="" className="h-screen w-full object-cover " />
      </SwiperSlide>
      <SwiperSlide className="h-screen w-1/2">
        <img src={require("../images/drink.jpg")} alt="" className="h-screen w-full object-cover " />
      </SwiperSlide>
      <SwiperSlide className="h-screen w-1/2">
        <img src={require("../images/food2.jpg")} alt="" className="h-screen w-full object-cover" />
    </SwiperSlide>          
      <SwiperSlide className="h-screen w-1/2">
        <img src={require("../images/drink2.jpg")} alt="" className="h-screen w-full object-cover" />
    </SwiperSlide>          
    </Swiper>
  );
}