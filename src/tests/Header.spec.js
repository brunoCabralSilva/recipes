import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

const NUMBER = 30000;
describe('Testar o componente Header com suas funcionalidades', () => {
  // jest.setTimeout(NUMBER);
  // it('Verifica se existem os botões profile e search na página Foods e se os mesmos executam suas devidas funções', async () => {
  //   renderWithRouter(<App />);
  //   const inputEmail = screen.getByTestId('email-input');
  //   userEvent.type(inputEmail, 'teste@teste.com');
  //   const inputPassword = screen.getByTestId('password-input');
  //   userEvent.type(inputPassword, '1234567');
  //   const btnEnter = screen.getByTestId('login-submit-btn');
  //   userEvent.click(btnEnter);
  //   // history.push('/foods');
  //   const buttonSearch = screen.getByTestId('search-top-btn');
  //   expect(buttonSearch).toBeInTheDocument();
  //   const buttonProfile = screen.getByTestId('profile-top-btn');
  //   expect(buttonProfile).toBeInTheDocument();
  // });

  it('Verifica se existem os botões profile e search na página Foods e se os mesmos executam suas devidas funções', async () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    userEvent.type(inputEmail, 'teste@teste.com');
    const inputPassword = screen.getByTestId('password-input');
    userEvent.type(inputPassword, '1234567');
    const btnEnter = screen.getByTestId('login-submit-btn');
    userEvent.click(btnEnter);
    history.push('/drinks');
    const title = screen.getByText('Drinks');
    expect(title).toBeInTheDocument();
    const buttonSearch = screen.getByTestId('search-top-btn');
    expect(buttonSearch).toBeInTheDocument();
    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();
  });

  // it('testando redirecionamento do icone de Perfil', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/foods');
  //   const { location: { pathname } } = history;
  //   expect(pathname).toBe('/foods');
  //   const buttonProfile = screen.getByTestId('profile-top-btn');
  //   expect(buttonProfile).toBeInTheDocument();
  //   userEvent.click(buttonProfile);
  //   const profileText = screen.getByRole('heading', {
  //     name: /profile/i
  //   })
  //   expect(profileText).toBeInTheDocument();
  // });

  // it('Testando inputs de busca', () => {
  //   renderWithRouter(<App />);
  //   const btnBack = screen.getByRole('button', {
  //     name: /tela principal/i
  //   })
  //   expect(btnBack).toBeInTheDocument();
  //   userEvent.click(btnBack);
  //   const buttonSearch = screen.getByTestId('search-top-btn');
  //   expect(buttonSearch).toBeInTheDocument();
  //   userEvent.click(buttonSearch);
  //   const searchInput = screen.getByTestId('search-input');
  //   expect(searchInput).toBeInTheDocument();
  // });

  // it('Testando Filtro de buscas renderizados na Página', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/foods');
  //   const ingredientEl = screen.getByText(/Ingredient/i);
  //   const nameEl = screen.getByText(/Name/i);
  //   const FirstLetterEl = screen.getByText(/First Letter/i);
  //   expect(ingredientEl).toBeDefined();
  //   expect(nameEl).toBeDefined();
  //   expect(FirstLetterEl).toBeDefined();
  // });

  // it('Testando inputs de busca novamente', () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/foods');
  //   const buttonSearch = screen.getByTestId('search-top-btn');
  //   let searchInput = screen.queryByPlaceholderText(/search/i);
  //   expect(searchInput).not.toBeInTheDocument();
  //   userEvent.click(buttonSearch);
  //   searchInput = screen.queryByPlaceholderText(/search/i);
  //   expect(searchInput).toBeInTheDocument();
    
  // });

  // it('Teste Filtro de busca, Primeira Letra da página Principal', async () => {
  //   const { history } = renderWithRouter(<App />);
  //   history.push('/foods');
  //   const firstLetter = screen.getByText(/first letter/i);
  //   const buttonSearch = screen.getByTestId('search-top-btn');
  //   userEvent.click(buttonSearch);
  //   const inputField = screen.queryByPlaceholderText(/search/i);
  //   userEvent.click(firstLetter);
  //   userEvent.type(inputField, 'e');
  //   const searchButton = screen.getByRole('button', {
  //     name: /buscar/i
  //   })
  //   userEvent.click(searchButton);
  //   const etonMessSearch = await screen.findByText(/Eton Mess/i);
  //   const etonMessImg = await screen.findByTestId('0-card-img');
  //   expect(etonMessSearch).toBeInTheDocument();
  //   expect(etonMessImg).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/uuxwvq1483907861.jpg');
  // });
})