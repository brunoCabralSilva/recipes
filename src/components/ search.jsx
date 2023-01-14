{/* <div className="flex flex-col w-10/12 mx-auto items-center h-screen">
<input
 type="text"
 data-testid="search-input"
 value={ inputSearch }
 onChange={ (e) => setInputSearch(e.target.value) }
 placeholder="Type here"
 className="text-center text-white mt-6 mb-2 w-full my-4 p-2 bg-transp border-b "
/>
<div className="flex flex-col rounded-full justify-center items-center sm:justify-around w-full md:w-full my-1">
<div className="flex flex-col">
 <label htmlFor="ingredient" className="w-full text-left my-1 p-1 flex justify-left rounded-full">
   <input
     type="radio"
     id="ingredient"
     name="option"
     data-testid="ingredient-search-radio"
     onClick={ () => setEndPoint({ ingredient: 'filter.php?i=' }) }
     className="m-2"
   />
   Ingredient
 </label>
 <label htmlFor="name" className="w-full text-left my-1 p-1 flex justify-left rounded-full">
   <input
     type="radio"
     id="name"
     name="option"
     data-testid="name-search-radio"
     onClick={ () => setEndPoint({ nameInput: 'search.php?s=' }) }
     className="m-2"
   />
   Name
 </label>
 <label htmlFor="letter" className="w-full text-left my-1 p-1 flex justify-left rounded-full">
   <input
     type="radio"
     id="letter"
     name="option"
     data-testid="first-letter-search-radio"
     onClick={ () => setEndPoint({ firstLetter: 'search.php?f=' }) }
     className="m-2"
   />
   First letter
 </label>
</div>
</div>
<a
href={inputSearch !== '' ? "#text": ''}
className="w-full"
>
<button
 type="button"
 onClick={ search }
 className="w-full md:w-full mt-2 py-2 bg-white hover:bg-black hover:border hover:border-white hover:text-white text-black font-bold transition duration-1000"
>
 Search
</button>
</a>
</div> */}