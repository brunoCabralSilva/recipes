import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const copy = require('clipboard-copy');

jest.mock('clipboard-copy');

describe('teste na pagina em progresso', () => {
  afterEach(() => jest.restoreAllMocks());

  it('deve renderizar o componente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods')
  
    await waitFor(
      () => {
        const corbaRecipe = screen.getByTestId('0-recipe-card');
        userEvent.click(corbaRecipe);
      },
      { timeout: 4000 },
    );

    const continueRecipeBtn = screen.getByTestId('start-recipe-btn');
    expect(continueRecipeBtn).toBeInTheDocument();
    userEvent.click(continueRecipeBtn);

    const recipeImg = await screen.findByTestId('recipe-photo');
    const recipeTitle = screen.getByTestId('recipe-title');
    const buttonShare = screen.getByTestId('share-btn');
    const buttonFavorites = screen.getByTestId('favorite-btn');
    const recipeCategory = screen.getByTestId('recipe-category');
    const instructions = screen.getByTestId('instructions');
    const buttonFinish = screen.getByRole('button', {
      name: /finalizar/i,
    });

    expect(recipeImg).toBeInTheDocument();
    expect(recipeTitle).toBeInTheDocument();
    expect(buttonShare).toBeInTheDocument();
    expect(buttonFavorites).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(buttonFinish).toBeInTheDocument();
  });

  it(`Testando se ao clicar no  botão Share 
  a mensagem "Link copied!" é renderizada para a página de comidas`, async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);
    history.push('/foods')

    await waitFor(
      () => {
        const corbaRecipe = screen.getByTestId('0-recipe-card');
        userEvent.click(corbaRecipe);
      },
      { timeout: 4000 },
    );

    const buttonShare = screen.getByTestId('share-btn');
    expect(buttonShare).toBeInTheDocument();
    const mensages = screen.queryByText(/Link copied/i);
    expect(mensages).not.toBeInTheDocument();
    userEvent.click(buttonShare);
    expect(copy).toHaveBeenCalled();

    const mensage = screen.queryByText(/Link copied/i);
    expect(mensage).toBeInTheDocument();
  });

 it(`Testando se o Botão de finalizar receita
      só é Habilitado após todos os check-Box serem preenchidos`, async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);
    history.push('/foods')

    await waitFor(
      () => {
        const corbaRecipe = screen.getByTestId('0-recipe-card');
        userEvent.click(corbaRecipe);
      },
      { timeout: 4000 },
    );

    const continueRecipeBtn = screen.getByTestId('start-recipe-btn');
    expect(continueRecipeBtn).toBeInTheDocument();
    userEvent.click(continueRecipeBtn);

    const checkBox1 = await screen.findByTestId('Lentils');
    const checkBox2 = await screen.findByTestId('Onion');
    const checkBox3 = await screen.findByTestId('Carrots');
    const checkBox4 = await screen.findByTestId('Tomato Puree');
    const checkBox5 = await screen.findByTestId('Cumin');
    const checkBox6 = await screen.findByTestId('Paprika');
    const checkBox7 = await screen.findByTestId('Mint');
    const checkBox8 = await screen.findByTestId('Thyme');
    const checkBox9 = await screen.findByTestId('Black Pepper');
    const checkBox10 = await screen.findByTestId('Red Pepper Flakes');
    const checkBox11 = await screen.findByTestId('Vegetable Stock');
    const checkBox12 = await screen.findByTestId('Water');
    const checkBox13 = await screen.findByTestId('Sea Salt');

    expect(checkBox1).toBeInTheDocument();
    expect(checkBox2).toBeInTheDocument();
    expect(checkBox3).toBeInTheDocument();
    expect(checkBox4).toBeInTheDocument();
    expect(checkBox5).toBeInTheDocument();
    expect(checkBox6).toBeInTheDocument();
    expect(checkBox7).toBeInTheDocument();
    expect(checkBox8).toBeInTheDocument();
    expect(checkBox9).toBeInTheDocument();
    expect(checkBox10).toBeInTheDocument();
    expect(checkBox11).toBeInTheDocument();
    expect(checkBox12).toBeInTheDocument();
    expect(checkBox13).toBeInTheDocument();
    
    const buttonFinish = screen.getByTestId('finish-recipe-btn');
    expect(buttonFinish).toBeInTheDocument();
    expect(buttonFinish).toBeDisabled();

    userEvent.type(checkBox1);
    userEvent.type(checkBox2);
    userEvent.type(checkBox3);
    userEvent.type(checkBox4);
    userEvent.type(checkBox5);
    userEvent.type(checkBox6);
    userEvent.type(checkBox7);
    userEvent.type(checkBox8);
    userEvent.type(checkBox9);
    userEvent.type(checkBox10);
    userEvent.type(checkBox11);
    userEvent.type(checkBox12);
    userEvent.type(checkBox13);
    
    expect(buttonFinish).not.toBeDisabled();

    userEvent.click(buttonFinish);

    const doneRecipesTitle = screen.getByRole('heading', {
      name: /done recipes/i,
    });

    expect(doneRecipesTitle).toBeInTheDocument();
    
  });

  it('Deve ser possível marcar ingredientes como concluídos e devem permanecer marcados entre reloads', async () => {
    const { history } = renderWithRouter(<App />);
    history.push("/foods");

    await waitFor(
      () => {
        const corbaRecipe = screen.getByTestId('0-recipe-card');
        userEvent.click(corbaRecipe);
      },
      { timeout: 4000 },
    );

    const continueRecipeBtn = screen.getByTestId('start-recipe-btn');
    expect(continueRecipeBtn).toBeInTheDocument();
    userEvent.click(continueRecipeBtn);

    let ingredients;
    await waitFor(() => {
      ingredients = screen.getAllByTestId(/-ingredient-step/i)
    })

    expect(ingredients).toHaveLength(13)

    history.push("/");
    history.push("/foods/52977/in-progress");

    await waitFor(() => {
      ingredients = screen.getAllByTestId(/-ingredient-step/i)
    })

    expect(ingredients).toHaveLength(13)

    ingredients.forEach((el) => {
      expect(el.firstChild).toBeChecked()
    })
  })

  it(`Testando se o Botão de finalizar receita
      só é Habilitado após todos os check-Box serem preenchidos`, async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);
    history.push('/drinks')

    await waitFor(
      () => {
        const ggRecipe = screen.getByTestId('0-recipe-card');
        userEvent.click(ggRecipe);
      },
      { timeout: 4000 },
    );

    const continueRecipeBtn = screen.getByTestId('start-recipe-btn');
    expect(continueRecipeBtn).toBeInTheDocument();
    userEvent.click(continueRecipeBtn);

    const checkBoxGaliano = await screen.findByTestId('Galliano');
    const checkBoxGingerAle = await screen.findByTestId('Ginger ale');
    const checkBoxIce = await screen.findByTestId('Ice');

    expect(checkBoxGaliano).toBeInTheDocument();
    expect(checkBoxGingerAle).toBeInTheDocument();
    expect(checkBoxIce).toBeInTheDocument();

    const buttonFinish = screen.getByTestId('finish-recipe-btn');
    expect(buttonFinish).toBeInTheDocument();
    expect(buttonFinish).toBeDisabled();

    userEvent.type(checkBoxGaliano);
    userEvent.type(checkBoxGingerAle);
    userEvent.type(checkBoxIce);

    expect(buttonFinish).not.toBeDisabled();

    userEvent.click(buttonFinish);

    const doneRecipesTitle = screen.getByRole('heading', {
      name: /done recipes/i,
    });

    expect(doneRecipesTitle).toBeInTheDocument();
  });

  it(`Testando se ao clicar no  botão Favorites 
  a a receita é marcada como favoritada`, async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);
    history.push('/foods/52977/in-progress')

    const buttonFavoritesWhiteHeart = await screen.findByTestId('favorite-btn');
    expect(buttonFavoritesWhiteHeart).toBeInTheDocument();

    userEvent.click(buttonFavoritesWhiteHeart);

    const LocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(LocalStorage).toHaveLength(1);

    userEvent.click(buttonFavoritesWhiteHeart);

    const LocalStorage2 = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(LocalStorage2).toHaveLength(0);

    expect(buttonFavoritesWhiteHeart).toBeInTheDocument();
  });

  it(`Testando se ao clicar no  botão Favorites 
  a a receita é marcada como favoritada`, async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);
    history.push('/foods')

    await waitFor(
      () => {
        const corbaRecipe = screen.getByTestId('0-recipe-card');
        userEvent.click(corbaRecipe);
      },
      { timeout: 4000 },
    );

    const continueRecipeBtn = screen.getByTestId('start-recipe-btn');
    expect(continueRecipeBtn).toBeInTheDocument();
    userEvent.click(continueRecipeBtn);

    const buttonFavoritesWhiteHeart = await screen.findByTestId('favorite-btn');

    expect(buttonFavoritesWhiteHeart).toBeInTheDocument();

    /* userEvent.click(buttonFavoritesWhiteHeart);

    const buttonFavoritesBlackHeart = screen.getByRole('button', {
      name: /blackhearticon/i,
    });

    expect(buttonFavoritesBlackHeart).toBeInTheDocument();

    userEvent.click(buttonFavoritesWhiteHeart);
    expect(buttonFavoritesWhiteHeart).toBeInTheDocument(); */
  });

  it('Testando os botao de favorite e share', async () => {
    global.fetch = fetch
    const { history } = renderWithRouter(<App />);
    window.document.execCommand = ((param1) => param2 => console.log(param1, param2))

    history.push('foods/52771/in-progress');

    const title = await screen.findByText('Spicy Arrabiata Penne');
    expect(title).toBeInTheDocument();

    const btnComp = screen.getByTestId('share-btn');
    expect(btnComp).toBeInTheDocument();
    const alertMessage = screen.queryByText(/Link copied!/i);
    expect(alertMessage).toBeNull();

    userEvent.click(btnComp);
    const alertMessage1 = screen.getByText(/Link copied!/i);
    expect(alertMessage1).toBeInTheDocument();

    const favCheck = screen.getByTestId('favorite-btn')
    expect(favCheck).toBeInTheDocument();
    expect(favCheck.innerHTML).toBe('<img src=\"whiteHeartIcon.svg\" alt=\"botão favoritar/desfavoritar\">');

    userEvent.click(favCheck);
    expect(favCheck.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"botão favoritar/desfavoritar\">');

    userEvent.click(favCheck);
    expect(favCheck.innerHTML).toBe('<img src=\"whiteHeartIcon.svg\" alt=\"botão favoritar/desfavoritar\">');

    userEvent.click(favCheck);

    history.push('foods/52771/in-progress');

    expect(favCheck.innerHTML).toBe('<img src=\"blackHeartIcon.svg\" alt=\"botão favoritar/desfavoritar\">');

  });

  it(`Testando se ao clicar no  botão Favorites 
  é enviado para o localStorage`, async () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);
    history.push('/foods/52977/in-progress')

    const checkBox1 = await screen.findByTestId('Lentils');
    const checkBox2 = await screen.findByTestId('Onion');
    const checkBox3 = await screen.findByTestId('Carrots');
    const checkBox4 = await screen.findByTestId('Tomato Puree');
    const checkBox5 = await screen.findByTestId('Cumin');
    const checkBox6 = await screen.findByTestId('Paprika');
    const checkBox7 = await screen.findByTestId('Mint');
    const checkBox8 = await screen.findByTestId('Thyme');
    const checkBox9 = await screen.findByTestId('Black Pepper');
    const checkBox10 = await screen.findByTestId('Red Pepper Flakes');
    const checkBox11 = await screen.findByTestId('Vegetable Stock');
    const checkBox12 = await screen.findByTestId('Water');
    const checkBox13 = await screen.findByTestId('Sea Salt');

    expect(checkBox1).toBeInTheDocument();
    expect(checkBox2).toBeInTheDocument();
    expect(checkBox3).toBeInTheDocument();
    expect(checkBox4).toBeInTheDocument();
    expect(checkBox5).toBeInTheDocument();
    expect(checkBox6).toBeInTheDocument();
    expect(checkBox7).toBeInTheDocument();
    expect(checkBox8).toBeInTheDocument();
    expect(checkBox9).toBeInTheDocument();
    expect(checkBox10).toBeInTheDocument();
    expect(checkBox11).toBeInTheDocument();
    expect(checkBox12).toBeInTheDocument();
    expect(checkBox13).toBeInTheDocument();
    
    const buttonFinish = screen.getByTestId('finish-recipe-btn');
    expect(buttonFinish).toBeInTheDocument();
    // expect(buttonFinish).toBeDisabled();

    userEvent.type(checkBox1);
    userEvent.type(checkBox2);
    userEvent.type(checkBox3);
    userEvent.type(checkBox4);
    userEvent.type(checkBox5);
    userEvent.type(checkBox6);
    userEvent.type(checkBox7);
    userEvent.type(checkBox8);
    userEvent.type(checkBox9);
    userEvent.type(checkBox10);
    userEvent.type(checkBox11);
    userEvent.type(checkBox12);
    userEvent.type(checkBox13);
    
    // expect(buttonFinish).not.toBeDisabled();

    userEvent.click(buttonFinish);

    const LocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(LocalStorage).toHaveLength(3);
  });

    
})