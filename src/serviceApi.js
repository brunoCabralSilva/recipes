const mealDb = async (link) => {
  const fetchApi = await fetch(`www.themealdb.com/api/json/v1/1/${link}`);
  return fetchApi;
};

const cockTailDb = async (link) => {
  const fetchApi = await fetch(`www.thecocktaildb.com/api/json/v1/1/${link}`);
  const fetchJson = await fetchApi.json();
  return fetchJson;
};

const data = { mealDb, cockTailDb };

export default data;
