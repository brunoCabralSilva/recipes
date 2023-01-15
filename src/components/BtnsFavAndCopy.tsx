import { useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import contextRecipes from '../contextRecipes/context';

export default function BtnsFavAndCopy() {
  const {
    alterFavorites,
    messageShared,
    sharedLink,
    listFavorites,
    verifyIfIsFavorite,
    objSelected,
  } = useContext(contextRecipes);

  const history = useHistory();
  const params: { type: string, id: string } = useParams();

  return(
    <div className="fixed top-0 flex justify-between h-14 bg-white sm:bg-transparent w-full z-50">
      <img
        src={require('../images/icons/arrow-left-black.png')}
        alt="icon arrow"
        className="ml-1 py-2 animate-pulse"
        onClick={ () => history.goBack() }
      />
      <div className="w-full flex justify-end p-4">
        {messageShared && <p className="w-full text-base sm:text-2xl text-right">{messageShared}</p>}
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => sharedLink(params.type, params.id) }
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
          onClick={ () => alterFavorites(objSelected)}
          className="mx-3"
        >
          <img
            src={ require(`../images/icons/${verifyIfIsFavorite(objSelected.id) ? 'blackHeartIcon' : 'whiteHeartIcon'}.svg`) }
            alt="botão favoritar/desfavoritar"
          />
        </button>
      </div>
    </div>
  );
};