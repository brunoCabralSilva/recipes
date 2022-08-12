import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchImg from '../images/searchIcon.svg';
import profileImg from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import contexto from '../context/index';

export default function Header(props) {
  const history = useHistory();
  const cont = useContext(contexto);
  const { context } = cont;
  const { setSearchBar } = context;
  const { title, searchIcon, icon } = props;

  const ProfileRedirect = () => {
    history.push('/profile');
  };

  const showSearchButton = () => (
    <button
      type="button"
      data-testid="search-top-btn"
      onClick={ () => setSearchBar() }
      src={ searchImg }
      className="p-2"
    >
      <i className="fa-solid fa-magnifying-glass text-black text-xl"></i>
    </button>
  );

  return (
    <header className="fixed top-0 bg-white flex flex-col w-full z-30">
      <div className="flex flex-row justify-between items-center p-2 w-full">
        <div className="flex items-center">
          {
            icon === false ? <div /> : <img src={require(`../images/${title === "Foods" ? "icon_food.jpg" : "img-drinks.png"}`)} className="h-10" alt="icon food" /> 
          }
          <h1 data-testid="page-title" className="ml-5 text-black text-xl font-bold">
            { title }
          </h1>
        </div>
        <SearchBar />
        {/* <div>
          {
            searchIcon === 'visible'
              ? showSearchButton()
              : null
          }
          <button
            type="button"
            data-testid="profile-top-btn"
            onClick={ ProfileRedirect }
            src={ profileImg }
            className="p-2 ml-0 sm:mx-3"
          >
            <i className="fa-solid fa-user text-xl text-black"></i>
          </button>
        </div> */}
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center w-11/12 sm:w-3/5 md:w-2/5 items-center justify-center">
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  title: PropTypes.string.isRequired,
  searchIcon: PropTypes.string.isRequired,
};