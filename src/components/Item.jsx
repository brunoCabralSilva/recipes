import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import contexto from '../context';

export default function Item({ link, image, text, name, tags, index }) {
  const cont = useContext(contexto);
  const { context } = cont;
  const { type } = context;

  const tagsItem = () => {
    if (tags) {
      const splitItem =  tags.split(',');
      const filterItem = splitItem.filter((item, index) => index < 2);
      const mapItem = filterItem.map((item, index) => {
        if(index === filterItem.length -1) {
          return (<p key={index}>{item}</p>);
        } return (<p className="pt-1" key={index}>{item}{', '}</p>);
      });
      return mapItem;
    }
  }

  const resumeName = (name) => {
    if (name.length > 7) {
      return (`${name.slice(0, +'7')}...`);
    } return name;
  }

  return(
    <Link
      to={ type === 'foods' ? `/foods/${link}` : `/drinks/${link}` }
      key={ index }
        data-testid={ `${index}-recipe-card` }
        className="bg-white rounded-xl sm:my-4 transition duration-1000 w-11/12 mm:w-1/2 md:w-1/2 lg:w-1/3 mx-auto"
      >
        <div className="flex items-center justify-start mx-auto hover:shadow-2xl sm:p-4 sm:mx-14">
          <img
            data-testid={ `${index}-card-img` }
            src={ image }
            alt=""
            className="object-contain rounded-full h-28 m-4"
          />
          <div className="p-2">
            <p data-testid={ `${index}-card-name` } className="flex items-end z-30 font-bold leading-4 text-xl">{(name && name.length > 1) && resumeName(name)}</p>
            <p><em>{text}</em></p>
            {tagsItem()}
          </div>
        </div>
    </Link>
  );
}