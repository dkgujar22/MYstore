import React, { useContext, useState, useEffect } from "react";
import { Storecontext } from "./Storecontextprovider";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, setcart, custdata, setcustData, setOrders } =
    useContext(Storecontext);

  const [bill, setbill] = useState(0);
  const [openform, setopenform] = useState(false);
  const [status, setstatus] = useState(false);
  const [trackingId, setTrackingId] = useState(null);
  const [errors, setErrors] = useState({}); // store error messages

  useEffect(() => {
    const totalbill = cart.reduce(
      (acc, item) => item.price * item.quantity + acc,
      0
    );
    setbill(totalbill);
  }, [cart]);

  const removeitem = (item) => {
    const updatecart = cart.filter((c) => c.id !== item.id);
    setcart(updatecart);
    toast.error(`${item.title} removed from cart`);
  };

  const updatequantity = (item, newqty) => {
    setcart(
      cart.map((c) =>
        c.id === item.id ? { ...c, quantity: Number(newqty) } : c
      )
    );
  };

  const validateForm = () => {
    let newErrors = {};
    if (!custdata.name.trim()) newErrors.name = "Please enter your name";
    if (!custdata.number.trim()) newErrors.number = "Please enter your number";
    if (!custdata.address.trim())
      newErrors.address = "Please enter your address";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // valid if no errors
  };

  const submitOrder = () => {
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newId = "ORD-" + Math.floor(Math.random() * 10000);
    const neworder = {
      id: Date.now(),
      customer: { ...custdata },
      items: cart,
      total: bill,
      status: "pending",
      trackingid: newId,
    };

    setOrders((prev) => [...prev, neworder]);
    setstatus(true);
    setTrackingId(newId);
    setcart([]);
    setcustData({ name: "", number: "", address: "" });
    setopenform(false);
    setErrors({}); // clear errors

    toast.success("Order booked successfully 🎉");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        🛒 Your Cart
      </h2>

      {/* Empty cart */}
      {!openform && cart.length === 0 && !status && (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}

      {/* Cart Items */}
      {!openform && cart.length > 0 && (
        <>
          {cart.map((elem) => (
            <div
              key={elem.id}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-2xl"
            >
              {/* Left section (image + info) */}
              <div className="flex items-start gap-4 flex-1">
                {/* Thumbnail placeholder (if you have product images) */}
                {/* Product Image */}
                <div className="w-24 h-24 rounded-lg overflow-hidden flex items-center justify-center bg-white border">
                  <img
                    src={elem.image}
                    alt={elem.title}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Product Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {elem.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {elem.description}
                  </p>
                  <p className="text-gray-800 font-bold mt-1">${elem.price}</p>
                </div>
              </div>

              {/* Right section (qty + remove) */}
              <div className="flex flex-col items-end gap-2">
                <input
                  type="number"
                  min="1"
                  className="w-16 border border-gray-300 rounded-md p-2 text-center"
                  value={elem.quantity || 1}
                  onChange={(e) => updatequantity(elem, e.target.value)}
                />

                <button
                  onClick={() => removeitem(elem)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 text-right text-lg font-bold border-t pt-4">
            Total: ${bill.toFixed(2)}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => setopenform(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
            >
              Book Order
            </button>
          </div>
        </>
      )}

      {/* Customer Form */}
      {openform && !status && (
        <div className="mt-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter your name"
              value={custdata.name}
              onChange={(e) =>
                setcustData({ ...custdata, name: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Enter your number"
              value={custdata.number}
              onChange={(e) =>
                setcustData({ ...custdata, number: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
            {errors.number && (
              <p className="text-red-500 text-sm mt-1">{errors.number}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Enter your address"
              value={custdata.address}
              onChange={(e) =>
                setcustData({ ...custdata, address: e.target.value })
              }
              className="w-full border rounded-md p-2"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={submitOrder}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
            >
              Submit
            </button>
            <button
              onClick={() => setopenform(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {status && (
        <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg text-center">
          <h1 className="text-green-700 font-semibold">
            ✅ Order booked successfully!
          </h1>
          <p className="text-gray-600">
            Your tracking ID:{" "}
            <span className="font-mono text-blue-600">{trackingId}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Cart;
