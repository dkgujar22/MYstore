
import React, { useContext, useEffect, useState } from "react";
import { Storecontext } from "./Storecontextprovider";

const Trackingpage = () => {
  const { orders } = useContext(Storecontext);
  const [trackingId, setTrackingid] = useState("");
  const [foundorder, setFoundorder] = useState(null);

  useEffect(() => {
    const updateorders = orders.find((o) => o.trackingid === trackingId);
    setFoundorder(updateorders);
  }, [trackingId, orders]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col items-center justify-center px-6 py-12">
      {/* Form Section */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Track Your Order
        </h1>
        <p className="text-gray-600 mb-6">
          Enter your tracking ID below to see the status of your order.
        </p>

        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingid(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Order Result */}
        {foundorder ? (
          <div className="bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 rounded-xl shadow-md p-6 mt-6 text-left">
            <h3 className="text-xl font-bold text-orange-700 mb-3">
              Tracking ID: {foundorder.trackingid}
            </h3>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  foundorder.status === "Pending"
                    ? "bg-yellow-500"
                    : foundorder.status === "Completed"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {foundorder.status}
              </span>
            </p>
            <p>
              <strong>Customer:</strong> {foundorder.customer.name}
            </p>
            <p>
              <strong>Address:</strong> {foundorder.customer.address}
            </p>
            <p>
              <strong>Phone:</strong> {foundorder.customer.number}
            </p>

            <h4 className="mt-4 font-semibold">Items:</h4>
            <ul className="list-disc pl-5 text-gray-700">
              {foundorder.items.map((item) => (
                <li key={item.id}>
                  {item.title} (x{item.quantity})
                </li>
              ))}
            </ul>
          </div>
        ) : (
          trackingId && (
            <p className="text-red-500 mt-4 font-medium">
              ❌ Order not found. Please check your ID.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Trackingpage;

