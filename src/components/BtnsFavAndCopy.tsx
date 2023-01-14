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
  type: string,
}

interface BtnsType {
  match: any
  history: any,
  item: ItemSelected,
}

export default function BtnsFavAndCopy(props: BtnsType) {
  const {
    messageShared,
    alterFavorites,
    sharedLink,
    listFavorites,
    verifyIfIsFavorite,
  } = useContext(contextRecipes);

  return(
    <div className="fixed top-0 flex justify-between h-14 bg-white sm:bg-transparent w-full z-50">
      <img
        src={require('../images/icons/arrow-left-black.png')}
        alt="icon arrow"
        className="ml-1 py-2 animate-pulse"
        onClick={ () => props.history.push('/recipes') }
      />
      <div className="w-full flex justify-end p-4">
        {messageShared && <p className="w-full text-base sm:text-2xl text-right">{messageShared}</p>}
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => sharedLink(props) }
          className="mx-3"
        >
          <img
            src={ require(`../images/icons/${listFavorites[0] ? 'shareIcon' : 'shareIcon'}.svg`) }
            alt="Botão Compartilhar"
          />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ () => alterFavorites(props.item)}
          className="mx-3"
        >
          <img
            src={ require(`../images/icons/${verifyIfIsFavorite(props.item.id) ? 'blackHeartIcon' : 'whiteHeartIcon'}.svg`) }
            alt="botão favoritar/desfavoritar"
          />
        </button>
      </div>
    </div>
  );
};