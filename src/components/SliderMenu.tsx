import { useContext } from 'react';
import contextRecipes from '../contextRecipes/context';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export default function SliderMenu() {
  const context = useContext(contextRecipes);
  const {
    typeOfList,
    favAndSharedInItem,
    buttonsNavigation,
    listAllFoods,
    listAllDrinks,
    reqApiCategory,
    setListOfItemsFromCat,
    setFixedList,
    category,
    setCategory,
  } = context;
  
  let btn = [];

  if(favAndSharedInItem.length > 0) {
    btn = favAndSharedInItem
  } else {
    btn = buttonsNavigation;
  }

  return(
    <div className="flex items-center justify-center w-full h-full">
      <Swiper
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 4,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 4
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 4,
            spaceBetween: 4,
          }}}
        loop={true}
        modules={[Navigation, Pagination]}
          pagination={{clickable: true}}
        className="sm:w-11/12 mt-10 pb-10"
      >
        <SwiperSlide
          data-testid="All-category-filter"
          onClick={ () => {
            setCategory('All');
            setListOfItemsFromCat([]);
            if (typeOfList === 'foods') {
              listAllFoods();
            } else {
              listAllDrinks();
            }
          }}
          className="flex flex-col">
            <div className={`bg-white mx-1 flex items-center justify-center rounded text-sm p-2 cursor-pointer border hover:border-black transition-colors duration-500 w-full ${category === 'All' ? 'bg-gradient-to-r from-orange-300 to-red-300 text-black border-2 border-white': 'bg-white'}`}> 
              <img
                src={require('../images/wallpapers/all.jpg')}
                alt=""
                className="rounded-full w-14 h-14 object-cover"
              />
              <span className="w-full font-bold sm:text-base text-center">
                All
              </span>
            </div>
            <div className="pb-14" />
        </SwiperSlide>
        {
          btn.length > 0 && btn.slice(0, +'5')
            .filter((bt: any) => bt.strCategory !== 'Goat')
            .map((button: any, index: number) => (
            <SwiperSlide
              key={ index }
              data-testid={ `${button.strCategory}-category-filter` }
              onClick={ () => {
                setCategory(button.strCategory);
                setListOfItemsFromCat([]);
                setFixedList([]);
                reqApiCategory(button.strCategory);
              }}
              className="flex flex-col">
                <div className={`bg-white mx-1 flex items-center justify-center rounded text-sm p-2 cursor-pointer border hover:border-black transition-colors duration-500 w-full ${category === button.strCategory ? 'bg-gradient-to-r from-orange-300 to-red-300 text-black border-2 border-white': 'bg-white'}`}>
                  <img
                    src={require(`../images/wallpapers/${button.strCategory === "Other / Unknown" ? "Other-Unknown" : button.strCategory }.jpg`)}
                    alt=""
                    className="rounded-full w-14 h-14"
                  />
                  <span className="w-full font-bold sm:text-base text-center">
                    {button.strCategory === "Other / Unknown" ? "Other" : button.strCategory }
                  </span>
                </div>
                <div className="pb-14" />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}