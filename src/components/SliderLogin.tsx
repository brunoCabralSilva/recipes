import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import '../App.css';

export default function SliderLogin() {
  return(
    <Swiper
      loop={true}
      autoplay={ {delay: 1000} }
      slidesPerView={1}
      navigation={true}
      modules={[Pagination, Autoplay]}
      pagination={ {clickable: true} }
    >
      <SwiperSlide className="h-screen w-full sm:w-1/2 ">
        <img src={require("../images/wallpapers/8.jpg")} alt="" className="h-screen w-full object-cover " />
      </SwiperSlide>
      <SwiperSlide className="h-screen w-1/2">
        <img src={require("../images/wallpapers/3.jpg")} alt="" className="h-screen w-full object-cover " />
      </SwiperSlide>
      <SwiperSlide className="h-screen w-1/2">
        <img src={require("../images/wallpapers/Ordinary Drink.jpg")} alt="" className="h-screen w-full object-cover" />
      </SwiperSlide>          
      <SwiperSlide className="h-screen w-1/2">
        <img src={require("../images/wallpapers/Cocoa.jpg")} alt="" className="h-screen w-full object-cover" />
      </SwiperSlide>          
    </Swiper>
  );
}
