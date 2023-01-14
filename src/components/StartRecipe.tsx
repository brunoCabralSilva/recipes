import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

interface StartRecipeType {
  id: string,
}

export default function StartRecipe(props: StartRecipeType) {
  const [phrase, setPhrase] = useState('');
  const history = useHistory();

  useEffect(() => {
    const inProgress = localStorage.getItem('inProgressRecipes');
    const doneRecipes = localStorage.getItem('doneRecipes');
    if(doneRecipes) {
      const done = JSON.parse(doneRecipes).filter((item: any) => item.id === id);
      if (done.length > 0) setPhrase('Make this Recipe Again');
      else setPhrase('Start Recipe');
    } else if (inProgress) {
      const verifyIfExists = JSON.parse(inProgress)
      .filter((item: any) => item.id === id);
      if (verifyIfExists.length > 0) { setPhrase('Continue Recipe');
      } else setPhrase('Start Recipe');
    } else setPhrase('Start Recipe');
  }, []);

  const redirectToInProgress = () => {
    if ('Make this Recipe Again') {
      const inProgress = localStorage.getItem('inProgressRecipes');
      const doneRecipes = localStorage.getItem('doneRecipes');
      if (inProgress) {
        const getTheRecipeInProgress = JSON.parse(inProgress).filter((recipe: any) => recipe.id !== id);
        localStorage.setItem('inProgressRecipes', JSON.stringify([...getTheRecipeInProgress, { id, progress: []}]));
      }
      if (doneRecipes) {
        const getTheRecipeInDone = JSON.parse(doneRecipes).filter((recipe: any) => recipe.id !== id);
        localStorage.setItem('doneRecipes', JSON.stringify(getTheRecipeInDone));
      }
    }
    history.push(`/in-progress/${type}/${id}`);
  };
  
  const {
    type,
    id,
  }: any = useParams();
  return (
    <div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="border border-black rounded-full px-5 py-3 sm:mt-10 mt-5"
        onClick={ redirectToInProgress }
      >
        { phrase }
      </button>
    </div>
  );
}
