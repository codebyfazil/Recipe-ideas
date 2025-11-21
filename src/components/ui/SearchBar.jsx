import React from "react";
import Recipebg from "../../assets/recipe-bg.jpg";
import VerticalCarousel from "./VerticalCarousel";

const recipeSlides = [
  {
    title: "Chicken Biryani",
    image: "https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg"
  },
  {
    title: "Butter Chicken",
    image: "https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg"
  },
  {
    title: "Chole Bhature",
    image: "https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg"
  },
  {
    title: "Masala Dosa",
    image: "https://www.themealdb.com/images/media/meals/vytypy1511883765.jpg"
  },
  {
    title: "Pizza Express Margherita",  
    image: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg"  
  },
  {
    title: "Fettuccine Alfredo",  
    image: "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg"  
  },
  {
    title: "Waldorf Salad",  
    image: "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg"  
  },
];

export default function SearchBar({ value, onChange, onSearch, vegOnly, setVegOnly }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
   <div
  className="
    relative flex flex-col md:flex-row items-center justify-between
    w-full min-h-[80vh]
    bg-cover bg-center bg-no-repeat
    px-4 sm:px-10 md:px-16 lg:px-24
  "
  style={{ backgroundImage: `url(${Recipebg})` }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* LEFT SIDE */}
  <div className="relative z-10 w-full md:w-1/2 flex flex-col px-6 md:px-10 lg:px-14">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
      Find Delicious Recipes
    </h1>

    <p className="text-gray-200 mb-6 text-lg">
      Search by ingredient, cuisine, or dish type.
    </p>

    {/* Input + Search */}
    <div className="flex gap-2 w-full max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type ingredient — e.g. chicken, tomato..."
        className="flex-1 px-4 py-3 rounded-md border text-white bg-white/20 placeholder-gray-300 
        backdrop-blur-md focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={onSearch}
        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Search
      </button>
    </div>

    {/* Veg Filter */}
    <label className="flex items-center gap-2 mt-4 text-gray-200">
      <input
        type="checkbox"
        checked={vegOnly}
        onChange={(e) => setVegOnly(e.target.checked)}
        className="h-4 w-4"
      />
      Vegetarian only
    </label>

    <p className="mt-2 text-gray-300">
      Try: <span className="italic">Biryani, Pizza, Pasta, Salad</span>
    </p>
  </div>

  {/* RIGHT SIDE — CENTERED SLIDER */}
  <div className="relative z-10 w-full md:w-1/2 flex items-center justify-center p-6">
    <VerticalCarousel items={recipeSlides} />
  </div>
</div>


  );
}
