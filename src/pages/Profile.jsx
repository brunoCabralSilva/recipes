import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { motion } from 'framer-motion';

export default function Profile() {
  const history = useHistory();

  useEffect(()=>{
    window.scrollTo(0, 0);
    // setNameOfPage('Profile');
  },[]);

  const localStorageReset = () => {
    history.push('/trybe-20-recipes');
    localStorage.clear();
  };

  const email = JSON.parse(localStorage.getItem('user'));
  return (
    <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      delay: 0.5,
      duration: 1,
    }}
    exit={{ y: -20, opacity: 0, transition: { duration: 0.3 } }}
    >
    <Header searchIcon="hidden" title="Profile" history={ history } />
      <div className="flex flex-col items-center justify-center h-80vh w-full">
        <p data-testid="profile-email" className="font-bold">{ email && email.email }</p>
        <div className="flex flex-row my-4">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="mx-3 hover:font-bold"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
            className="mx-3 hover:font-bold"
          >
            Favorite Recipes
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ localStorageReset }
            className="mx-3 hover:font-bold"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
}
