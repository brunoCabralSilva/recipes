import { useEffect, useContext } from "react";
import { motion } from 'framer-motion';
import contextRecipes from '../contextRecipes/context';
import Header from '../components/Header';
import SliderMenu from "../components/SliderMenu";
import SliderContent from "../components/SliderContent";
import Footer from "../components/Footer";

export default function Recipes() {
  const {
    typeOfList,
    setTypeOfList,
    buttonsNavigation,
    initialRequest,
    setNameOfPage,
  } = useContext(contextRecipes);

  useEffect(() => {
    window.scrollTo(0, 0);
    setNameOfPage('Home');
    if (!typeOfList) {
      setTypeOfList('foods');
    }
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
        title={typeOfList === 'foods' ? 'Foods' : 'Drinks' }
      />
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
     <Footer />
    </motion.div>
  );
}