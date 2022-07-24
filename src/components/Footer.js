import React from 'react';
import PropTypes from 'prop-types';
import './Styles/Footer.css';
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
    <div className="footer">
      <footer data-testid="footer" htmlFor="drink">

        <button
          type="button"
          aria-label="drinks"
          className="iconDrink"
          data-testid="drinks-bottom-btn"
          src="../images/drinkIcon.svg"
          onClick={ drinkRedirect }
        >
          <img src={ drinkIcon } alt="dreakIcon" />
        </button>
        <button
          type="button"
          aria-label="foods"
          className="iconFoods"
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
    </div>
  );
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Footer;
