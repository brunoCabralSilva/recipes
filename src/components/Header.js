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
    >
      <img src={ searchImg } alt="icon-search" />
    </button>
  );

  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ ProfileRedirect }
        src={ profileImg }
      >
        <img src={ profileImg } alt="icon-profile" />
      </button>
      {
        searchIcon === 'visible'
          ? showSearchButton()
          : null
      }
      {
        showSearchInput()
      }
      <SearchBar title={ title } history={ history } />
      <h1 data-testid="page-title">
        { title }
      </h1>
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  title: PropTypes.string.isRequired,
  searchIcon: PropTypes.bool.isRequired,
};
