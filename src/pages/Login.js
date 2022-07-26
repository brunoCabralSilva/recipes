import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import SliderLogin from '../components/SliderLogin';

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const validateEmail = /\S+@\S+\.\S+/;
  const MIN_LENGTH_PASSWORD = 7;

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
  // https://pt.stackoverflow.com/questions/399129/localstorage-salvar-alguns-campos
  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    history.push('/foods');
  };

  return (
    <motion.main
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.5,
        duration: 1,
      }}
      exit={{ y: -20, opacity: 0, transition: { duration: 0.3 } }}
      className="flex flex-row h-screen relative items-center justify-center sm:justify-between bg-none">
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
        <div className="flex flex-col items-center justify-center w-4/5 sm:w-1/2 bg-white pt-10 sm:pt-0 pb-5 s,:pb-5 px-7 sm:px-0 glassmorphism">
          <label htmlFor="input-email" className="flex flex-col justify-center items-center w-full">
          <span className="w-full text-madeira text-left text-sm">Email</span>
          <input
            type="email"
            name="email"
            value={ user.email }
            data-testid="email-input"
            onChange={ handleChange }
            id="input-email"
            autocomplete="off"
            className="text-center placeholder:text-madeira placeholder:text-sm text-madeira mb-1 w-full bg-transp border-b border-madeira"
          />
          </label>
          <label htmlFor="input-email" className="flex flex-col w-full justify-center items-center mt-6">
          <span className="w-full text-madeira text-left text-sm">Senha</span>
          <input
            type="password"
            name="password"
            value={ user.password }
            data-testid="password-input"
            onChange={ handleChange }
            autocomplete="off"
            className="text-center placeholder:text-madeira placeholder:text-sm text-madeira mb-1 w-full bg-transp border-b border-madeira"
          />
          </label>
          <button
            type="button"
            disabled={
              user.password.length < MIN_LENGTH_PASSWORD
              || !validateEmail.test(user.email)
            }
            data-testid="login-submit-btn"
            onClick={ handleClick }
            className="text-center my-4 p-2 w-full bg-madeira text-white font-bold hover:bg-dark transition duration-1000"
          >
            Enter
          </button>
        </div>
      </motion.section>
    </motion.main>
  );
}
