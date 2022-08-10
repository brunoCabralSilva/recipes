import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SliderMenu from '../components/SliderMenu';
import SliderContent from '../components/SliderContent';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import contexto from '../context';
import { motion } from 'framer-motion';

export default function ListItems(props) {
  const { history } = props;
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
          ? <img src={require('../images/drinkwallpaper.jpg')} alt="" className="relative w-full h-screen object-cover" />
          : <img src={require('../images/pizza.jpg')} alt="" className="relative w-full h-screen object-cover" />
      }
      <div className="right-0 top-0 fixed z-40 w-1/4">{searchArea && <SearchBar />}</div>
      </div>
      <section>
        <div className="flex flex-row justify-center my-2">
          <SliderMenu />
        </div>
        <p className="mt-16 mb-5 text-4xl w-full text-center mx-auto" id="text">Welcome! The best recipes for your day are here!</p>
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
      <Footer history={ history } />
    </div>
  );
}

ListItems.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  type: PropTypes.string.isRequired,
};
