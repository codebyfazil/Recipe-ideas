import React, { useState } from "react";

export default function PopularFoodSection() {
  const [selectedFood, setSelectedFood] = useState(null);

  const foods = [
    {
      name: "Pizza",
      img: "https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg",
      desc: "Classic Italian pizza made with fresh dough, tomato sauce, and melted mozzarella.",
      ingredients: ["Dough", "Tomato Sauce", "Mozzarella", "Basil"],
    },
    {
      name: "Burger",
      img: "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
      desc: "Juicy grilled beef patty with cheese, lettuce, and tomato in a soft bun.",
      ingredients: ["Beef", "Cheese", "Lettuce", "Tomato", "Bun"],
    },
    {
    
  name: "Grilled Lemon Butter Fish",
  img: "https://www.themealdb.com/images/media/meals/1549542994.jpg",
  desc: "Crispy golden puff pastry stuffed with seasoned chicken — a bakery favorite snack.",
  ingredients: ["Puff Pastry", "Chicken", "Onion", "Garlic", "Spices", "Egg Wash"],


    },
    {
      name: "Pasta",
      img: "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
      desc: "Creamy Alfredo pasta cooked to perfection with Parmesan cheese.",
      ingredients: ["White fish fillets (tilapia or cod)","Butter","Lemon juice","Garlic","Black pepper","Parsley"],
    },
    {
      name: "Tacos",
      img: "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
      desc: "Crispy tacos stuffed with spiced beef, lettuce, and salsa.",
      ingredients: ["Tortilla", "Beef", "Lettuce", "Salsa", "Cheese"],
    },
    {
      name: "Salad",
      img: "https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg",
      desc: "Healthy and fresh mixed greens with a zesty dressing.",
      ingredients: ["Lettuce", "Tomato", "Cucumber", "Dressing"],
    },
  ];

  return (
    <section className="bg-orange-50 py-16">
      <h2 className="text-center text-3xl font-bold mb-12 text-gray-800">
        Our <span className="text-orange-500">Popular Food</span>
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {foods.map((food, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
            onClick={() => setSelectedFood(food)}
          >
            <img
              src={food.img}
              alt={food.name}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            {/* Food name overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white text-xl font-semibold">{food.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for more details */}
      {selectedFood && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setSelectedFood(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-11/12 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setSelectedFood(null)}
            >
              ✕
            </button>
            <img
              src={selectedFood.img}
              alt={selectedFood.name}
              className="w-full h-52 object-cover rounded-xl mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedFood.name}
            </h3>
            <p className="text-gray-600 mb-3">{selectedFood.desc}</p>
            <h4 className="font-semibold text-orange-600 mb-2">Ingredients:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {selectedFood.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
