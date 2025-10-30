import React, { useState } from "react";
import menuItems from "../../data/menuItems"; 

export default function Navbar({ onSelect }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Handle item click + API type support
  const handleCategoryClick = (item, type) => {
    if (onSelect) {
      let url = "";

      // TheMealDB API – handle different types dynamically
      if (type === "c") {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`;
      } else if (type === "a") {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${item}`;
      } else if (type === "i") {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${item}`;
      }

      onSelect(item, url);
    }
    setOpenMenu(null);
    setIsMobileOpen(false);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* ✅ Logo */}
        <h1
          onClick={() => window.location.reload()}
          className="text-2xl font-bold text-orange-600 cursor-pointer select-none"
        >
          🍴 Recipe Ideas
        </h1>

        {/* ✅ Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
          <li className="hover:text-orange-600 transition-colors cursor-pointer" onClick={() => {
  const searchBar = document.getElementById("search-bar");
  if (searchBar) {
    searchBar.scrollIntoView({ behavior: "smooth" });
  }
}}
>Home</li>
          <li className="hover:text-orange-600 transition-colors cursor-pointer" onClick={scrollToAbout} >About</li>

          {Object.entries(menuItems).map(([key, { type, items }]) => (
            <li
              key={key}
              className="relative group cursor-pointer"
              onMouseEnter={() => setOpenMenu(key)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <span className="hover:text-orange-600 capitalize flex items-center gap-1 transition">
                {key === "quick"
                  ? "Quick Cook Ideas"
                  : key === "ideas"
                  ? "Ideas"
                  : "Recipes"}{" "}
                <span className="text-xs">▾</span>
              </span>

              {/* ✅ Dropdown */}
              <ul
                className={`absolute bg-white shadow-lg rounded-md mt-2 py-2 w-52 transition-all duration-200 ${
                  openMenu === key ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                {items.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleCategoryClick(item, type)}
                    className="px-4 py-2 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* ✅ Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-3xl text-gray-800 focus:outline-none transition-transform duration-200"
          >
            {isMobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ✅ Mobile / Tablet Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 shadow-md transition-all duration-300 overflow-hidden ${
          isMobileOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col p-5 space-y-3 text-gray-700 font-medium">
          <li className="hover:text-orange-600 cursor-pointer " onClick={() => window.location.reload()}>Home</li>
          <li className="hover:text-orange-600 cursor-pointer" onClick={scrollToAbout} >About</li>

          {Object.entries(menuItems).map(([key, { type, items }]) => (
            <li key={key}>
              <details className="group open:mb-2">
                <summary className="cursor-pointer py-2 text-orange-600 font-semibold flex items-center justify-between">
                  {key === "quick"
                    ? "Quick Cook Ideas"
                    : key === "ideas"
                    ? "Ideas"
                    : "Recipes"}{" "}
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">
                    ▾
                  </span>
                </summary>
                <ul className="ml-4 mt-1 space-y-1">
                  {items.map((item) => (
                    <li
                      key={item}
                      onClick={() => handleCategoryClick(item, type)}
                      className="py-1 hover:text-orange-600 cursor-pointer"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </nav>
    
  );
}
