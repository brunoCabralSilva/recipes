import React, { useEffect, useContext, ReactNode } from 'react';
import contextRecipes from '../contextRecipes/context';
import StartRecipe from '../components/StartRecipe';
import BtnsFavAndCopy from '../components/BtnsFavAndCopy';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

export default function RecipesDetails() {
  const {
    getFavorites,
    createElement,
    objIngrMeas,
    objSelected,
  } = useContext(contextRecipes);

  const { type, id }: { type: string, id: string } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getFavorites();
    createElement(type, id);
  }, []);

  const handleIng = (x: any): ReactNode[] => {
    const object: any = Object.entries(x);
    const ingredients = object.filter((name: string) => name[0].includes('Ingredient') && name[1] && name[1].length > 2);
    const array: any = [];
    for (let i = 0; i < ingredients.length; i += 1) {
      array.push(
        <span>
          { <span>{ ingredients[i] && ingredients[i][1] }</span> }
          { i < ingredients.length - 1 ? ' - ' : ''}
        </span>
      );
    }
    return array;
  };

  return(
    <motion.div
      initial={{ y: 20, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
          delay: 0.5,
          duration: 1,
      }}
      className="h-screen mt-14 sm:mt-0"
      exit={{ y: -20, opacity: 0.5, transition: { duration: 0.3 } }}
      >
        <BtnsFavAndCopy />
        <div className="flex justify-center items-center w-ful sm:mt-0 mb-10 text-left z-40">
          <div className="w-full h-screen grid grid-cols-1 sm:grid-cols-2">
            <div className="h-full bg-black/20 flex flex-col items-center justify-center relative">
              <img
                src={ objSelected.image }
                alt=""
                data-testid="recipe-photo"
                className="object-cover w-full h-full absolute border-white opacity-20"
              />
              <img
                src={ objSelected.image }
                alt=""
                data-testid="recipe-photo"
                className="object-cover w-60 sm:h-60 md:w-96 md:h-96 rounded-full border-2 border-white z-30"
              />
            </div>
            <div
              className="w-full flex flex-col items-center justify-center h-full"
            >
              <p
                data-testid="recipe-title"
                className="text-center text-4xl pt-3 w-full sm:text-5xl px-8"
              >
                { objSelected.name }
              </p>
              <div
                data-testid="recipe-category"
                className="flex justify-center items-center text-center w-full text-2xl bg-white sm:mb-5 italic gap-3 pt-3 h-14"
              >
                <hr className="h-2 w-20" />
                  { objSelected.category }
                <hr className="h-2 w-20" />
              </div>
              <p data-testid="recipe-title" className="w-full sm:pt-10 pt-5 text-center pb-5 px-20">
                {Object.values(objIngrMeas).length > 0 && handleIng(objIngrMeas)}
              </p>
              <StartRecipe
                id={ objSelected.id }
              />
            </div>
          </div>
      </div>
      <Footer />
    </motion.div>
  );
}
