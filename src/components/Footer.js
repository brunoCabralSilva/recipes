import React from 'react';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer(props) {
  const { history } = props;

  const drinkRedirect = () => {
    history.push('/drinks');
  };

  const foodRedirect = () => {
    history.push('/foods');
  };


  return (
    <footer className="bottom-0 sm:right-0 fixed z-40 flex flex-row sm:flex-col sm:items-end w-full sm:justify-end">
      <button
        type="button"
        aria-label="drinks"
        className="sm:mx-4 bg-white w-1/2 sm:w-16 h-12 sm:h-16 flex items-center justify-center border border-black"
        data-testid="drinks-bottom-btn"
        src="../images/drinkIcon.svg"
        onClick={ drinkRedirect }
      >
        <img src={ drinkIcon } alt="dreakIcon" className="w-8 sm:w-22" />
      </button>
      <button
        type="button"
        aria-label="foods"
        className="sm:m-4 bg-white w-1/2 sm:w-16 h-12 sm:h-16 flex items-center justify-center border border-black"
        src="../images/mealIcon.svg"
        data-testid="food-bottom-btn"
        onClick={ foodRedirect }
      >
        <img
          src={ mealIcon }
          alt="mealIcon"
          className="w-8 sm:w-22"
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
