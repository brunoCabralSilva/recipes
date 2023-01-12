import { useEffect, useContext } from "react";
import { motion } from 'framer-motion';
import contextRecipes from '../contextRecipes/context';
import Header from '../components/Header';
import SliderHeader from '../components/SliderHeader';
import SliderMenu from "../components/SliderMenu";
import SliderContent from "../components/SliderContent";
import imageFoods from '../data/foods.json';
import imageDrinks from '../data/drinks.json';

export default function Recipes() {
  const context = useContext(contextRecipes);

  const {
    type,
    setType,
    initialRequest,
    buttonsNavigation,
  } = context;

  useEffect(() => {
    if (type === null) {
      setType('foods');
    }
    window.scrollTo(0, 0);
    if (buttonsNavigation.length === 0) {
      initialRequest();
    }
  }, []);

  return (
    <motion.div
    className="flex flex-col justify-start">
      <Header
        icon={false}
        searchIcon="visible"
        title={type === 'foods' ? 'Foods' : 'Drinks' }
      />
      {
        type === 'foods'
          ? <SliderHeader list={ imageDrinks } />
          : <SliderHeader list={ imageFoods } />
      }
      <section>
        <div className="flex flex-row justify-center my-2">
          <SliderMenu />
        </div>
        <p className="mt-5 sm:mt-16 mb-0 sm:mb-5 p-4 sm:p-0 text-4xl w-full text-center mx-auto" id="text">
          Welcome! The best recipes for your day are here!
        </p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.7,
            duration: 1,
          }}
          exit={{ y: -20, opacity: 0, transition: { duration: 0.3 } }}
        >
        <SliderContent />
        </motion.div>
     </section>
    </motion.div>
  );
}