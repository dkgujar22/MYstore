// import { Routes, Route, useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";
// import { useState } from "react";

// function App() {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const found = prev.find((p) => p.id === product.id);
//       if (found) {
//         return prev.map((p) =>
//           p.id === product.id ? { ...p, qty: p.qty + 1 } : p
//         );
//       }
//       return [...prev, { ...product, qty: 1 }];
//     });
//   };

//   const increment = (id) =>
//     setCart((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
//     );

//   const decrement = (id) =>
//     setCart((prev) =>
//       prev
//         .map((p) => (p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p))
//         .filter((p) => p.qty > 0)
//     );

//   const removeItem = (id) =>
//     setCart((prev) => prev.filter((p) => p.id !== id));

//   const clearCart = () => {
//     setCart([]);
//     navigate("/");
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* ✅ Pass cart to Navbar */}
//       <Navbar cart={cart} />

//       <Routes>
//         <Route path="/" element={<Home addToCart={addToCart} />} />
//         <Route
//           path="/cart"
//           element={
//             <Cart
//               cart={cart}
//               increment={increment}
//               decrement={decrement}
//               removeItem={removeItem}
//               clearCart={clearCart}
//             />
//           }
//         />
//         <Route path="*" element={<h1 className="p-10">404 Not Found</h1>} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
// import React, { useState } from 'react'
// import { ThemeContext } from './context/ThemeContext'

// import Child from './component/Child'
// import Main from './component/Main'
// import About from './store/About'
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import store and context
import Storecontextprovider from "./store/Storecontextprovider";

// Import components
import Navbar from "./store/Navbar";
import Footer from "./store/Footer";
import ScrollToTop from "./store/ScrollToTop";

// Import pages
import HomePage from "./store/HomePage";
import Productlist from "./store/Productlist";
import Cart from "./store/Cart";
import Order from "./store/Order";
import Trackingpage from "./store/Trackingpage";

const App = () => {
  return (
    <Storecontextprovider>
      {/* Scrolls to top when navigating */}
      <ScrollToTop />

      {/* Navbar at top */}
      <Navbar />

      {/* Define routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Productlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/trackingpage" element={<Trackingpage />} />
        <Route path="*" element={<h1 className="p-10 text-center">404 Not Found</h1>} />
      </Routes>

      {/* Footer at bottom */}
      <Footer />
    </Storecontextprovider>
  );
};

export default App;



