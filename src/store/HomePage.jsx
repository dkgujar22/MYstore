
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-50 via-white to-blue-100 min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      {/* Tagline */}
      <span className="uppercase tracking-widest text-orange-500 font-semibold text-sm md:text-base z-10 animate-fadeIn">
        New Season Arrivals
      </span>

      {/* Hero Content */}
      <h1 className="mt-2 text-5xl md:text-6xl font-extrabold text-gray-800 z-10 animate-fadeIn delay-200">
        Welcome <span className="text-orange-500">To My Shop</span>
      </h1>
      <p className="mt-4 text-lg text-gray-600 z-10 animate-fadeIn delay-400">
        Discover premium fashion & lifestyle essentials crafted just for you.
      </p>

      {/* Button */}
      <div className="mt-6 z-10 animate-fadeIn delay-600">
        <Link
          to="/products"
          className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-lg hover:bg-orange-600 transition duration-300"
        >
          Shop Now
        </Link>
      </div>

      {/* Decorative Waves - Full Width */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-80"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#e0f2fe"
            d="M0,96L40,128C80,160,160,224,240,229.3C320,235,400,181,480,165.3C560,149,640,171,720,176C800,181,880,171,960,154.7C1040,139,1120,117,1200,112C1280,107,1360,117,1400,122.7L1440,128L1440,320L0,320Z"
          ></path>
          <path
            fill="#bae6fd"
            d="M0,224L40,208C80,192,160,160,240,170.7C320,181,400,235,480,229.3C560,224,640,160,720,138.7C800,117,880,139,960,149.3C1040,160,1120,160,1200,176C1280,192,1360,224,1400,240L1440,256L1440,320L0,320Z"
          ></path>
          <path
            fill="#f97316"
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,229.3C960,224,1056,160,1152,128C1248,96,1344,96,1392,96L1440,96L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HomePage;

