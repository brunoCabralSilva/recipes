import { useContext } from 'react';
import contextRecipes from '../contextRecipes/context';

interface ItemSelected {
  name: string,
  image: string,
  category: string,
  instructions: string,
  youtube: string,
  id: string,
  nationality: string,
  alcoholicOrNot: string,
}

interface BtnsType {
  match: any
  history: any,
  item: ItemSelected,
}

export default function BtnsFavAndCopy(props: BtnsType) {
  const {
    link,
    addFavorites,
    clickLink,
    fav,
    isFav,
  } = useContext(contextRecipes);

  return(
    <div className="fixed top-0 flex justify-between h-14 bg-white sm:bg-transparent w-full z-50">
      <img
        src={require('../images/icons/arrow-left-black.png')}
        alt="icon arrow"
        className="ml-2 py-2 animate-pulse"
        onClick={ () => props.history.push('/recipes') }
      />
      <div className="w-full flex justify-end p-4">
        {link && <p className="w-full text-base sm:text-2xl text-right">{link}</p>}
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => clickLink(props) }
          className="mx-3"
        >
          <img
            src={ require(`../images/icons/${fav[0] ? 'shareIcon' : 'shareIcon'}.svg`) }
            alt="Botão Compartilhar"
          />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ () => addFavorites(props.item)}
          className="mx-3"
        >
          <img
            src={ require(`../images/icons/${isFav(props.item.id) ? 'blackHeartIcon' : 'whiteHeartIcon'}.svg`) }
            alt="botão favoritar/desfavoritar"
          />
        </button>
      </div>
    </div>
  );
};