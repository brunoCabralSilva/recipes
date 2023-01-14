import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import contextRecipes from '../contextRecipes/context';

interface ItemProps {
  item:any,
  index: number,
  buttons: boolean,
};

export default function Item(props: ItemProps) {
  const { item, index, buttons } = props;
  const {
    typeOfList,
    requestFoodById: reqApiFId,
    requestDrinkById: reqApiDId,
    sharedLink,
    messageShared,
    alterFavorites,
    verifyIfIsFavorite,
  } = useContext(contextRecipes);
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

  return(
    <Link
      to={`/${list.type}/${list.id}`}
        data-testid={ `${index}-recipe-card` }
        className="sm:my-4 transition duration-1000 w-full mx-auto"
      >
        <div className="flex items-center justify-start mx-auto hover:shadow-2xl py-4">
          <img
            data-testid={ `${index}-card-img` }
            src={ list.image }
            alt=""
            className="object-contain rounded-full h-28 m-4"
          />
          <div className="p-2">
            <p data-testid={ `${index}-card-name` } className="flex items-end z-30 font-bold leading-6 text-xl">{(list.name && list.name.length > 1) && list.name}</p>
            <p><em>{list.nationality ? list.nationality : list.category}</em></p>
            { tagsItem() }
            { list.alcoholicOrNot !== '' && list.alcoholicOrNot }
            { buttons &&
              <div className="relative p-1 w-full z-40 flex items-center justify-start">
                <button
                  type="button"
                  data-testid="favorite-btn"
                  onClick={ () => alterFavorites(props.item)}
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
                  onClick={ () => sharedLink(props) }
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
                  <p className="absolute font-bold z-40 top-16 text-black">
                    {messageShared}
                  </p>
                }
              </div>
            }
          </div>
        </div>
    </Link>
  );
}

//     {/* <p data-testid={ `${index}-horizontal-done-date` }>
  //       {item.doneDate}
  //     </p> */}
  //     {/* <p data-testid={ `${index}-horizontal-done-date` }>{item.startTime}</p> */}