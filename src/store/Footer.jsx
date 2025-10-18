import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-blue-600 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3">About Us</h2>
          <p className="text-sm text-gray-200">
            We provide fresh products with quick delivery and easy tracking.
            Your satisfaction is our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/trackingpage" className="hover:underline">Track Order</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <p className="text-sm">📍 Hyderabad, Pakistan</p>
          <p className="text-sm">📞 +92 3168920200</p>
          <p className="text-sm">✉️ deepakgujar@gmail.com</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-white/20 pt-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
