import { useContext, useEffect } from 'react';
import Item from './Item';
import contextRecipes from '../contextRecipes/context';

export default function SliderContent() {
  const context = useContext(contextRecipes);
  const {
    filterCat,
    setListApi,
    fixedList
  } = context;

  useEffect(() => {
    setListApi(fixedList);
  }, []);

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
          (!filterCat || filterCat.length === 0) && (!fixedList || fixedList.length === 0)
          ? <div className="h-screen" />
          : filterCat && filterCat.length > 0
            ? handleCategoryFilter(filterCat)
            : handleCategoryFilter(fixedList)
        }
      </div>
    </div>
  );
}