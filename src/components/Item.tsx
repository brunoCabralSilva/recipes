import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import contextRecipes from '../contextRecipes/context';
const copy = require('clipboard-copy');

interface ItemProps {
  item:any,
  index: number,
  buttons: boolean,
};

export default function Item(props: ItemProps) {
  const { item, index, buttons } = props;
  const history = useHistory();
  const {
    typeOfList,
    requestFoodById: reqApiFId,
    requestDrinkById: reqApiDId,
    alterFavorites,
    verifyIfIsFavorite,
  } = useContext(contextRecipes);
  const [messageShared, setMessageShared] = useState('');
  const [list, setList] = useState({
    id: '',
    type: '',
    name: '',
    image: '',
    category: '',
    instructions: '',
    youtube: '',
    nationality: '',
    alcoholicOrNot: '',
    tags: '',
  });

  const populateItens = (obj: any) => {
    console.log(obj)
    if (typeOfList === 'foods') {
      setList({
        id: obj.idMeal,
        type: 'food',
        name: obj.strMeal,
        image: obj.strMealThumb,
        category: obj.strCategory,
        instructions: '',
        youtube: obj.strYoutube,
        nationality: obj.strArea,
        alcoholicOrNot: '',
        tags: obj.strTags,
      });
    } else {
      setList({
        id: obj.idDrink,
        type: 'drink',
        name: obj.strDrink,
        image: obj.strDrinkThumb,
        category: obj.strCategory,
        instructions: '',
        youtube: obj.strYoutube,
        nationality: obj.strArea,
        alcoholicOrNot: obj.strAlcoholic,
        tags: obj.strTags,
      });
    }
  };

  const changeCategory = async () => {
    if (item.name) {
      setList({
        id: item.id,
        type: item.type,
        name: item.name,
        image: item.image,
        category: item.category,
        instructions: '',
        youtube: item.youtube,
        nationality: item.nationality,
        alcoholicOrNot: item.alcoholicOrNot,
        tags: '',
      });
    } else if (!item.strCategory) {
      if (typeOfList === 'foods') {
        const search = await reqApiFId(item.idMeal);
        populateItens(search.meals[0]); 
      } else {
        const search = await reqApiDId(item.idDrink);
        populateItens(search.drinks[0]); 
      }
    } 
    else {
      populateItens(item);
    }
  };

  useEffect(() => {
    changeCategory();
  }, [item]);

  const tagsItem = () => {
    if (list.tags && list.tags!== '') {
      const splitItem =  list.tags.split(',');
      const filterItem = splitItem.filter((item: any, index: number) => index < 2);
      const mapItem = filterItem.map((item: any, index: number) => (
        <span
          className="pt-1 pr-1"
          key={index}
        >
          {item}
          {index !== filterItem.length -1 && ', '}
        </span>
      ));
      return mapItem;
    }
  };

  const sharedLink = (type: string, id: string) => {
    setTimeout(() => {
      setMessageShared('');
    }, +'3000');
    setMessageShared('Link copied!');
    copy(`http://localhost:3000/recipes/${type}/${id}`);
  };

  return(
    <div
      data-testid={ `${index}-recipe-card` }
      onClick={() => history.push(`/${list.type}/${list.id}`)}
      className="cursor-pointer sm:my-4 relative transition duration-1000 w-full"
    >
      <div
        className="flex items-center justify-start mx-auto transition-shadow duration-500 shadow hover:shadow-2xl py-4 w-full h-48">
        <img
          data-testid={ `${index}-card-img` }
          src={ list.image }
          alt=""
          className="object-contain rounded-full h-28 m-4"
        />
        <div className="pr-2 py-2">
          <p data-testid={ `${index}-card-name` } className="flex items-end z-30 font-bold leading-6 text-xl">{(list.name && list.name.length > 1) && list.name}</p>
          <p><em>{list.nationality ? list.nationality : list.category}</em></p>
          { tagsItem() }
          { list.alcoholicOrNot !== '' && list.alcoholicOrNot }
          { 
            buttons &&
            <div className="p-1 z-40 flex items-center">
              <button
                type="button"
                data-testid="favorite-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  alterFavorites(props.item);
                }}
                className="mr-3"
              >
                <img
                  src={ require(`../images/icons/${verifyIfIsFavorite(props.item.id) ? 'blackHeartIcon' : 'whiteHeartIcon'}.svg`) }
                  alt="botão favoritar/desfavoritar"
                  className=""
                />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  sharedLink(item.type, item.id)
                }}
                data-testid={ `${index}-horizontal-share-btn` }
                className="p-1 z-40 flex justify-end"
              >
                <img
                  src={ require(`../images/icons/${buttons && 'shareIcon'}.svg`) }
                  alt="Botão Compartilhar"
                  className=""
                />
              </button>
              {
                messageShared &&
                <p className="font-bold pl-5 z-40 top-16 text-black">
                  {messageShared}
                </p>
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
}

//     {/* <p data-testid={ `${index}-horizontal-done-date` }>
  //       {item.doneDate}
  //     </p> */}
  //     {/* <p data-testid={ `${index}-horizontal-done-date` }>{item.startTime}</p> */}