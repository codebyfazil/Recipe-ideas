import React, { useState, useEffect } from "react";

export default function VerticalCarousel({ items = [] }) {
  const [index, setIndex] = useState(0);

  const safeItems = Array.isArray(items) ? items : [];

  useEffect(() => {
    if (safeItems.length === 0) return;
    const auto = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeItems.length);
    }, 3000);
    return () => clearInterval(auto);
  }, [safeItems.length]);

  const scrollUp = () => {
    setIndex((prev) => (prev - 1 + safeItems.length) % safeItems.length);
  };

  const scrollDown = () => {
    setIndex((prev) => (prev + 1) % safeItems.length);
  };

  if (safeItems.length === 0) return null;

  return (
    <div className="relative flex items-center gap-4">
      
      {/* The Rectangle Card */}
      <div className="w-[500px] h-[300px] rounded-2xl overflow-hidden shadow-xl bg-black/20">
        <img
          src={safeItems[index].image}
          alt={safeItems[index].title}
          className="w-full h-full object-cover"
        />

        {/* Title */}
        <div className="absolute bottom-0 w-full py-5 text-left ml-6 text-white font-bold bg-linear-to-t from-black/60 to-transparent">
          {safeItems[index].title}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={scrollUp}
          className="w-10 h-10 rounded-full bg-white/30 backdrop-blur text-white text-xl flex items-center justify-center shadow-lg"
        >
          ↑
        </button>

        <button
          onClick={scrollDown}
          className="w-10 h-10 rounded-full bg-white/30 backdrop-blur text-white text-xl flex items-center justify-center shadow-lg"
        >
          ↓
        </button>
      </div>
    </div>
  );
}
