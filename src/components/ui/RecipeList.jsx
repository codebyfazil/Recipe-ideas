import React from "react";

export default function RecipeList({ recipes = [], onSelect }) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <section className="mt-10 px-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        🍽️ Top Recipes For You
      </h2>

      {/* ✅ Responsive Grid (1–2–3 layout) */}
      <div
        className="
          max-w-6xl mx-auto 
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-6 
          justify-items-center
        "
      >
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="
              bg-linear-to-br from-gray-50 to-gray-100
              border border-gray-200 
              rounded-2xl shadow-sm 
              hover:shadow-2xl 
              transition-all duration-500 
              transform hover:-translate-y-1 hover:scale-[1.02] 
              overflow-hidden 
              w-[230px] sm:w-[250px] lg:w-[280px]
              flex flex-col
              h-80
            "
          >
            {/* Image */}
            <div className="w-full h-40 overflow-hidden">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between flex-1 text-center">
              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-1 truncate">
                  {recipe.strMeal}
                </h3>
                <p className="text-gray-500 text-xs">
                  {recipe.strCategory
                    ? `${recipe.strCategory} • ${recipe.strArea || "World"}`
                    : "Delicious meal idea"}
                </p>
              </div>

              <button
                onClick={() => onSelect(recipe.idMeal)}
                className="
                  mt-2 w-full 
                  bg-orange-500 hover:bg-orange-600 
                  text-white font-medium 
                  py-2 rounded-lg 
                  text-sm
                  transition-all duration-300 
                  shadow-sm hover:shadow-md
                "
              >
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
