import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../pages/DoneRecipes';

describe('Teste na tela de receitas finalizadas', () => {
  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: null,
    },
  ];
  
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Elementos da DoneRecipes renderizados na tela:', async () => {
    renderWithRouter(<DoneRecipes />);
    
    const buttonFilterAll = screen.queryByTestId(/filter-by-all-btn/i);
    const buttonFilterFood = screen.queryByTestId(/filter-by-food-btn/i);
    const buttonFilterDrink = screen.queryByTestId(/filter-by-drink-btn/i);
    const recipeImage = screen.queryByTestId(/0-horizontal-image/i);
    const recipeName = screen.queryByTestId(/0-horizontal-name/i);
    const recipeDoneDate = screen.getAllByTestId(/0-horizontal-done-date/i);
    const recipeCategory = screen.queryByTestId(/0-horizontal-top-text/i);
    const recipeShare = screen.queryByTestId(/0-horizontal-share-btn/i);

    expect(buttonFilterAll).toBeInTheDocument();
    expect(buttonFilterFood).toBeInTheDocument();
    expect(buttonFilterDrink).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(recipeDoneDate).toBeDefined();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeShare).toBeInTheDocument();

  });
});