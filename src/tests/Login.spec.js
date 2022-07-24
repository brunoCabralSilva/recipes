import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

const EMAIL_ACESS = 'teste@teste.com';
describe('Testar a tela de Login com suas funcionalidades', () => {
  it('A página Login renderizada na rota "/"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const loginElement = screen.getByText(/App de Receitas/i);
    expect(loginElement).toBeInTheDocument();
  });

  it('Verifica se é possivel digitar nos inputs', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputEmail, EMAIL_ACESS);

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputPassword, '12345678');
  });

  it('Verifica se e redirecionado para a Tela principal de comida', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputEmail, EMAIL_ACESS);

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    userEvent.type(inputPassword, '1234567');

    const btnEnter = screen.getByTestId('login-submit-btn');
    expect(btnEnter).toBeInTheDocument();

    userEvent.click(btnEnter);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
  });
  
})