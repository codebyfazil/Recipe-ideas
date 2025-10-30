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

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [vegOnly, setVegOnly] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const resultRef = useRef(null);

  // ✅ When user searches
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setActiveSection("results"); // 🔥 hide other sections
    await fetchByIngredient(query);
  };

  // ✅ Auto-fetch when "Veg Only" toggled
  useEffect(() => {
    if (vegOnly) {
      fetchByIngredient("");
    }
  }, [vegOnly]);

  async function fetchByIngredient(query) {
    setError(null);
    setLoading(true);
    setRecipes(null);
    setActiveSection("results"); // 👈 hide other sections

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

      if (json.meals) setRecipes(json.meals);
      else {
        setRecipes([]);
        setError(`No recipes found for “${query}”.`);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Fetch by Category or Area
  const handleCategorySelect = async (type, value) => {
    setActiveSection("results");
    setFilterValue(value);
    setLoading(true);
    setError(null);

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

      if (json.meals) {
        setRecipes(json.meals);
      } else {
        setRecipes([]);
        setError(`No recipes found for “${value}”.`);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Recipe Details
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

  return (
    <div>
      {/* ✅ Fixed Navbar */}
      <Navbar
        onSelect={(category) => {
          const areaList = ["Chinese", "Italian", "Indian", "Mexican"];
          const type = areaList.includes(category) ? "area" : "category";
          handleCategorySelect(type, category);
        }}
      />
      <div className="h-[60px]"></div> {/* Space below navbar */}
      <main className="max-w-10xl mx-auto px-4 py-6">
        {/* ✅ SearchBar always visible */}
       <section id="search-section">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={() => handleSearch(searchQuery)}
          vegOnly={vegOnly}
          setVegOnly={setVegOnly}
        />
        </section>

        {/* ✅ HOME SECTIONS */}
        {activeSection === "home" && (
          <>
            {/* 🟢 Category Grid */}
            <section id="category-section" className="bg-white py-16 mt-10">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-10">
                  Our Categories
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
                  {[
                    {
                      name: "Pizza",
                      img: "https://www.themealdb.com/images/category/pasta.png",
                    },
                    {
                      name: "Chicken",
                      img: "https://www.themealdb.com/images/category/chicken.png",
                    },
                    {
                      name: "Beef",
                      img: "https://www.themealdb.com/images/category/beef.png",
                    },
                    {
                      name: "Seafood",
                      img: "https://www.themealdb.com/images/category/seafood.png",
                    },
                    {
                      name: "Dessert",
                      img: "https://www.themealdb.com/images/category/dessert.png",
                    },
                    {
                      name: "Vegetarian",
                      img: "https://www.themealdb.com/images/category/vegetarian.png",
                    },
                    {
                      name: "Pasta",
                      img: "https://www.themealdb.com/images/category/pasta.png",
                    },
                    {
                      name: "Burgers",
                      img: "https://www.themealdb.com/images/category/beef.png",
                    },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        const areaList = [
                          "Chinese",
                          "Italian",
                          "Indian",
                          "Mexican",
                        ];
                        const type = areaList.includes(item.name)
                          ? "area"
                          : "category";
                        handleCategorySelect(type, item.name);
                      }}
                      className="
                        group 
                        bg-linear-to-br from-gray-50 to-gray-100 
                        border border-gray-200 
                        rounded-2xl 
                        shadow-sm 
                        hover:shadow-2xl 
                        transition-all 
                        duration-500 
                        transform 
                        hover:-translate-y-1 
                        hover:scale-[1.03] 
                        focus:outline-none 
                        flex flex-col 
                        items-center 
                        w-60 sm:w-[260px] lg:w-60 
                        h-[250px] sm:h-[270px] lg:h-[250px]
                        overflow-hidden 
                        relative
                      "
                    >
                      <div className="overflow-hidden w-full h-40">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Explore {item.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* ✅ Featured Recipes Section (separate from category grid) */}
            <section id="featured-section" className="mt-16">
              <FeaturedRecipes
                onCategorySelect={handleCategorySelect}
                onSearchIngredient={(ingredient) =>
                  fetchByIngredient(ingredient)
                }
                resultRef={resultRef}
              />
            </section>
            {/* ✅ Quick Food Section */}
            <section id="quick-section">
            <QuickRecipesSection
              onRecipeSelect={(meal) => setSelectedRecipe(meal)}
            />
            </section>

            <PopularFoodSection
              onRecipeSelect={(meal) => setSelectedRecipe(meal)}
            />

            {/* ✅ About Section */}
            <section
              id="recipes-section"
              className=" scroll-mt-24 bg-linear-to-br from-orange-200 via-white to-orange-300 py-20 px-6"
            >
              <div className="max-w-5xl mx-auto text-center">
                {/* Title Section */}
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  About <span className="text-orange-0">Recipe Ideas</span>
                </h1>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                  Designed with ❤️ for{" "}
                  <span className="font-semibold">Taylor</span> — a busy
                  professional who loves good food but doesn’t always have time
                  to plan. Recipe Ideas helps Taylor (and you!) discover tasty,
                  time-friendly meals using ingredients already in your kitchen.
                </p>

                {/* Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
  {[
    {
      icon: "🧑‍🍳",
      title: "Smart Search",
      desc: "Type ingredients you have — instantly get matching recipes.",
      target: "search-section",
    },
    {
      icon: "⏱️",
      title: "Quick & Easy",
      desc: "Find recipes that fit your schedule — from 10-min snacks to full dinners.",
      target: "quick-section",
    },
    {
      icon: "🌮",
      title: "Explore Flavors",
      desc: "Discover meals by mood, cuisine, or dietary preference.",
      target: "category-section",
    },
    {
      icon: "❤️",
      title: "Your Kitchen Buddy",
      desc: "Simple, stress-free, and designed to make cooking fun again.",
      target: "featured-section",
    },
  ].map((item, i) => (
    <div
      key={i}
      onClick={() => {
        const section = document.getElementById(item.target);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }}
      className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center cursor-pointer hover:-translate-y-1"
    >
      <div className="text-5xl mb-3">{item.icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
      <span className="mt-4 text-orange-600 font-medium hover:underline">
        View Section →
      </span>
    </div>
  ))}
</div>



                {/* Closing Text */}
                <div className="mt-16 bg-white/70 backdrop-blur-sm border border-orange-100 rounded-3xl p-8 shadow-sm">
                  <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
                    Recipe Ideas was built using{" "}
                    <span className="font-semibold text-orange-600">React</span>{" "}
                    and{" "}
                    <span className="font-semibold text-orange-600">
                      Tailwind CSS
                    </span>
                    , blending functionality with aesthetics — just like the
                    perfect recipe. Whether you’re in the mood for something
                    spicy, comforting, or quick, we’ve got you covered.
                  </p>
                </div>

                {/* Back to Home Button */}
                <div className="mt-10">
                  <a
                    href="/"
                    className="inline-block bg-orange-600 text-white font-medium py-3 px-8 rounded-full shadow-md hover:bg-orange-700 hover:shadow-lg transition-all duration-300"
                  >
                    ← Back to Home
                  </a>
                </div>
              </div>
            </section>
          </>
        )}

        {/* ✅ RESULTS SECTION */}
        {activeSection === "results" && (
          <div className="mt-6">
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
      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
      {/* 🟧 Back to Home Button when in Results */}
      {activeSection === "results" && (
        <div className="text-center my-6">
          <button
            onClick={() => setActiveSection("home")}
            className="text-orange-600 hover:text-orange-800 underline text-sm"
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
