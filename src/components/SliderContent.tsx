import { useContext } from 'react';
import Item from './Item';
import contextRecipes from '../contextRecipes/context';

export default function SliderContent() {
  const {
    listOfItemsFromCat,
    fixedList,
  } = useContext(contextRecipes);

  const handleCategoryFilter = (list: any) => {
    const cat = list.slice(0, +'18').map((item: any, index: number) => (
      <Item
        item={item}
        index={index}
        buttons={false}
      />
    ));
    return cat;
  };

  return(
    <div className="flex flex-col justify-center">
      <div className="grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center w-full p-6">
        <div className="pb-5 shadow lg:col-span-3 sm:col-span-2">
          <p className="px-4 sm:px-16 p-4 text-4xl w-full text-left mx-auto" id="text">
            Welcome!
          </p>
          <p className="px-4 text-base sm:text-xl sm:px-16 p-4 w-full text-left mx-auto" id="text">
            The best Foods and Drinks for your day are here! To switch between drinks and food, in the upper right corner of the page you will find two icons.
          </p>
        </div>
        {
          (!listOfItemsFromCat || listOfItemsFromCat.length === 0) && (!fixedList || fixedList.length === 0)
          ? <div className="h-screen" />
          : listOfItemsFromCat && listOfItemsFromCat.length > 0
            ? handleCategoryFilter(listOfItemsFromCat)
            : handleCategoryFilter(fixedList)
        }
      </div>
    </div>
  );
}