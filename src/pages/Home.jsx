import { useMemo, useState } from "react";
import productsData from "../data/products";
import ProductCard from "../components/ProductCard";

const categories = ["All", "Mobile", "Shoes", "Clothes", "Headphones"];

const Home = ({ addToCart }) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const products = useMemo(() => {
    let list = productsData;

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return list;
  }, [query, activeCategory]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Local search */}
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-72 bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} addToCart={addToCart} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-center text-gray-500 mt-12 text-lg">
          ❌ No products found.
        </p>
      )}
    </div>
  );
};

export default Home;
