import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import contexto from '../context';
import SearchBar from './SearchBar';
import searchImg from '../images/searchIcon.svg';
import profileImg from '../images/profileIcon.svg';

// necessário passar o history como props para o componente header
export default function Header(props) {
  const history = useHistory();
  const { title, searchIcon } = props;

  const cont = useContext(contexto);
  const { context } = cont;
  const { inputSearch, sendInputSearch } = context;

  const [search, setSearch] = useState(false);

  const ProfileRedirect = () => {
    history.push('/profile');
  };

  const showSearchInput = () => {
    if (search) {
      return (
        <input
          type="text"
          data-testid="search-input"
          value={ inputSearch }
          onChange={ (e) => sendInputSearch(e.target.value) }
          placeholder="Search"
          className="text-center border border-madeira mt-6 mb-2 w-full p-1"
        />
      );
    } return null;
  };

  const showSearchButton = () => (
    <button
      type="button"
      data-testid="search-top-btn"
      onClick={ () => setSearch(!search) }
      src={ searchImg }
      className="p-2"
    >
      <i className="fa-solid fa-magnifying-glass text-white text-xl"></i>
    </button>
  );

  return (
    <header className="flex flex-col">
      <div className="bg-dark-brown flex flex-row justify-between items-center p-2 w-full">
        {
          searchIcon === 'visible'
            ? showSearchButton()
            : null
        }
        <h1 data-testid="page-title" className="text-white text-xl font-bold">
          { title }
        </h1>
        <button
          type="button"
          data-testid="profile-top-btn"
          onClick={ ProfileRedirect }
          src={ profileImg }
          className="p-2"
        >
          <i className="fa-solid fa-user text-xl text-white"></i>
        </button>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center w-11/12 sm:w-3/5 md:w-2/5 items-center justify-center">
          <div className="w-full">
            {
              showSearchInput()
            }
          </div>
          {search && <SearchBar title={ title } history={ history } />}
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
  searchIcon: PropTypes.bool.isRequired,
};
