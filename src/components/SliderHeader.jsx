import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';

export default function SliderHeader(props) {
  const { list } = props;
  return(
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      pagination={{clickable: true}}
      loop={true}
      autoplay={{delay: 5000 }}
    >
      {
        list.map((image) => (
          <SwiperSlide className="relative flex items-end">
            <p className="w-2/3 sm:w-full absolute z-40 text-white text-5xl sm:text-6xl font-bold p-3 sm:p-7 sm:mb-5 mb-12">{ image.text1 }<br />{ image.text2 }</p>
            <div  className="absolute bg-min-transp h-full w-full z-30" />
            <img src={require(`../images/${image.image}`)} alt="" className="relative w-full h-80vh object-cover" />
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}