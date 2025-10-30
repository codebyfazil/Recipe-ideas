import React from "react";

export default function RecipeCard({ recipe, onSelect }) {
  return (
    <div
      className="
        bg-linear-to-br from-gray-50 to-gray-100
        rounded-2xl shadow-sm 
        hover:shadow-2xl transition-all duration-500 
        transform hover:-translate-y-1 hover:scale-[1.02]
        overflow-hidden w-[300px] sm:w-[340px] md:w-[360px]
        flex flex-col
      "
    >
      {/* Image */}
      <div className="w-full h-56 overflow-hidden">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2">
          {recipe.strMeal}
        </h3>
        <button
          onClick={() => onSelect(recipe.idMeal)}
          className="
            bg-orange-500 hover:bg-orange-600 
            text-white font-medium py-2 px-6 
            rounded-lg w-full 
            transition-all duration-300 shadow-sm hover:shadow-md
          "
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}
