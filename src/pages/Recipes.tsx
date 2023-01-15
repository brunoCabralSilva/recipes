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
      <Header toggleRecipe={true} />
      <section>
        <div className="flex flex-row justify-center my-2">
          <SliderMenu />
        </div>
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