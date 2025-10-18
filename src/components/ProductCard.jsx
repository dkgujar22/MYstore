// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col">
      {/* Image */}
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain h-full p-4"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.category}</p>
        <p className="text-blue-600 font-bold text-lg mb-4">${product.price}</p>

        {/* Button */}
        <button
          onClick={() => addToCart(product)}
          className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
