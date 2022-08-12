import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SliderMenu from './SliderMenu';
import SliderContent from '../components/SliderContent';
import SliderHeader from '../components/SliderHeader';
import SearchBar from '../components/SearchBar';
import contexto from '../context';
import { motion } from 'framer-motion';

export default function ListItems(props) {
  const imageFoods = [
    {
      image: 'pizza.jpg',
      text1: 'Make delicious food',
      text2:'without difficulty.'
    },
    {
      image: 'imgfood.jpg',
      text1: 'Here you will find the beauty ',
      text2:'in the art of Cook.'
    },
    {
      image: 'foodwallpaper.jpg',
      text1: 'Discover the',
      text2:'pleasure of cooking!'
    },
    {
      image: 'taco.webp',
      text1: 'Find recipes',
      text2:'easily and be happy!'
    },
  ];
  const imageDrinks = [
    {
      image: 'pizza.jpg',
      text1: 'Make delicious food',
      text2:'without difficulty.'
    },
    {
      image: 'imgfood.jpg',
      text1: "It's time to find the beauty ",
      text2:'in the art of Cook.'
    },
    {
      image: 'foodwallpaper.jpg',
      text1: 'Discover with us the',
      text2:'pleasure of cooking!'
    },
    {
      image: 'taco.webp',
      text1: 'Find recipes',
      text2:'easily and be happy!'
    },
  ];
  const cont = useContext(contexto);
  const { context } = cont;
  const {
    type,
    searchArea,
    initialRequest,
    btnFoodFixedList,
    drinkFixedList,
  } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (btnFoodFixedList.length === 0 && drinkFixedList.length === 0) {
    initialRequest();
    }
  }, []);

  return (
    <div
    initial={{ opacity: 0.5 }}
    animate={{ opacity: 1 }}
    transition={{
      delay: 0.5,
      duration: 1,
    }}
    exit={{ opacity: 0.5, transition: { duration: 0.3 } }}
    className="flex flex-col">
      <div className="flex flex-col">
      <Header searchIcon="visible" title={type === 'foods' ? 'Foods' : 'Drinks' } />
      </div>
      <div className="relative flex items-start justify-end">
        {type === 'drinks'
          ? <SliderHeader list={imageDrinks} />
          : <SliderHeader list={imageFoods} />
      }
      {searchArea && <SearchBar />}
      </div>
      <section>
        <div className="flex flex-row justify-center my-2">
          <SliderMenu />
        </div>
        <p className="mt-5 sm:mt-16 mb-0 sm:mb-5 p-4 sm:p-0 text-4xl w-full text-center mx-auto" id="text">Welcome! The best recipes for your day are here!</p>
        <div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.7,
          duration: 1,
        }}
        exit={{ y: -20, opacity: 0, transition: { duration: 0.3 } }}
      >
        <SliderContent />
        </div>
     </section>
    </div>
  );
}

ListItems.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  type: PropTypes.string.isRequired,
};
