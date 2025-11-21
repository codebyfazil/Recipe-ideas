// components/ui/TimeSelect.jsx
import React from "react";


const times = [
  { label: "0-30 mins", value: "short" },
  { label: "30-60 mins", value: "medium" },
  { label: "60 mins +", value: "long" },
];

export default function TimeSelect({ onSelect }) {
  return (
    <div className="text-center py-10">
<h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
      Quick Recipe Finder
    </h1>
     <h3 className="text-lg text-gray-500 mt-3">
    What's your recipe for today?
  </h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {times.map((t) => (
          <button
            key={t.value}
            onClick={() => onSelect(t.value)}
            className="w-56 h-40 bg-white rounded-2xl shadow-lg 
            hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            
            <div className="text-2xl font-semibold text-purple-600">{t.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
