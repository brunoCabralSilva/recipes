import { useState, useContext } from 'react';
import contextRecipes from '../contextRecipes/context';
import { Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

interface objectDataType {
  image: string,
  text1: string,
  text2: string,
};

interface SliderHeaderProps {
  list: objectDataType[],
  toggleRecipe: boolean,
};

export default function SliderHeader(props: SliderHeaderProps) {
  const [buttonFood, setButtonFood] = useState(false);
  const [buttonDrink, setButtonDrink] = useState(false);
  const {
    setTypeOfList,
    setListOfItemsFromCat,
    listAllDrinks,
    listAllFoods,
    reqApiCategory,
  } = useContext(contextRecipes);

  const { list, toggleRecipe } = props;

  const drinkRedirect = () => {
    listAllDrinks();
    setListOfItemsFromCat([]);
    setTypeOfList('drinks');
    reqApiCategory('Ordinary Drink');
  };

  const foodRedirect = () => {
    listAllFoods();
    setListOfItemsFromCat([]);
    setTypeOfList('foods');
  };

  return(
    <div className="w-full h-80vh relative">
      {
        toggleRecipe && 
        <div className="absolute z-40 right-0 flex flex-col h-full items-end p-4">
          <button
            type="button"
            className="rounded-full bg-black/80 flex items-center justify-between mb-4 w-20 hover:w-60 transition-all duration-500"
            onMouseOver={() => setButtonFood(true)}
            onMouseOut={() => setButtonFood(false)}
            onClick={ foodRedirect }
          >
            <img
              src={require('../images/icons/food-white.png')}
              alt="foods"
              className="h-20"
            />
            <span className={`duration-1000 transition-all justify-center text-white text-2xl ${buttonFood ? 'flex opacity-100 w-full' : 'w-0 hidden opacity-0'}`}>
              Find Foods
            </span>
          </button>
          <button
            type="button"
            onClick={ drinkRedirect }
            className="rounded-full bg-black/80 flex items-center justify-between mb-4 w-20 hover:w-60 transition-all duration-500"
            onMouseOver={() => setButtonDrink(true)}
            onMouseOut={() => setButtonDrink(false)}
          >
            <img
              src={require('../images/icons/drink-white.png')}
              alt="drinks"
              className="h-20 rounded-full"
            />
            <span className={`duration-1000 transition-all w-full flex justify-center text-white text-2xl ${buttonDrink ? 'flex opacity-100 w-full' : 'w-0 hidden opacity-0'}`}>
              Find Drinks
            </span>
          </button>
        </div>
      }
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{clickable: true}}
        loop={true}
        slidesPerView={1}
        autoplay={{delay: 5000 }}
        className="w-full h-80vh relative"
      >
        
        {
          list.map((image, index) => (
            <SwiperSlide
              key={ index }
              className="w-full h-full flex items-end relative">
              <p className="w-2/3 sm:w-full absolute z-30 text-white text-5xl sm:text-6xl font-bold p-3 sm:p-7 sm:mb-5 mb-12 flex flex-col">
                <span>{ image.text1 }</span>
                <span>{ image.text2 }</span>
              </p>
              <div  className="absolute bg-min-transp h-full w-full z-20" />
              <img
                src={require(`../images/wallpapers/${image.image}`)}
                alt=""
                className="relative w-full h-full object-cover"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}