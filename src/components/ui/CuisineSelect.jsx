// components/ui/CuisineSelect.jsx
import React from "react";

const cuisines = ["Indian", "Chinese", "Italian", "Mexican", "Japanese"];

export default function CuisineSelect({ onSelect }) {
  return (
    <div className="text-center py-10">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">Select Cuisine</h2>

      <div className="flex flex-wrap justify-center gap-4">
        {cuisines.map((c) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
            className="px-8 py-4 bg-white rounded-xl shadow-md 
            hover:scale-105 hover:shadow-xl transition-all text-lg font-semibold"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
