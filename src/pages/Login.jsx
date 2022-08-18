import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import SliderLogin from '../components/SliderLogin';

export default function Login() {
  const validateEmail = /\S+@\S+\.\S+/;
  const MIN_LENGTH_PASSWORD = 7;
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/foods');
  };

  const disabledReturn = () => {
    if (user.password.length < MIN_LENGTH_PASSWORD || !validateEmail.test(user.email)) {
      return true;
    } 
    return false;
  }

  return (
    <motion.main
      initial={{ y: 20, opacity: 0.5 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.5,
        duration: 1,
      }}
      exit={{ y: -20, opacity: 0.5, transition: { duration: 0.3 } }}
      className="flex flex-row h-screen relative items-center justify-center sm:justify-between bg-white">
      <div className="w-full sm:w-1/2 h-screen">
        <SliderLogin className="h-screen" />
      </div>
      <motion.section
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        delay: 0.7,
        duration: 1,
      }}
      exit={{ x: -20, opacity: 0, transition: { duration: 0.3 } }}
      className="py-4 flex flex-col items-center justify-center rounded-2xl z-20 sm:m-10 sm:w-1/2 absolute sm:relative">
        <div className={`shadow-2xl flex flex-col items-center justify-center w-4/5 sm:w-1/2 pt-5 sm:pt-10 pb-5 sm:pb-5 px-7 glassmorphism
        ${(user.password.length < MIN_LENGTH_PASSWORD || !validateEmail.test(user.email))
        ? 'border border-white'
        : 'border border-white'}`}>
          <div className={
            `rounded-full h-20 w-20 mb-6 sm:mb-0 flex items-center justify-center text-white
            ${(user.password.length < MIN_LENGTH_PASSWORD || !validateEmail.test(user.email))
              ? 'bg-red-700 opacity-60'
              : 'bg-red-700 opacity-100'
            }`}
          >
            <i className="fa-solid fa-user text-white text-5xl"></i>
          </div>
          <label htmlFor="input-email" className="text-sm flex flex-col justify-center items-center w-11/12 sm:mt-10">
            <span className="w-full text-black text-left pb-4 font-bold">Email</span>
          <input
            type="email"
            name="email"
            value={ user.email }
            data-testid="email-input"
            onChange={ handleChange }
            id="input-email"
            autocomplete="off"
            className="text-center placeholder:text-black placeholder:text-sm mb-1 w-full bg-transp border-b border-madeira"
          />
          </label>
          <label htmlFor="input-email" className="text-sm flex flex-col justify-center items-center w-11/12  mt-5">
          <span className="w-full text-black text-left pb-2 font-bold">Senha</span>
          <input
            type="password"
            name="password"
            value={ user.password }
            data-testid="password-input"
            onChange={ handleChange }
            autocomplete="off"
            className="text-center placeholder:text-black placeholder:text-sm mb-1 w-full bg-transp border-b border-madeira"
          />
          </label>
          <button
            type="button"
            disabled={disabledReturn()}
            data-testid="login-submit-btn"
            onClick={ handleClick }
            className={
              `text-center my-4 p-2 w-full font-bold transition duration-1000
              ${(user.password.length < MIN_LENGTH_PASSWORD || !validateEmail.test(user.email))
              ? 'bg-red-700 text-white hover:bg-red-800 opacity-70'
              : 'bg-red-700 text-white hover:bg-red-800 opacity-100 transition duration-500'
              }`
            }
          >
            Enter
          </button>
        </div>
      </motion.section>
    </motion.main>
  );
}
