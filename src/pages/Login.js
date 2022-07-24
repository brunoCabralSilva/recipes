import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const validateEmail = /\S+@\S+\.\S+/;
  const MIN_LENGTH_PASSWORD = 7;

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
    <main className="flex flex-row h-screen relative items-center justify-center">
      <img src={require("../images/food.jpg")} alt="" className="h-full w-full object-cover absolute" />
        <section className="py-4 flex flex-col items-center justify-center w-2/3 glassmorphism rounded-xl shadow-2xl z-20">
          <img src={require('../images/garfo-faca.png')} alt="" className="w-1/2" />
          <label htmlFor="input-email" className="flex flex-col justify-center items-center">
          <input
            type="email"
            name="email"
            value={ user.email }
            data-testid="email-input"
            onChange={ handleChange }
            id="input-email"
            placeholder="Email"
            autocomplete="off"
            className="text-center placeholder:text-madeira placeholder:text-sm text-madeira pt-2 mt-2 mb-1 w-9/12 bg-transp border-b border-madeira"
          />
          </label>
          <input
            type="password"
            name="password"
            value={ user.password }
            data-testid="password-input"
            onChange={ handleChange }
            placeholder="Password"
            autocomplete="off"
            className="text-center placeholder:text-madeira placeholder:text-sm text-madeira pt-2 mb-1 w-9/12 bg-transp border-b border-madeira"
          />
          <button
            type="button"
            disabled={
              user.password.length < MIN_LENGTH_PASSWORD
              || !validateEmail.test(user.email)
            }
            data-testid="login-submit-btn"
            onClick={ handleClick }
            className="text-center my-4 p-2 w-10/12 bg-madeira text-white font-bold hover:bg-dark transition duration-1000"
          >
            Enter
          </button>
        </section>
    </main>
  );
}
