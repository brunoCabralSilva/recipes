import { useEffect, useContext, useState, ReactNode } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import contextRecipes from '../contextRecipes/context';
import BtnsFavAndCopy from "../components/BtnsFavAndCopy";

interface RecipesProgressType {
  history: any,
  match: any,
};

export default function RecipesInProgress(props: RecipesProgressType) {
  const [ingredientList, setIngredientList] = useState(['']);
  const { type }: any = useParams();
  const {
    getFavorites,
    createElement,
    objIngrMeas,
    objGeneralist,
    setType,
  } = useContext(contextRecipes);

  const history: any = useHistory();

  useEffect(() => {
    const getItens = localStorage.getItem('inProgressRecipes');
    if (getItens) {
      const listIngredients = JSON.parse(getItens).filter((item: any) => item.id === objGeneralist.id );
      if (listIngredients.length > 0) {
        const listIng = listIngredients[0].progress;
        setIngredientList(listIng);
      }
    }
    window.scrollTo(0, 0);
    if (objGeneralist.name === '') {
      setType(type);
      createElement(props);
      getFavorites();
    }
  }, []);

  const directClick = () => {
    const localFood = localStorage.getItem('doneRecipes');
    if (localFood) {
      localStorage.setItem('doneRecipes', JSON.stringify([...localFood, objGeneralist]));
    }
    else {
      localStorage.setItem('doneRecipes', JSON.stringify([objGeneralist]));
    }
    history.push('/done-recipes');
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
      .filter((item: any) => item.id === objGeneralist.id);
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
          id: objGeneralist.id,
          progress: [`${ingredient} (${meas})`],
        },
      ]));
      console.log('1');
    } else {
      const verifyIfRecipeExists = JSON.parse(getItens)
      .filter((item: any) => item.id === objGeneralist.id);

      if (verifyIfRecipeExists.length === 0) {
        localStorage.setItem('inProgressRecipes', JSON.stringify([
          ...JSON.parse(getItens),
          { 
            id: objGeneralist.id,
            progress: [`${ingredient} (${meas})`],
          },
        ]));
        console.log('2');
      } else {
        const verifyIfIngredientExists = verifyIfRecipeExists[0].progress.filter((ing: any) => ing === `${ingredient} (${meas})`);

        if (verifyIfIngredientExists.length === 0) {
          const arrayWithoutItem = JSON.parse(getItens)
            .filter((item: any) => item.id !== objGeneralist.id);

          const addNewIngredient = {
            id: verifyIfRecipeExists[0].id,
            progress: [...verifyIfRecipeExists[0].progress, `${ingredient} (${meas})`],
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify([...arrayWithoutItem, addNewIngredient]));
        } else {
          const arrayWithoutItem = JSON.parse(getItens)
          .filter((item: any) => item.id === !objGeneralist.id);
          
          const removeIngredient = verifyIfRecipeExists[0].progress.filter((ing: any) => ing !== `${ingredient} (${meas})`);
          console.log('4');
          localStorage.setItem('inProgressRecipes', JSON.stringify([
            ...arrayWithoutItem,
            { 
              id: objGeneralist.id,
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
          className={`border border-black ${verifyIfIsConcluded(ingredients[i][1], measure[i]) ? 'bg-black text-white' : ''} rounded-full px-5 py-3`}
        >
          <span>
            {`${ingredients[i] && ingredients[i][1] } ${ measure[i] ? `(${measure[i][1]})` : '' }`}
          </span>
        </button>
      );
    }
    return array;
  };

    const returnDisabled = () => {
      const getItem = localStorage.getItem('inProgressRecipes');
    if (getItem && getItem.length > 0) {
      const search = JSON.parse(getItem).filter((fil: any) => fil.id === objGeneralist.id);
      if (search.length === 0) {
        return true;
      } else {
        const obj = Object.entries(objIngrMeas);
        const ingredients = obj.filter((name: any) => name[0].includes('Ingredient') && name[1].length > 2);
        console.log(ingredients.length === search[0].progress && search[0].progress.length);
        return !(ingredients.length === search[0].progress.length);
      }
    } return true;
  };

  return (
    <div className="h-screen sm:mt-0 grid grid-cols-2">
      <BtnsFavAndCopy
        match={props.match}
        history={props.history}
        item={objGeneralist}
      />
        <div
          className="w-full flex flex-col items-center justify-center h-full"
        >
          <p
            data-testid="recipe-title"
            className="text-left text-4xl pt-3 w-full sm:text-5xl px-8"
          >
            { objGeneralist.name }
          </p>
          <div
            data-testid="recipe-category"
            className="flex justify-start items-center text-center w-full text-2xl bg-white sm:mb-5 italic gap-3 px-10"
          >
            { objGeneralist.category }
          </div>
          <p data-testid="recipe-title" className="w-full text-left pb-3 px-10">
            { objGeneralist.instructions }
          </p>
          <div data-testid="recipe-title" className="w-full pt-5 text-center pb-5 px-9 gap-3 flex items-center justify-start flex-wrap">
            {Object.values(objIngrMeas).length > 0 && handleIng(objIngrMeas)}
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ directClick }
              disabled={ returnDisabled() }
              className="border border-black rounded-full px-5 py-3"
            >
              Finalizar
            </button>
          </div>
        </div>
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
    </div>
  );
}
