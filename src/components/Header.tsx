import { useContext } from 'react';
import Nav from './Nav';
import SliderHeader from './SliderHeader';
import imageFoods from '../data/foods.json';
import imageDrinks from '../data/drinks.json';
import contextRecipes from '../contextRecipes/context';

interface HeaderProps {
  toggleRecipe: boolean,
};

export default function Header(props: HeaderProps) {
  const { typeOfList } = useContext(contextRecipes);
  const { toggleRecipe } = props;
  return (
    <header className="flex flex-col w-full z-50">
      <div className="flex flex-row justify-between items-center p-2 w-full h-14">
        <img
          src={require(`../images/icons/play.png`)}   
          className="pl-2 h-10 z-50"
          alt="icon food"
        /> 
        <Nav />
      </div>
      {
        typeOfList === 'foods'
          ? <SliderHeader list={ imageFoods } toggleRecipe={toggleRecipe} />
          : <SliderHeader list={ imageDrinks } toggleRecipe={toggleRecipe} />
      }
    </header>
  );
}