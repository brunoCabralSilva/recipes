import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.jpg';
import mealIcon from '../images/mealllicon.jpg';
import contexto from '../context';

function Footer(props) {
  const cont = useContext(contexto);
  const { context } = cont;
  const {
    alterType, clearFilterCat, setSearchBar
  } = context

  const { history } = props;

  const drinkRedirect = () => {
    clearFilterCat();
    history.push('/drinks');
    alterType('drinks');
    setSearchBar(false);
  };

  const foodRedirect = () => {
    clearFilterCat();
    history.push('/foods');
    alterType('foods');
    setSearchBar(false);
  };


  return (
    <footer className="bottom-14 sm:bottom-10 sm:right-0 fixed z-40 flex flex-col items-end w-full justify-end">
      <button
        type="button"
        aria-label="drinks"
        className="mx-2 sm:mx-4 bg-white rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center border border-black"
        data-testid="drinks-bottom-btn"
        src="../images/drinkIcon.svg"
        onClick={ drinkRedirect }
      >
        <img src={ drinkIcon } alt="dreakIcon" className="w-full h-full rounded-full border-2 border-white sm:w-22" />
      </button>
      <button
        type="button"
        aria-label="foods"
        className="mx-2 sm:mx-4 my-3 bg-white rounded-full w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center"
        src="../images/mealIcon.svg"
        data-testid="food-bottom-btn"
        onClick={ foodRedirect }
      >
        <img
          src={ mealIcon }
          alt="mealIcon"
          className="w-full h-full rounded-full border border-white sm:w-22"
        />
      </button>
    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Footer;
