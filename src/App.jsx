import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../src/components/ui/SearchBar.jsx";
import RecipeList from "../src/components/ui/RecipeList.jsx";
import RecipeModal from "../src/components/ui/RecipeModal.jsx";
import Loader from "../src/components/ui/Loader.jsx";
import ErrorBox from "../src/components/ui/ErrorBox.jsx";
import Navbar from "./components/ui/Navbar.jsx";
import FeaturedRecipes from "./components/ui/FeaturedRecipes.jsx";
import QuickRecipesSection from "./components/ui/QuickRecipesSection.jsx";
import PopularFoodSection from "./components/ui/PopularFoodSection.jsx";
import CategoryGrid from "./components/ui/CategoryGrid.jsx";
import AboutSection from "./components/ui/AboutSection.jsx";
import VerticalCarousel from "./components/ui/VerticalCarousel.jsx";
import recipeSlides from "./components/ui/SearchBar.jsx";
import CuisineSelect from "./components/ui/CuisineSelect.jsx";
import TimeSelect from "./components/ui/TimeSelect.jsx";

const TIME_RANGE = {
  short: [0, 30],
  medium: [30, 60],
  long: [60, 200],
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [activeSection, setActiveSection] = useState("home");

  // For TIME > CUISINE > RECIPES flow
  const [step, setStep] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const resultRef = useRef(null);

  // -------------------------
  // SEARCH (ingredient-based)
  // -------------------------
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setActiveSection("results");
    await fetchByIngredient(query);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  useEffect(() => {
    if (vegOnly) {
      fetchByIngredient("");
    }
  }, [vegOnly]);

  async function fetchByIngredient(query) {
    setError(null);
    setLoading(true);
    setRecipes(null);
    setActiveSection("results");

    try {
      let json = null;

      let res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
          query
        )}`
      );
      json = await res.json();

      if (!json.meals) {
        res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
            query
          )}`
        );
        json = await res.json();
      }

      setRecipes(json.meals || []);
      if (!json.meals) setError(`No recipes found for “${query}”.`);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  }

  // -------------------------
  // CATEGORY (Chinese, Indian...)
  // -------------------------
  const handleCategorySelect = async (type, value) => {
    setActiveSection("results");
    setFilterValue(value);
    setError(null);
    setLoading(true);

    try {
      let url = "";

      if (type === "area") {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
      } else if (type === "ingredient") {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
      }

      const res = await fetch(url);
      const json = await res.json();

      setRecipes(json.meals || []);
      if (!json.meals) setError(`No recipes found for “${value}”.`);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // RECIPE DETAILS MODAL
  // -------------------------
  async function openRecipeDetails(id) {
    setSelectedRecipe({ loading: true });
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const res = await fetch(url);
      const json = await res.json();
      setSelectedRecipe(json.meals ? json.meals[0] : null);
    } catch {
      setSelectedRecipe(null);
      setError("Could not load recipe details.");
    }
  }

  // -------------------------
  // TIME → CUISINE → RECIPES FLOW
  // -------------------------
  const handleTimeSelect = (timeKey) => {
    setSelectedTime(timeKey); // "short" | "medium" | "long"
    setStep(2);
  };

  const handleCuisineSelect = async (cuisine) => {
    setSelectedCuisine(cuisine);
    setStep(3);

    // load cuisine recipes first
    setLoading(true);

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
    );
    const json = await res.json();
    const list = json.meals || [];

    // apply time filter
    const [min, max] = TIME_RANGE[selectedTime];
    const filtered = list.filter((meal) => {
      const approxTime = meal.strMeal.length; // fake cooking time
      return approxTime >= min && approxTime <= max;
    });

    setRecipes(filtered);
    setLoading(false);
  };

  return (
    <div>
      {/* TOP NAV */}
      <Navbar
        onSelect={(category) => {
          const areaList = ["Chinese", "Italian", "Indian", "Mexican"];
          const type = areaList.includes(category) ? "area" : "category";
          handleCategorySelect(type, category);
        }}
      />

      <main className="max-w-10xl mx-auto">
        {/* SEARCH BAR SECTION */}
        <section id="search-section">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={() => handleSearch(searchQuery)}
            vegOnly={vegOnly}
            setVegOnly={setVegOnly}
          />

          <VerticalCarousel items={recipeSlides} />
        </section>

        {/* HOME SECTIONS */}
        {activeSection === "home" && (
          <>
            <CategoryGrid handleCategorySelect={handleCategorySelect} />

            <section id="featured-section" className="mt-16">
              <FeaturedRecipes
                onCategorySelect={handleCategorySelect}
                onSearchIngredient={(ingredient) =>
                  fetchByIngredient(ingredient)
                }
                resultRef={resultRef}
              />

              {/* TIME → CUISINE → RECIPES UI */}
              <div className="mt-10">
                {step === 1 && <TimeSelect onSelect={handleTimeSelect} />}
                {step === 2 && <CuisineSelect onSelect={handleCuisineSelect} />}
                {step === 3 && (
                  <RecipeList
                    recipes={recipes || []}
                    onSelect={(id) => openRecipeDetails(id)}
                  />
                )}
              </div>
            </section>

            <section id="quick-section">
              <QuickRecipesSection
                onRecipeSelect={(meal) => setSelectedRecipe(meal)}
              />
            </section>

            <PopularFoodSection
              onRecipeSelect={(meal) => setSelectedRecipe(meal)}
            />

            <AboutSection />
          </>
        )}

        {/* RESULTS SECTION */}
        {activeSection === "results" && (
          <div ref={resultRef} className="mt-6">
            {filterValue && (
              <h2 className="text-center text-xl font-semibold mb-4">
                Showing recipes for: {filterValue || searchQuery}
              </h2>
            )}

            {loading && <Loader />}
            {error && (
              <ErrorBox
                message={error}
                onRetry={() => fetchByIngredient(searchQuery)}
              />
            )}

            {!loading && recipes && recipes.length > 0 && (
              <RecipeList
                recipes={recipes}
                onSelect={(id) => openRecipeDetails(id)}
              />
            )}
          </div>
        )}
      </main>

      {/* RECIPE MODAL */}
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}

      {/* BACK TO HOME BUTTON */}
      {activeSection === "results" && (
        <div className="text-center my-6">
          <button
            onClick={() => setActiveSection("home")}
            className="text-orange-600 hover:text-orange-800 underline"
          >
            ← Back to Home
          </button>
        </div>
      )}

      <footer className="py-6 text-center bg-gray-900 text-sm text-gray-500">
        Built for Taylor — quick inspiration in the kitchen.
      </footer>
    </div>
  );
}
