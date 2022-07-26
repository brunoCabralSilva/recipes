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
    <footer className="bottom-0 right-0 fixed z-40 flex flex-col items-end justify-end">
      <button
        type="button"
        aria-label="drinks"
        className="mx-4 bg-light-brown w-16 h-16 flex items-center justify-center border border-2 border-black"
        data-testid="drinks-bottom-btn"
        src="../images/drinkIcon.svg"
        onClick={ drinkRedirect }
      >
        <img src={ drinkIcon } alt="dreakIcon" className="w-22" />
      </button>
      <button
        type="button"
        aria-label="foods"
        className="m-4 bg-light-brown w-16 h-16 flex items-center justify-center border border-2 border-black"
        src="../images/mealIcon.svg"
        data-testid="food-bottom-btn"
        onClick={ foodRedirect }
      >
        <img
          src={ mealIcon }
          alt="mealIcon"
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
