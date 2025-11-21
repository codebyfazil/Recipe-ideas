function CategoryGrid({ handleCategorySelect }) {
  return (
    <>
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
    </>
  );
}
export default CategoryGrid;