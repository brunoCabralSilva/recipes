    const fetchFoods = async () => {
      const resultApi = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const api = await resultApi.json();
      return api;
    }

    const fetchBtnFoods = async () => {
        const resultApi = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const api = await resultApi.json();
        return api;
     }

     const fetchDrinks = async () => {
      const resultApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const api = await resultApi.json();
      return api;
      }
  
    const fetchBtnDrinks = async () => {
      const resultApi = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const api = await resultApi.json();
      return api;
    }

    const reqCategoryDrink = async (category) => {
      const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await result.json();
      return data;
    }

    const reqCategoryFood = async (category) => {
      const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await result.json();
      return data;
    }

    const fetchs = { 
      fetchFoods,
      fetchBtnFoods,
      fetchDrinks,
      fetchBtnDrinks,
      reqCategoryDrink,
      reqCategoryFood
    };
    export default fetchs;
