import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

describe('Testar o componente Profile com suas funcionalidades', () => {
  it('Verifica se existem os botões profile e search na página Foods e se os mesmos executam suas devidas funções', async () => {
    renderWithRouter(<App />);
    const email = 'tryber@teste.com';
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, '1234567');
    const btnEnter = screen.getByTestId('login-submit-btn');
    userEvent.click(btnEnter);
    const profile = screen.getByTestId('profile-top-btn');
    userEvent.click(profile);
    const showEmail = screen.getByText(email);
    expect(showEmail).toBeInTheDocument();
  });

  it('Verifica se existe um título Profile na página', () => {
    renderWithRouter(<App />);
     const email = 'tryber@teste.com';
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, '1234567');
    const btnEnter = screen.getByTestId('login-submit-btn');
    userEvent.click(btnEnter);
    const profile = screen.getByTestId('profile-top-btn');
    userEvent.click(profile);
    const title = screen.getByRole('heading', {
        name: /profile/i
      });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se existem três botões em Profile', () => {
    renderWithRouter(<App />);
    const email = 'tryber@teste.com';
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, '1234567');
    const btnEnter = screen.getByTestId('login-submit-btn');
    userEvent.click(btnEnter);
    const profile = screen.getByTestId('profile-top-btn');
    userEvent.click(profile);
    const doneProfile = screen.getByTestId('profile-done-btn');
    const favoriteProfile = screen.getByTestId('profile-favorite-btn');
    const logout = screen.getByTestId('profile-logout-btn');
    expect(doneProfile).toBeInTheDocument();
    expect(favoriteProfile).toBeInTheDocument();
    expect(doneProfile).toBeInTheDocument();
  });

  it('Verifica se, ao clicar no botão Done Profile, é redirecionado para a página em questão', () => {
    const { history } =  renderWithRouter(<App />);
     const email = 'tryber@teste.com';
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, '1234567');
    const btnEnter = screen.getByTestId('login-submit-btn');
    userEvent.click(btnEnter);
    const profile = screen.getByTestId('profile-top-btn');
    userEvent.click(profile);
    const doneProfile = screen.getByTestId('profile-done-btn');
    userEvent.click(doneProfile);
    expect(history.location.pathname).toBe("/done-recipes");
  });

  it('Verifica se, ao clicar no botão Favorites Recipes, é redirecionado para a página em questão', () => {
    const { history } =  renderWithRouter(<App />);
     const email = 'tryber@teste.com';
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, '1234567');
    const btnEnter = screen.getByTestId('login-submit-btn');
    userEvent.click(btnEnter);
    const profile = screen.getByTestId('profile-top-btn');
    userEvent.click(profile);
    const favoriteProfile = screen.getByTestId('profile-favorite-btn');
    userEvent.click(favoriteProfile);
    expect(history.location.pathname).toBe("/favorite-recipes");
  });

  it('Verifica se, ao clicar no botão Logout, é redirecionado para a página em questão', () => {
    const { history } =  renderWithRouter(<App />);
     const email = 'tryber@teste.com';
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, '1234567');
    const btnEnter = screen.getByTestId('login-submit-btn');
    userEvent.click(btnEnter);
    const profile = screen.getByTestId('profile-top-btn');
    userEvent.click(profile);
    const logout = screen.getByTestId('profile-logout-btn');
    userEvent.click(logout);
    expect(history.location.pathname).toBe("/");
  });

});
