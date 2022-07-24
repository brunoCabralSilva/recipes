import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const history = useHistory();

  const localStorageReset = () => {
    history.push('/');
    localStorage.clear();
  };

  const email = JSON.parse(localStorage.getItem('user'));
  return (
    <div>

      <Header searchIcon="hidden" title="Profile" history={ history } />
      <p data-testid="profile-email">{ email && email.email }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ localStorageReset }
      >
        Logout
      </button>
      <Footer history={ history } />
    </div>
  );
}
