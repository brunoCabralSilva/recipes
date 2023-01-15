import { useEffect, useContext, useState, ReactNode } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import contextRecipes from '../contextRecipes/context';
import BtnsFavAndCopy from "../components/BtnsFavAndCopy";
import Footer from '../components/Footer';
import { VscError } from "react-icons/vsc";

export default function RecipesInProgress() {
  const [ingredientList, setIngredientList] = useState(['']);
  const {
    getFavorites,
    createElement,
    setTypeOfList,
    objIngrMeas,
    objSelected,
  } = useContext(contextRecipes);

  const [messageNotComplete, setMessageNotComplete] = useState(false);

  const history: any = useHistory();
  const { type, id }: { type: string, id: string } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    const getItens = localStorage.getItem('inProgressRecipes');
    if (getItens) {
      const listIngredients = JSON.parse(getItens).filter((item: any) => item.id === objSelected.id );
      if (listIngredients.length > 0) {
        const listIng = listIngredients[0].progress;
        setIngredientList(listIng);
      }
    }
    if (objSelected.name === '') {
      setTypeOfList(type);
      createElement(type, id);
      getFavorites();
    }
  }, []);

  const returnObject = (object: any) => {
    return {
      name: object.name,
      image: object.image,
      category: object.category,
      instructions: '',
      youtube: '',
      id: object.id,
      nationality: object.nationality,
      alcoholicOrNot: object.alcoholicOrNot,
      type: object.type,
      tags: object.tags,
    };
  }

  const directClick = () => {
    if (returnDisabled()) {
      setMessageNotComplete(true);
      setTimeout(() => setMessageNotComplete(false), 4000);
    } else {
      const localFood = localStorage.getItem('doneRecipes');
      if (localFood) {
        const objDnRec = JSON.parse(localFood).map((done: any) => (returnObject(done)));
        const verifyIfIsDone = objDnRec.filter((element: any) => element.id === objSelected.id);
        if (verifyIfIsDone.length === 0) {
          localStorage.setItem('doneRecipes', JSON.stringify([...objDnRec,
          returnObject(objSelected),
          ]));
        }
      }
      else {
        localStorage.setItem('doneRecipes', JSON.stringify([returnObject(objSelected)]));
      }
      history.push('/done-recipes');
    }
  };

  const verifyIfIsConcluded = (ingredients: any, measure: any) => {
    let meas = '';
    if( measure) {
      meas = measure[1];
    } 
    const getItens = localStorage.getItem('inProgressRecipes');
    if (!getItens || JSON.parse(getItens).length === 0) {
      return false;
    } else {
      const verifyIfRecipeExists = JSON.parse(getItens)
      .filter((item: any) => item.id === objSelected.id);
      if (verifyIfRecipeExists.length === 0) {
        return false;
      }

      const verifyIfIngredientExists = verifyIfRecipeExists[0].progress.filter((item: any) => item === `${ingredients} (${meas})`);

      if (verifyIfIngredientExists.length > 0) {
        return true;
      } else return false;
    }
  };

  const addInState = (ingredient: any, measure: any) => {
    const search = ingredientList.filter((item) => item === `${ingredient} (${measure})`);
    if (search.length === 0 ) {
      setIngredientList([...ingredientList, `${ingredient} ${measure}`]);
    } else {
      const search2 = ingredientList.filter((item) => item !== `${ingredient} (${measure})`);
      setIngredientList(search2);
    }
  };

  const saveProgress = (ingredient: any, measure: any) => {
    let meas = '';
    if( measure) {
      meas = measure[1];
    }
    addInState(ingredient, meas);
    const getItens = localStorage.getItem('inProgressRecipes');
    if (!getItens || JSON.parse(getItens).length === 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify([
        { 
          id: objSelected.id,
          progress: [`${ingredient} (${meas})`],
        },
      ]));
    } else {
      const verifyIfRecipeExists = JSON.parse(getItens)
      .filter((item: any) => item.id === objSelected.id);

      if (verifyIfRecipeExists.length === 0) {
        localStorage.setItem('inProgressRecipes', JSON.stringify([
          ...JSON.parse(getItens),
          { 
            id: objSelected.id,
            progress: [`${ingredient} (${meas})`],
          },
        ]));
      } else {
        const verifyIfIngredientExists = verifyIfRecipeExists[0].progress.filter((ing: any) => ing === `${ingredient} (${meas})`);

        if (verifyIfIngredientExists.length === 0) {
          const arrayWithoutItem = JSON.parse(getItens)
            .filter((item: any) => item.id !== objSelected.id);

          const addNewIngredient = {
            id: verifyIfRecipeExists[0].id,
            progress: [...verifyIfRecipeExists[0].progress, `${ingredient} (${meas})`],
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify([...arrayWithoutItem, addNewIngredient]));
        } else {
          const arrayWithoutItem = JSON.parse(getItens)
          .filter((item: any) => item.id === !objSelected.id);
          
          const removeIngredient = verifyIfRecipeExists[0].progress.filter((ing: any) => ing !== `${ingredient} (${meas})`);
          localStorage.setItem('inProgressRecipes', JSON.stringify([
            ...arrayWithoutItem,
            { 
              id: objSelected.id,
              progress: removeIngredient,
            },
          ]));    
        }
      }
    }
  };

  const handleIng = (x: any): ReactNode[] => {
    let object: any = [];
    if (type === 'foods') {
      object = Object.entries(x);
    } else {
      object = Object.entries(x);
    }
    const ingredients = object.filter((name: string) => name[0].includes('Ingredient') && name[1] && name[1].length > 2);
    const measure = object.filter((name: string) => name[0].includes('Measure') && name[1] && name[1].length > 2);
    const array: any = [];
    for (let i = 0; i < ingredients.length; i += 1) {
      array.push(
        <button
          type="button"
          onClick={ () => saveProgress(ingredients[i][1], measure[i]) }
          className={`border border-black ${verifyIfIsConcluded(ingredients[i][1], measure[i]) ? 'bg-gradient-to-r from-orange-500 to-red-600 bg-white border font-bold border-white text-white ' : ''} rounded-full px-5 py-3`}
        >
          <span>
            {`${ingredients[i] && ingredients[i][1] } ${ measure[i] ? `(${measure[i][1]})` : '' }`}
          </span>
        </button>
      );
    }
    return array;
  };

  const verifyMeasure = (name: any) => {
    if (name[1]) {
      if (name[1].length > 2) {
        return true;
      } return false;
    } return false;
  }

  const returnDisabled = () => {
    const getItem = localStorage.getItem('inProgressRecipes');
    if (getItem && getItem.length > 0) {
      const search = JSON.parse(getItem).filter((fil: any) => fil.id === objSelected.id);
      if (search.length === 0) {
        return true;
      } else {
        const obj = Object.entries(objIngrMeas);
        const ingredients = obj.filter((name: any) => name[0].includes('Ingredient') && verifyMeasure(name));
        return !(ingredients.length === search[0].progress.length);
      }
    } return true;
  };

  return (
    <div className="flex flex-col">
      <div className=" sm:mt-0 grid grid-cols-1 md:grid-cols-2">
        <BtnsFavAndCopy />
        <div className="h-full bg-black/20 flex flex-col items-center justify-center relative md:hidden mt-10">
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
          className="w-full flex flex-col items-center justify-center h-full pt-10 text-center md:text-left"
        >
          <p
            data-testid="recipe-title"
            className="text-4xl pt-3 mt-5 md:mt-0 w-full sm:text-5xl px-10"
          >
            { objSelected.name }
          </p>
          <div
            data-testid="recipe-category"
            className="mb-5 w-full text-2xl bg-white italic gap-3 px-10"
          >
            { objSelected.category }
          </div>
          <p data-testid="recipe-title" className="w-full pb-3 px-10">
            { objSelected.instructions }
          </p>
          <div data-testid="recipe-title" className="w-full pt-5 pb-5 px-9 gap-3 grid grid-cols-1 md:flex items-center justify-center md:justify-start flex-wrap ">
            {Object.values(objIngrMeas).length > 0 && handleIng(objIngrMeas)}
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ directClick }
              className="border hover:bg-black hover:text-white hover:font-bold border-black rounded-full px-5 py-3"
            >
              Finalizar
            </button>
          </div>
            <div className="px-9 font-bold text-red-500 w-full mb-5">
              { messageNotComplete &&
              <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full">
                <VscError className="mr-2 text-2xl mb-2 sm:mb-0" />
                <span>
                  Nem todos os ingredientes foram marcados!
                </span>
              </div>
              }
            </div>
        </div>
        <div className="h-full bg-black/20 flex-col items-center justify-center relative hidden sm:flex">
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
      </div>
      <Footer />
    </div>
  );
}
