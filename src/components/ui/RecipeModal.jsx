import React, { useEffect } from "react";

function extractIngredients(meal) {
  if (!meal) return [];
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      list.push({ ingredient: ing, measure: measure || "" });
    }
  }
  return list;
}

export default function RecipeModal({ recipe, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!recipe) return null;

  // loading placeholder if we're using {loading: true}
  if (recipe.loading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-md shadow-md">Loading...</div>
      </div>
    );
  }

  const ingredients = extractIngredients(recipe);
  const youtubeId = recipe.strYoutube ? recipe.strYoutube.split("v=")[1] : null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Recipe details for ${recipe.strMeal}`}
    >
      <div className="bg-white max-w-3xl w-full rounded-md overflow-auto max-h-[90vh]">
        <div className="flex items-start justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-bold">{recipe.strMeal}</h2>
            <div className="text-sm text-gray-500">{recipe.strArea} • {recipe.strCategory}</div>
          </div>
          <button onClick={onClose} className="text-gray-600 px-3 py-1" aria-label="Close">
            ✕
          </button>
        </div>

        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full rounded-md" />
            <div className="mt-3">
              <h3 className="text-sm font-semibold">Ingredients</h3>
              <ul className="mt-2 text-sm space-y-1">
                {ingredients.map((it, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{it.ingredient}</span>
                    <span className="text-gray-500">{it.measure}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold">Instructions</h3>
            <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{recipe.strInstructions}</p>

            {youtubeId && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold">Video</h4>
                <div className="mt-2 aspect-video">
                  <iframe
                    title="recipe video"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full rounded-md"
                  />
                </div>
              </div>
            )}

            {recipe.strSource && (
              <p className="mt-4 text-sm">
                Source: <a href={recipe.strSource} className="text-indigo-600 underline" target="_blank" rel="noreferrer">Original</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
