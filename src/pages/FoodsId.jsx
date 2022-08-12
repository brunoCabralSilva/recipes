import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import ItemsId from '../components/ItemsId';
import contexto from '../context';

export default function FoodsId(props) {
  const cont = useContext(contexto);
  const { context } = cont;
  const { reqApiFId, foodId } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
    const {
      match: {
        params: { id },
      },
    } = props;
    reqApiFId(id);
  }, []);

  return (
    <div>
      {
        foodId.meals && 
        <ItemsId
          name={foodId.meals[0].strMeal}
          image={foodId.meals[0].strMealThumb}
          category={foodId.meals[0].strCategory}
          instructions={foodId.meals[0].strInstructions}
          youtube={foodId.meals[0].strYoutube}
          id={foodId.meals[0].idMeal}
          nationality={foodId.meals[0].strArea}
          alcoholicOrNot=''
          object={foodId.meals[0]}
        />
      }
    </div>
  );
}

FoodsId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
