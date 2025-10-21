"use client";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (id) => {
    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "Completed" }),
      });
      if (!res.ok) throw new Error("Failed to update order");
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOrder = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      const res = await fetch("/api/orders", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to delete order");
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  if (loading)
    return (
      <p className="text-white text-center pt-8 mt-12">Loading orders...</p>
    );

  return (
    <div className="min-h-screen bg-[#0a0411] text-white px-4 sm:px-6 py-10 mt-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-center sm:text-left">📦 Orders</h1>
        <div className="flex items-center gap-2">
          <label className="text-gray-300 font-semibold">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#2e1743] text-white px-3 py-1 rounded focus:outline-none"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-400 text-center mt-6">No orders found.</p>
      ) : (
        <div className="w-full">
          {/* Large screens: table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl shadow-lg border border-[#2e1743] bg-[#1a0b2a]">
            <table className="w-full text-sm divide-y divide-[#392151]">
              <thead className="bg-[#2e1743] text-gray-200 uppercase text-xs">
                <tr>
                  <th className="p-2 sm:p-3 text-left">Customer</th>
                  <th className="p-2 sm:p-3 text-left">Phone</th>
                  <th className="p-2 sm:p-3 text-left">Address</th>
                  <th className="p-2 sm:p-3 text-left">Products</th>
                  <th className="p-2 sm:p-3 text-left">Total (৳)</th>
                  <th className="p-2 sm:p-3 text-left">Status</th>
                  <th className="p-2 sm:p-3 text-left">Order Time</th>
                  <th className="p-2 sm:p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#392151]">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-[#3b1b64] transition">
                    <td className="p-2 sm:p-3 font-medium break-words">{order.customer.name}</td>
                    <td className="p-2 sm:p-3 text-gray-300 break-words">{order.customer.phone}</td>
                    <td className="p-2 sm:p-3 text-gray-300 break-words">{order.customer.address}</td>
                    <td className="p-2 sm:p-3">
                      <ul className="flex flex-col gap-1">
                        {order.products.map((p) => (
                          <li key={p.productId} className="flex items-center gap-2 break-words">
                            <img
                              src={p.image}
                              alt={p.title}
                              className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded border border-purple-400"
                            />
                            <span>{p.title} x {p.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-2 sm:p-3 font-semibold">{order.total.toFixed(2)}</td>
                    <td className="p-2 sm:p-3 text-yellow-400 font-semibold">{order.status}</td>
                    <td className="p-2 sm:p-3 text-gray-400">
                      {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                    </td>
                    <td className="p-2 sm:p-3 flex flex-wrap gap-1">
                      {order.status !== "Completed" && (
                        <button
                          onClick={() => markCompleted(order._id)}
                          className="bg-green-500 px-2 py-1 rounded hover:bg-green-600 transition text-xs sm:text-sm"
                        >
                          Complete
                        </button>
                      )}
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 transition text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile screens: stacked cards */}
          <div className="md:hidden flex flex-col gap-4">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-[#1a0b2a] border border-[#2e1743] rounded-2xl p-4 shadow-md"
              >
                <p className="font-semibold text-lg text-white">Customer: {order.customer.name}</p>
                <p className="text-gray-300">Phone: {order.customer.phone}</p>
                <p className="text-gray-300 break-words">Address: {order.customer.address}</p>
                <p className="text-gray-400 text-sm mt-1">
                  Ordered: {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                </p>
                <div className="mt-2">
                  <p className="font-semibold text-white">Products:</p>
                  <ul className="flex flex-col gap-1 mt-1">
                    {order.products.map((p) => (
                      <li key={p.productId} className="flex items-center gap-2">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-8 h-8 object-cover rounded border border-purple-400"
                        />
                        <span className="text-gray-200">{p.title} x {p.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="font-semibold text-white mt-2">Total: {order.total.toFixed(2)} ৳</p>
                <p className="text-yellow-400 font-semibold">Status: {order.status}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {order.status !== "Completed" && (
                    <button
                      onClick={() => markCompleted(order._id)}
                      className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition text-sm"
                    >
                      Complete
                    </button>
                  )}
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
