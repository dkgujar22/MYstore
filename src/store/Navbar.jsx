import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Storecontext } from "./Storecontextprovider";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useContext(Storecontext);

  return (
    <nav className="sticky top-0 z-50 bg-orange-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">🛍️ MyShop</div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/products" className="hover:text-gray-200 transition">Products</Link>
          <Link to="/order" className="hover:text-gray-200 transition">Orders</Link>
          <Link to="/trackingpage" className="hover:text-gray-200 transition">Tracking</Link>
          <Link to="/cart" className="relative flex items-center hover:text-gray-200 transition">
            <FaShoppingCart size={20} />
            {/* Cart Count */}
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>

        {/* Right Side (Mobile: Cart + Hamburger) */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Cart Icon always visible on mobile */}
          <Link to="/cart" className="relative flex items-center">
            <FaShoppingCart size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Hamburger Button */}
          <button
            className="text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-orange-700 px-6 py-4 space-y-4 text-lg font-medium">
          <Link to="/" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/order" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Orders</Link>
          <Link to="/trackingpage" className="block hover:text-gray-200" onClick={() => setIsOpen(false)}>Tracking</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
