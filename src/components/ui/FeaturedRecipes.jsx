import React from "react";

export default function FeaturedRecipes({
  onCategorySelect,
  onSearchIngredient,
  resultRef,
}) {
  const featured = [
    {
      title: "Chocolate Heaven",
      desc: "Indulge in rich, velvety chocolate desserts — from cakes to puddings and beyond.",
      img: "https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg",
      keyword: "Chocolate",
    },
    {
      title: "Bakewell Tart",
      desc: "British dessert with layers of jam, almond filling, and flaky pastry — beautifully sweet and nutty.",
      img: "https://www.themealdb.com/images/media/meals/wyrqqq1468233628.jpg",
      keyword: "Almond",
    },

    {
      title: "Berry Delight",
      desc: "Fresh strawberries, raspberries, and blueberries — perfect for summer evenings.",
      img: "https://www.themealdb.com/images/media/meals/qtuuys1511387068.jpg",
      keyword: "Berry",
    },
  ];

  const handleLearnMore = (keyword) => {
    // Prefer ingredient-based search
    if (onSearchIngredient) {
      onSearchIngredient(keyword);
    } else {
      onCategorySelect("ingredient", keyword);
    }

    // Smooth scroll to results
    setTimeout(() => {
      resultRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 500);
  };

  return (
    <section className="bg-orange-50 py-16">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Featured <span className="text-orange-500">Recipe Ideas</span>
      </h2>

      <div className="max-w-6xl mx-auto space-y-2 px-4">
        {featured.map((item, index) => (
          <div
            key={item.title}
            className={`flex flex-col ${
              index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            } items-center bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300`}
          >
            {/* Text Section */}
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-5">{item.desc}</p>
              <button
                onClick={() => handleLearnMore(item.keyword)}
                className="bg-orange-500 text-white px-5 py-2 rounded-md hover:bg-orange-600 transition"
              >
                Learn More →
              </button>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2">
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
