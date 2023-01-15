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