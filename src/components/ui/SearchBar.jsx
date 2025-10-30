import React from "react";
import Recipebg from "../../assets/recipe-pic-2.jpg";

export default function SearchBar({ value, onChange, onSearch, vegOnly, setVegOnly }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div id="search-bar">
    <div className="
         relative flex flex-col items-center justify-center text-center
        w-full
        min-h-[70vh] sm:min-h-[80vh] md:min-h-[80vh]
        bg-cover bg-center bg-no-repeat
        px-4 sm:px-10 md:px-20 lg:px-32
        overflow-hidden
      "

      style={{
        backgroundImage: `url(${Recipebg})`,
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Search content */}
      <div className="relative z-10 max-w-xl w-70rem px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Find Delicious Recipes 
        </h1>
        <p className="text-gray-200 mb-6">
          Search by ingredient, cuisine, or dish type.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type ingredient — e.g. chicken, tomato..."
            className="flex-1 px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={onSearch}
            className="px-5 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-200">
          <label className="flex items-center gap-2 mb-2 sm:mb-0">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            Vegetarian only
          </label>
          <p>Try: <span className="italic">Biryani, Pizza, Pasta, Salad</span></p>
        </div>
      </div>
    </div>
    </div>
  );
}
