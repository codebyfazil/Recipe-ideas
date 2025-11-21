function AboutSection() {
  return (
    <>
      <section
        id="recipes-section"
        className=" scroll-mt-24 bg-linear-to-br from-orange-200 via-white to-orange-300 py-20 px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Title Section */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            About <span>Recipe Ideas</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Designed with ❤️ for <span className="font-semibold">Taylor</span> —
            a busy professional who loves good food but doesn’t always have time
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
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
              <span className="font-semibold text-orange-600">React</span> and{" "}
              <span className="font-semibold text-orange-600">
                Tailwind CSS
              </span>
              , blending functionality with aesthetics — just like the perfect
              recipe. Whether you’re in the mood for something spicy,
              comforting, or quick, we’ve got you covered.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutSection;
