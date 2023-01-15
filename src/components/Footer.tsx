import React from 'react'

export default class Footer extends React.Component {
  render() {
    return(
      <footer className="bg-black text-white p-0 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center my-4 sm:my-0">
          <img
            src={require('../images/icons/foods.white.png')}
            className="ml-0 sm:ml-3 h-10 w-10"
            alt="food"
          />
          <img
            src={require('../images/icons/drink.white.png')}
            className="ml-3 h-8 w-8"
            alt="drink"
          />
        </div>
        <div className="sm:w-3/4 p-3 sm:pr-6">
          <p className="text-center sm:text-right w-full">
            © 2022 Copyright - Bruno Gabryell Cabral da Silva
          </p>
        </div>
      </footer>
    );
  }
}