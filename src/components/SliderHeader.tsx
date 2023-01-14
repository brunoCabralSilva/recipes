import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import 'swiper/css';
import 'swiper/css/pagination';

interface objectDataType {
  image: string,
  text1: string,
  text2: string,
}

interface SliderHeaderProps {
  list: objectDataType[],
}

export default function SliderHeader(props: SliderHeaderProps) {
  const { list } = props;
  return(
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{clickable: true}}
        loop={true}
        slidesPerView={1}
        autoplay={{delay: 5000 }}
        className="w-full h-80vh"
      >
        {
          list.map((image, index) => (
            <SwiperSlide
              key={ index }
              className="w-full h-full flex items-end relative">
              <p className="w-2/3 sm:w-full absolute z-40 text-white text-5xl sm:text-6xl font-bold p-3 sm:p-7 sm:mb-5 mb-12 flex flex-col">
                <span>{ image.text1 }</span>
                <span>{ image.text2 }</span>
              </p>
              <div  className="absolute bg-min-transp h-full w-full z-30" />
              <img
                src={require(`../images/wallpapers/${image.image}`)}
                alt=""
                className="relative w-full h-full object-cover"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
  );
}