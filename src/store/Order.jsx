import React, { useContext, useState, useEffect } from "react";
import { Storecontext } from "./Storecontextprovider";

const Order = () => {
  const { orders, setOrders } = useContext(Storecontext);
  const [checkstatus, setcheckStatus] = useState("All");
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [ownerdetail, setownerdetail] = useState({
    ownername: "",
    password: "",
  });
  const [showform, setshowform] = useState(true);

  const handleLogin = () => {
    if (ownerdetail.ownername === "user" && ownerdetail.password === "12345") {
      setshowform(false);
      setFilteredOrders(orders); // show all initially
    }
  };

  // 👇 update filtered orders whenever status or orders change
  useEffect(() => {
    if (checkstatus === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((o) => o.status === checkstatus));
    }
  }, [checkstatus, orders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col items-center py-10 px-5">
      {showform ? (
        // 🔐 Login Form
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Login</h2>
          <input
            type="text"
            placeholder="Enter name"
            value={ownerdetail.ownername}
            onChange={(e) =>
              setownerdetail({ ...ownerdetail, ownername: e.target.value })
            }
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={ownerdetail.password}
            onChange={(e) =>
              setownerdetail({ ...ownerdetail, password: e.target.value })
            }
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </div>
      ) : (
        // 📦 Orders Section
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
            Orders Management
          </h1>

          {/* Filter */}
          <div className="mb-6 flex items-center gap-3 justify-center">
            <label className="font-semibold">Filter orders:</label>
            <select
              value={checkstatus}
              onChange={(e) => setcheckStatus(e.target.value)}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-orange-400"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-6 transition hover:shadow-xl"
              >
                <h2 className="text-xl font-bold text-orange-600 mb-3">
                  Order #{index + 1}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <p>
                    <b>Name:</b> {order.customer.name}
                  </p>
                  <p>
                    <b>Number:</b> {order.customer.number}
                  </p>
                  <p>
                    <b>Address:</b> {order.customer.address}
                  </p>
                  <p>
                    <b>Total:</b> ${order.total}
                  </p>
                  <p>
                    <b>Status:</b>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        order.status === "Pending"
                          ? "bg-yellow-500"
                          : order.status === "Completed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p>
                    <b>Date:</b> {order.id}
                  </p>
                  <p>
                    <b>Tracking ID:</b> {order.trackingid}
                  </p>
                </div>

                {/* Status Update */}
                <div className="mt-4">
                  <label className="font-semibold mr-2">Update Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => {
                      const updatedOrders = orders.map((o) =>
                        o.trackingid === order.trackingid
                          ? { ...o, status: e.target.value }
                          : o
                      );
                      setOrders(updatedOrders); // update in context
                    }}
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Items List */}
                <hr className="my-4" />
                <div>
                  <h3 className="font-bold mb-2">Items:</h3>
                  {order.items.map((item) => (
                    <p key={item.id} className="text-gray-700">
                      {item.title} (x{item.quantity}) - ${item.price}
                    </p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
