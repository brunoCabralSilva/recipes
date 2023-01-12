import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import contextRecipes from '../contextRecipes/context';

const MIN_LENGTH_PASSWORD = 7;
const validateEmail = /\S+@\S+\.\S+/;

export default function Login() {
  const context = useContext(contextRecipes);
  const { setType, setUser } = context;
  const history = useHistory();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  const handleChange = ({ target }: any) => {
    const { value, name } = target;
    setUser({
      ...userData,
      [name]: value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email: userData.email }));
    setUser(userData.email);
    setType('foods');
    history.push('/recipes');
  };

  const disabledReturn = () => {
    if (userData.password.length < MIN_LENGTH_PASSWORD || !validateEmail.test(userData.email)) {
      return true;
    } 
    return false;
  }

  return (
    <motion.section
      initial={{ y: 20, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.5,
        duration: 1,
      }}
      exit={{ y: -20, opacity: 0.5, transition: { duration: 0.3 } }}
      className="grid grid-cols-2 bg-white w-full relative"
    >
      <motion.section
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          delay: 0.7,
          duration: 1,
        }}
        exit={{ x: -20, opacity: 0, transition: { duration: 0.3 } }}
        className="py-4 flex flex-col items-center justify-center z-20"
      >
        <div className="sm:w-7/12">
          <div className="flex flex-col text-2xl items-center justify-center gap-3">
            <img
              src={require(`../images/play${(userData.password.length < MIN_LENGTH_PASSWORD || !validateEmail.test(userData.email)) ? '2.png' : '.png'}`)}
              alt="logo"
              className="w-12"
            />
            <span className="py-4">Trybe Recipes</span>
          </div>
          <label htmlFor="input-email" className="text-sm flex flex-col justify-center items-center w-full sm:mt-10">
            <span className="w-full text-black text-left pb-4 font-bold">Email</span>
          <input
            type="email"
            name="email"
            value={ userData.email }
            data-testid="email-input"
            onChange={ handleChange }
            id="input-email"
            className="text-left placeholder:text-black placeholder:text-sm mb-1 w-full bg-transp border-b border-black py-1"
          />
          </label>
          <label htmlFor="input-email" className="text-sm flex flex-col justify-center items-center w-full  mt-5">
          <span className="w-full text-black text-left text-sm pb-2 font-bold">
            Senha
          </span>
          <input
            type="password"
            name="password"
            value={ userData.password }
            data-testid="password-input"
            onChange={ handleChange }
            className="text-left placeholder:text-black placeholder:text-sm mb-1 w-full bg-transp border-b border-black py-1"
          />
          </label>
          <button
            type="button"
            disabled={disabledReturn()}
            data-testid="login-submit-btn"
            onClick={ handleClick }
            className={
              `text-center my-4 p-2 w-full font-bold transition duration-1000
              ${(userData.password.length < MIN_LENGTH_PASSWORD || !validateEmail.test(userData.email))
              ? 'bg-gray-700 text-white hover:bg-gray-900 opacity-70'
              : 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-2 border-white hover:from-yellow-500 hover:to-red-500 opacity-100'
              }`
            }
          >
            Entrar
          </button>
        </div>
      </motion.section>
      <div className="w-full h-screen">
        <img src={require("../images/8.jpg")} alt="" className="h-screen w-full object-cover " />
      </div>
    </motion.section>
  );
}
