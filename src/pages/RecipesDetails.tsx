import React, { useEffect, useContext, ReactNode } from 'react';
import contextRecipes from '../contextRecipes/context';
import StartRecipe from '../components/StartRecipe';
import BtnsFavAndCopy from '../components/BtnsFavAndCopy';
import { motion } from 'framer-motion';

interface RecDetailsProps {
  match: any,
  history: any,
}

export default function RecipesDetails(props: RecDetailsProps) {
  const {
    initialRequest,
    getFavorites,
    createElement,
    objIngrMeas,
    objGeneralist,
    type,
  } = useContext(contextRecipes);

  useEffect(() => {
    window.scrollTo(0, 0);
    initialRequest();
    getFavorites();
    createElement(props);
  }, []);

  const handleIng = (x: any): ReactNode[] => {
    let object: any = [];
    if (type === 'foods') {
      object = Object.entries(x);
    } else {
      object = Object.entries(x);
    }
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
        <BtnsFavAndCopy
          match={props.match}
          history={props.history}
          item={objGeneralist}
        />
        <div className="flex justify-center items-center w-ful sm:mt-0 mb-10 text-left z-40">
          <div className="w-full h-screen grid grid-cols-1 sm:grid-cols-2">
            <div className="h-full bg-black/20 flex flex-col items-center justify-center relative">
              <img
                src={ objGeneralist.image }
                alt=""
                data-testid="recipe-photo"
                className="object-cover w-full h-full absolute border-white opacity-20"
              />
              <img
                src={ objGeneralist.image }
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
                { objGeneralist.name }
              </p>
              <div
                data-testid="recipe-category"
                className="flex justify-center items-center text-center w-full text-2xl bg-white sm:mb-5 italic gap-3 pt-3 h-14"
              >
                <hr className="h-2 w-20" />
                  { objGeneralist.category }
                <hr className="h-2 w-20" />
              </div>
              <p data-testid="recipe-title" className="w-full sm:pt-10 pt-5 text-center pb-5 px-20">
                {Object.values(objIngrMeas).length > 0 && handleIng(objIngrMeas)}
              </p>
              <StartRecipe
                id={ objGeneralist.id }
              />
            </div>
          </div>
      </div>
    </motion.div>
  );
}
