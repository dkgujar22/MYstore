import { Link } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";

const Navbar = ({ cart }) => {
  // total items (sum of qty)
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center bg-white shadow-md sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        MYstore
      </Link>

      

      {/* Icons */}
      <div className="flex items-center gap-4 relative">
        <Link to="/cart" className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
        <User className="w-6 h-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
