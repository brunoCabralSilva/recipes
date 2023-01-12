import React, { useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import contexto from '../context';
import ItemsId from '../components/ItemsId';

export default function DrinksId(props) {
  const cont = useContext(contexto);
  const { context } = cont;
  const { reqApiDId, drinkId } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
    const {
      match: {
        params: { id },
      },
    } = props;
    reqApiDId(id);
  }, []);

  return (
    <div>
      {
        drinkId.drinks && 
        <ItemsId
          name={drinkId.drinks[0].strDrink}
          image={drinkId.drinks[0].strDrinkThumb}
          category={drinkId.drinks[0].strCategory}
          instructions={drinkId.drinks[0].strInstructions}
          youtube={drinkId.drinks[0].strYoutube}
          id={drinkId.drinks[0].idDrink}
          nationality=''
          alcoholicOrNot={drinkId.drinks[0].strAlcoholic}
          object={drinkId.drinks[0]}
        />
      }
    </div>
  );
}

DrinksId.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
