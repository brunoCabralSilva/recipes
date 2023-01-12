import React from 'react';
import SearchBar from './SearchBar';

interface HeaderProps {
  title: string,
  icon: boolean,
  searchIcon: string,
};

export default function Header(props: HeaderProps) {
  const { title, icon } = props;

  return (
    <header className="flex flex-col w-full h-14 z-40">
      <div className="flex flex-row justify-between items-center p-2 w-full">
        <div className="flex items-center">
          {
            <img src={require(`../images/${title === "Foods" ? "icon_food.jpg" : "img-drinks.png"}`)} className="h-10" alt="icon food" /> 
          }
          <h1 data-testid="page-title" className="ml-5 text-black text-xl font-bold">
            { title }
          </h1>
        </div>
        <SearchBar />
        {/* <div>
          {
            searchIcon === 'visible'
              ? showSearchButton()
              : null
          }
          <button
            type="button"
            data-testid="profile-top-btn"
            onClick={ ProfileRedirect }
            className="p-2 ml-0 sm:mx-3"
          >
            <i className="fa-solid fa-user text-xl text-black"></i>
          </button> 
        </div> */}
      </div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-11/12 sm:w-3/5 md:w-2/5 items-center justify-center">
        </div>
      </div>
    </header>
  );
}