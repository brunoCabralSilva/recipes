// const [endPoint, setEndPoint] = useState({});
// const [inputSearch, setInputSearch] = useState('');
// const meal = 'www.themealdb';
// const cock = 'www.thecocktaildb';

// const {
//   typeOfList,
//   setListOfItemsFromCat,
// } = useContext(contextRecipes);

// const drinksFetch = (call: any) => {
//   const { drinks } = call;
//   if (Object.values(call).includes(null)) {
//     global.alert('Sorry, we haven\'t found any recipes for these filters.');
//   } else if (drinks.length === 1) {
//     setListOfItemsFromCat(call.drinks);
//     history.push(`/drinks/${drinks[0].idDrink}`);
//   } else {
//     setListOfItemsFromCat(call.drinks);
//   }
// };

// const foodsFetch = (call: any) => {
//   const { meals } = call;
//   if (Object.values(call).includes(null)) {
//     global.alert('Sorry, we haven\'t found any recipes for these filters.');
//   } else if (meals.length === 1) {
//     setListOfItemsFromCat(call.drinks);
//     history.push(`/foods/${meals[0].idMeal}`);
//   } else {
//     setListOfItemsFromCat(call.drinks);
//   }
// };

// const fetchApiFunc = async (end: any) => {
//   const fetchApi = await fetch(`https://${typeOfList === 'drinks' ? cock : meal}.com/api/json/v1/1/${end}${inputSearch}`);
//   const fetchJson = await fetchApi.json();
//   return fetchJson;
// }

// const search = async () => {
//   const end = Object.values(endPoint)[0];
//   if (Object.keys(endPoint).includes('firstLetter')) {
//     if (inputSearch.length > 1) {
//       global.alert('Your search must have only 1 (one) character');
//     } else {
//       const fetchDataFinal = await fetchApiFunc(end);
//       if (typeOfList === 'drinks') {
//         drinksFetch(fetchDataFinal);
//       } else {
//         foodsFetch(fetchDataFinal);
//       }
//     }
//   } else {
//     const fetchApi = await fetchApiFunc(end);
//     if (typeOfList === 'drinks') {
//       drinksFetch(fetchApi);
//     } else {
//       foodsFetch(fetchApi);
//     }
//   }
//   setInputSearch('');
// };