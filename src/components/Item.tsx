import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import contextRecipes from '../contextRecipes/context';

interface ItemProps {
  item:any,
  index: number,
  alcoholicElement: string,
};

export default function Item(props: ItemProps) {
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [alcoholic, setAlcoholic] = useState('');

  const { item, index, alcoholicElement } = props;

  const context = useContext(contextRecipes);
  const { type, reqApiFId, reqApiDId } = context;

  useEffect(() => {
    const completeObject = async () => {
      setAlcoholic(alcoholicElement);
      if (!item.strCategory) {
        if (type === 'foods') {
          const search = await reqApiFId(item.idMeal);
          setLink(search.meals[0].idMeal);
          setImage(search.meals[0].strMealThumb);
          setText(search.meals[0].strArea);
          setName(search.meals[0].strMeal);
          setTags(search.meals[0].strTags);
        } else {
          const search = await reqApiDId(item.idDrink);
          setLink(search.drinks[0].idDrink);
          setImage(search.drinks[0].strDrinkThumb);
          setText(search.drinks[0].strCategory);
          setName(search.drinks[0].strDrink);
          setTags('');
        }
      } else {
        if (type === 'foods') {
          setLink(item.idMeal);
          setImage(item.strMealThumb);
          setText(item.strArea);
          setName(item.strMeal);
          setTags(item.strTags);
        } else {
          setLink(item.idDrink);
          setImage(item.strDrinkThumb);
          setText(item.strCategory);
          setName(item.strDrink);
          setTags('');
        }
    }};
    completeObject();
  });

  const tagsItem = () => {
    if (tags && tags!== '') {
      const splitItem =  tags.split(',');
      const filterItem = splitItem.filter((item: any, index: number) => index < 2);
      const mapItem = filterItem.map((item: any, index: number) => {
        if(index === filterItem.length -1) {
          return (<p key={index}>{item}</p>);
        } return (<p className="pt-1" key={index}>{item}{', '}</p>);
      });
      return mapItem;
    }
  }

  const returnAlcoholic = () => {
    if (type !== 'foods') {
      if (alcoholic) {
        return 'Alcoholic';
      } return 'Not Alcoholic';
    }
  }

  return(
    <Link
      to={`/${type}/${link}`}
      key={ index }
        data-testid={ `${index}-recipe-card` }
        className="sm:my-4 transition duration-1000 w-full mx-auto"
      >
        <div className="flex items-center justify-start mx-auto hover:shadow-2xl py-4">
          <img
            data-testid={ `${index}-card-img` }
            src={ image }
            alt=""
            className="object-contain rounded-full h-28 m-4"
          />
          <div className="p-2">
            <p data-testid={ `${index}-card-name` } className="flex items-end z-30 font-bold leading-6 text-xl">{(name && name.length > 1) && name}</p>
            <p><em>{text}</em></p>
            {tagsItem()}
            { returnAlcoholic() }
          </div>
        </div>
    </Link>
  );
}