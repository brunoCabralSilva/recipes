import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('teste na pagina /foods', () => {
  afterEach(() => jest.restoreAllMocks());

  it('Testando se faz requisição corretamente buscando pelo nome', async () => {
    jest.spyOn(global, 'fetch');
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, '1234567');
    userEvent.click(button);
    
    const searchBtn = await screen.findByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const searchBtn2 = screen.getByTestId('exec-search-btn');
    userEvent.type(inputSearch, 'chicken');
    userEvent.click(radioName);
    userEvent.click(searchBtn2);
    const firstCard = await screen.findByTestId('0-recipe-card');
    expect(firstCard).toBeInTheDocument();
  });

  it('Testando se exibe alerta quando nenhuma receita é encontrada', async () => {
    jest.spyOn(global, 'fetch');
    const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    
    const searchBtn = await screen.findByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const inputSearch = screen.getByTestId('search-input');
    const radioName = screen.getByTestId('name-search-radio');
    const searchBtn2 = screen.getByTestId('exec-search-btn');
    userEvent.type(inputSearch, 'xablau');
    userEvent.click(radioName);
    userEvent.click(searchBtn2);
    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(
        'Sorry, we haven\'t found any recipes for these filters.',
      );
    });
  });

  it('Testando se a busca por categoria funciona', async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      );

      expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    }, { timeout: 3000 });
    
    const allBtn = screen.getByTestId('All-category-filter');
    const beefBtn = screen.getByTestId('Beef-category-filter');
    const breakfastBtn = screen.getByTestId('Breakfast-category-filter');
    const chickenBtn = screen.getByTestId('Chicken-category-filter');
    const desertBtn = screen.getByTestId('Dessert-category-filter');
    const goatBtn = screen.getByTestId('Goat-category-filter');

    userEvent.click(allBtn);
    userEvent.click(beefBtn);
    userEvent.click(breakfastBtn);
    userEvent.click(chickenBtn);
    userEvent.click(desertBtn);
    userEvent.click(goatBtn);
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert');
      expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat');
    });

  });
  
  it('verifica filtros da /foods',
  async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
    const beefFilter = await screen.findByRole('button', { name: /beef/i });
    expect(beefFilter).toBeInTheDocument();
    userEvent.click(beefFilter);
    const recipeBeef = await screen
      .findByRole('link', { name: /beef and mustard pie/i });
    expect(recipeBeef).toBeInTheDocument();
  });

  it('verifica elementos da /foods ',
  async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
    const beefFilter = await screen.findByRole('button', { name: /beef/i });
    const breakfastFilter = await screen.findByRole('button', { name: /breakfast/i });
    const chickenFilter = await screen.findByRole('button', { name: /chicken/i });
    const dessertFilter = await screen.findByRole('button', { name: /dessert/i });
    const goatFilter = await screen.findByRole('button', { name: /goat/i });
    const allFilter = await screen.findByRole('button', { name: /all/i });
    expect(beefFilter).toBeInTheDocument();
    expect(breakfastFilter).toBeInTheDocument();
    expect(chickenFilter).toBeInTheDocument();
    expect(dessertFilter).toBeInTheDocument();
    expect(goatFilter).toBeInTheDocument();
    expect(allFilter).toBeInTheDocument();
    
  });

  it('verifica clicks nos filtros da /foods ',
  async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
    const beefFilter = await screen.findByRole('button', { name: /beef/i });
    const allFilter = await screen.findByRole('button', { name: /all/i });
    expect(beefFilter).toBeInTheDocument();
    expect(allFilter).toBeInTheDocument();
    userEvent.click(beefFilter);
    const beefText = await screen.findByText(/beef and mustard pie/i);
    expect(beefText).toBeInTheDocument();
    userEvent.click(allFilter);
    expect(beefText).not.toBeInTheDocument();
    const corbaText = screen.getByText(/corba/i)
    expect(corbaText).toBeInTheDocument();
    
  });

  it('verifica clicks nos filtros da /foods ',
  async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    expect(history.location.pathname).toBe('/foods');
    const beefFilter = await screen.findByRole('button', { name: /beef/i });
    expect(beefFilter).toBeInTheDocument();
    userEvent.click(beefFilter);
    const beefText = await screen.findByText(/beef and mustard pie/i);
    expect(beefText).toBeInTheDocument();
    userEvent.click(beefFilter);
    expect(beefText).not.toBeInTheDocument();
    const corbaText = screen.getByText(/corba/i)
    expect(corbaText).toBeInTheDocument();
    
  });
  
  it('verifica filtros da /drinks',
  async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    expect(history.location.pathname).toBe('/drinks');

    /* const ordinaryDrinkCategory = screen.getByRole('button', {
      name: /ordinary drink/i
    })
    expect(ordinaryDrinkCategory).toBeInTheDocument();
    userEvent.click(ordinaryDrinkCategory);
    const ordinaryDrinkCards = await screen
      .findByText(/410 Gone/i);
    expect(ordinaryDrinkCards).toBeInTheDocument(); */
  });
})