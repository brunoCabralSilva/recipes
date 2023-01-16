import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from "./Footer";
import Header from "./Header";
import { motion } from "framer-motion";
import Item from './Item';
import { VscError } from "react-icons/vsc";

export default function Search() {
  const [endPoint, setEndPoint] = useState({
    typeOfSearch: '',
    endpoint: '',
  });
  const [listDrinksFounded, setDrinksListFounded] = useState([{}]);
  const [listFoodsFounded, setFoodsListFounded] = useState([{}]);
  const [inputSearch, setInputSearch] = useState('');
  const [message, setMessage] = useState(false);
  const history = useHistory();

const search = async () => {
  setDrinksListFounded([{}]);
  setFoodsListFounded([{}]);
  if (endPoint.typeOfSearch === '' && endPoint.endpoint === '') {
    setMessage(true);
  } else {
    const fetchApiDrinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/${endPoint.endpoint}${inputSearch}`);
    const fetchJsonDrinks = await fetchApiDrinks.json();
    const fetchApiFoods = await fetch(`https://www.themealdb.com/api/json/v1/1/${endPoint.endpoint}${inputSearch}`);
    const fetchJsonFoods = await fetchApiFoods.json();
    if (fetchJsonDrinks.drinks !== null) {
      setDrinksListFounded([...listDrinksFounded, ...fetchJsonDrinks.drinks]);
      setMessage(false);
    } else {
    }
    if (fetchJsonFoods.meals !== null) {
      setFoodsListFounded([...listFoodsFounded, ...fetchJsonFoods.meals]);
      setMessage(false);
    } else {
    }
    setInputSearch('');
    setEndPoint({
      typeOfSearch: '',
      endpoint: '',
    });
  }
}
  return(
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.5,
        duration: 1,
      }}
      exit={{ opacity: 0.5, transition: { duration: 0.3 } }}
    >
      <Header toggleRecipe={false} />
      <p className="mt-10 p-4 md:ml-10 sm:p-0 text-4xl text-left">
        Search
      </p>
      <div className="flex flex-col items-start">
        <div className="flex flex-col rounded-full justify-center items-start sm:justify-around w-full md:w-full my-1">
          <div className="flex flex-wrap my-8 md:pl-5 ml-4">
            <button
              type="button"
              onClick={ () => setEndPoint({ typeOfSearch: 'ingredient', endpoint:'filter.php?i=' }) }
              className={`border border-black ${endPoint.typeOfSearch === 'ingredient' ? 'bg-gradient-to-r from-orange-500 to-red-600 bg-white border font-bold border-white text-white ' : ''} rounded-full px-5 py-3 mx-1 mt-4 sm:mt-0`}
            >
              Ingredient
            </button>
            <button
              type="button"
              onClick={ () => setEndPoint({ typeOfSearch: 'nameInput', endpoint:'search.php?s=' })}
              className={`border border-black ${endPoint.typeOfSearch === 'nameInput' ? 'bg-gradient-to-r from-orange-500 to-red-600 bg-white border font-bold border-white text-white ' : ''} rounded-full px-5 py-3 mx-1 mt-4 sm:mt-0`}
            >
              Name
            </button>
            <button
              type="button"
              onClick={ () => setEndPoint({ typeOfSearch:'firstLetter', endpoint:'search.php?f=' }) }
              className={`border border-black ${endPoint.typeOfSearch === 'firstLetter' ? 'bg-gradient-to-r from-orange-500 to-red-600 bg-white border font-bold border-white text-white ' : ''} rounded-full px-5 py-3 mx-1 mt-4 sm:mt-0`}
            >
              First letter
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-start md:pl-10 pl-5 w-11/12 sm:w-7/12 md:w-5/12 lg:w-4/12">
          <input
            type="text"
            data-testid="search-input"
            value={ inputSearch }
            onChange={ (e) => setInputSearch(e.target.value) }
            placeholder="Type here"
            className="w-full text-left text-lg my-6 mb-2 p-2 bg-transp border-b "
          />
          <button
            type="button"
            onClick={ search }
            className="w-full mt-12 mb-10 py-3 bg-white hover:border font-bold transition duration-1000 rounded-full border hover:bg-black hover:text-white hover:font-bold"
          >
            Search
          </button>
          </div>
          <div className="px-9 font-bold text-red-500 w-full mb-5">
          { message &&
          <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center w-full">
            <VscError className="mr-2 text-2xl mb-2 sm:mb-0" />
            <span>
              É necessário escolher um tipo de busca clicando em Ingredientes, Name or First Letter!
            </span>
          </div>
          }
        </div>
        <div className="md:ml-5">
          <div className="">
            { 
              listDrinksFounded.length > 1 && <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center w-full p-6">
                <p className="text-2xl lg:col-span-3 sm:col-span-2 col-span-1">Drinks</p>
                {
                  listDrinksFounded
                    .filter((element) => Object.keys(element).length > 0)
                    .map((item, index) => (
                      <Item
                        item={item}
                        index={index}
                        buttons={true}
                      />
                    ))
                }
              </div>
            }
            { 
              listFoodsFounded.length > 1 && <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center w-full p-6">
                <p className="text-2xl lg:col-span-3 sm:col-span-2 col-span-1">Foods</p>
                {
                  listFoodsFounded
                    .filter((element) => Object.keys(element).length > 0)
                    .map((item, index) => (
                      <Item
                        item={item}
                        index={index}
                        buttons={true}
                      />
                    ))
                }
              </div>
            }
            { message && listDrinksFounded.length === 1 && listFoodsFounded.length === 1 &&
              <p className="h-50vh mt-10 text-2xl lg:col-span-3 sm:col-span-2 col-span-1 px-5 md:px-0 ml-5">Sorry, we haven\'t found any recipes for these filters.</p>
            }
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}
