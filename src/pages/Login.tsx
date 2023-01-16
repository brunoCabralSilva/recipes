import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import contextRecipes from '../contextRecipes/context';
import SliderLogin from '../components/SliderLogin';

const MIN_LENGTH_PASSWORD = 7;
const validateEmail = /\S+@\S+\.\S+/;

export default function Login() {
  const context = useContext(contextRecipes);
  const { setTypeOfList } = context;
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    setTypeOfList('foods');
    history.push('/recipes');
  };

  const disabledReturn = () => {
    if (password.length < MIN_LENGTH_PASSWORD || !validateEmail.test(email)) {
      return true;
    } 
    return false;
  }

  return (
    <motion.section
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.5,
        duration: 1,
      }}
      exit={{ opacity: 0.5, transition: { duration: 0.3 } }}
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
        className="py-4 col-span-2 md:col-span-1 flex flex-col items-center justify-center z-20 relative h-screen"
      >
        <img
          src={require("../images/wallpapers/8.jpg")}
          alt=""
          className="md:hidden h-screen w-full object-cover absolute"
        />
        <div className="w-9/12 sm:w-2/3 md:w-9/12 lg:w-7/12 bg-white z-30 px-8 py-10">
          <div className="flex flex-col text-2xl items-center justify-center gap-3">
            <img
              src={require(`../images/icons/play${(password.length < MIN_LENGTH_PASSWORD || !validateEmail.test(email)) ? '2.png' : '.png'}`)}
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
              value={ email }
              data-testid="email-input"
              onChange={ (e) => setEmail(e.target.value) }
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
              value={ password }
              data-testid="password-input"
              onChange={ (e) => setPassword(e.target.value) }
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
              ${(password.length < MIN_LENGTH_PASSWORD || !validateEmail.test(email))
              ? 'bg-gray-700 text-white hover:bg-gray-900 opacity-70'
              : 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-2 border-white hover:from-yellow-500 hover:to-red-500 opacity-100'
              }`
            }
          >
            Entrar
          </button>
        </div>
      </motion.section>
      <div className="w-full h-screen hidden md:flex">
        <SliderLogin />
      </div>
    </motion.section>
  );
}
