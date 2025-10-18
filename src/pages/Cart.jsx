import { Link } from "react-router-dom";
import { useState } from "react";

const Cart = ({ cart,setCart, increment, decrement, removeItem, clearCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const [showForm, setShowForm] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

 const handleOrderSubmit = (e) => {
  e.preventDefault();
  setOrderPlaced(true); 
  setCart([]) // Show "Order Delivered"
  // setCart([]);           // Clear the cart
  // Do NOT navigate here
};


  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 && !showForm && !orderPlaced && (
        <p>Your cart is empty.</p>
      )}

      {!orderPlaced && (
        <>
          {cart.length > 0 && !showForm && (
            <>
              <ul className="space-y-3">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border p-3 rounded-lg"
                  >
                    <span>
                      {item.name} - ${item.price} × {item.qty}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrement(item.id)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <button
                        onClick={() => increment(item.id)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <h2 className="text-lg font-semibold mt-4">
                Total: ${total.toFixed(2)}
              </h2>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Clear Cart
                </button>
                <Link
                  to="/"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Back to Menu
                </Link>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Book Order
                </button>
              </div>
            </>
          )}
        </>
      )}

      {showForm && !orderPlaced && (
        <form
          onSubmit={handleOrderSubmit}
          className="flex flex-col gap-4 mt-6 border p-4 rounded-lg bg-white shadow"
        >
          <h2 className="text-xl font-semibold">Enter Order Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={orderDetails.name}
            onChange={handleInputChange}
            required
            className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={orderDetails.address}
            onChange={handleInputChange}
            required
            className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={orderDetails.phone}
            onChange={handleInputChange}
            required
            className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Submit Order
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {orderPlaced && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-green-600">
            🎉 Order Delivered!
          </h2>
          <Link
            to="/"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Menu
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
