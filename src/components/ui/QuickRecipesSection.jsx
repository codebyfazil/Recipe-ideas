import React, { useEffect, useState } from "react";

// eslint-disable-next-line no-unused-vars
export default function QuickFoodSection({ onSelect, onRecipeSelect }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuickMeals() {
      try {
        // 🔍 Pick easy meals
        const keywords = ["sandwich", "pasta", "salad", "omelette"];
        const requests = keywords.map((q) =>
          fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
        );

        const responses = await Promise.all(requests);
        const data = await Promise.all(responses.map((r) => r.json()));

        // Pick the first valid result for each keyword
        const foundMeals = data
          .map((d) => d.meals && d.meals[0])
          .filter(Boolean)
          .slice(0, 4);

        setMeals(foundMeals);
      } catch (err) {
        console.error(" Error loading quick meals:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuickMeals();
  }, []);

  //  When clicked — fetch full details by ID
  async function handleMealClick(mealId) {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await res.json();
      if (data.meals && onRecipeSelect) {
        onRecipeSelect(data.meals[0]); // pass full recipe data to modal
      }
    } catch (err) {
      console.error("Failed to load recipe details:", err);
    }
  }

  if (loading)
    return (
      <p className="text-center text-gray-500 py-8 text-lg">
         Loading Quick Food Ideas...
      </p>
    );

  return (
    <section className="bg-white py-12">
      <h2 className="text-center text-3xl font-bold mb-10 text-gray-800">
         Quick Food Ideas
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 px-6">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            onClick={() => handleMealClick(meal.idMeal)}
            className="cursor-pointer group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-white"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="bg-orange-400 py-3 text-center font-semibold uppercase text-gray-900">
              {meal.strMeal.length > 25
                ? meal.strMeal.slice(0, 25) + "..."
                : meal.strMeal}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
