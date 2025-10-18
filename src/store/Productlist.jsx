
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Storecontext } from "./Storecontextprovider";

const Productlist = () => {
  const { cart, setcart } = useContext(Storecontext);
  const [allproducts, setallproducts] = useState([]);
  const [products, setproducts] = useState([]);
  const [searchproduct, setSearchproduct] = useState("");

  // Add/Remove product toggle
  const handleCart = (item, isincart) => {
    if (isincart) {
      setcart(cart.filter((c) => c.id !== item.id));
    } else {
      setcart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Fetch products
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products/");
        setallproducts(res.data);
        setproducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
  }, []);

  // Filter on search
  useEffect(() => {
    const search = searchproduct.toLowerCase().replace(/[' ]/g, "");
    const filtered = allproducts.filter(
      (p) =>
        p.title.toLowerCase().includes(searchproduct.toLowerCase()) ||
        p.category.toLowerCase().replace(/[' ]/g, "").includes(search)
    );
    setproducts(filtered);
  }, [searchproduct, allproducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-10 px-5">
      {/* Search Input */}
      <div className="text-center mb-10">
        <input
          type="search"
          placeholder="🔍 Search products here..."
          value={searchproduct}
          onChange={(e) => setSearchproduct(e.target.value)}
          className="w-1/2 px-5 py-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((elem) => {
          const isincart = cart.some((c) => c.id === elem.id);
          return (
            <div
              key={elem.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 p-6 flex flex-col items-center text-center"
            >
              <img
                src={elem.image}
                alt={elem.title}
                className="w-40 h-40 object-contain mb-4 transition-transform duration-300 hover:scale-110"
              />
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                {elem.title}
              </h3>
              <p className="mt-2 text-xl font-bold text-orange-600">
                ${elem.price}
              </p>
              <p className="text-yellow-500 font-medium">
                ⭐ {elem.rating.rate} ({elem.rating.count})
              </p>

              <button
                onClick={() => handleCart(elem, isincart)}
                className={`mt-4 px-5 py-2 rounded-full text-white font-semibold shadow-md transition duration-300 ${
                  isincart
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {isincart ? "Remove from cart" : "Add to cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Productlist;

