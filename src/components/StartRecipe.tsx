import { useHistory, useParams } from 'react-router-dom';

interface StartRecipeType {
  id: string,
}

export default function StartRecipe(props: StartRecipeType) {
  const history = useHistory();
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
        onClick={ () => history.push(`/in-progress/${type}/${id}`) }
      >
        { !localStorage.getItem('doneRecipes') && !localStorage.getItem('inProgressRecipes')
          ? 'Start Recipe' 
          : 'Continue Recipe'
        }
      </button>
    </div>
  );
}
