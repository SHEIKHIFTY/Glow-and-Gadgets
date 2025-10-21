"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0 });

  useEffect(() => {
    async function loadStats() {
      try {
        // Fetch all three APIs
        const [prodRes, catRes, ordRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
          fetch("/api/orders"),
        ]);

        const products = prodRes.ok ? await prodRes.json() : [];
        const categories = catRes.ok ? await catRes.json() : [];
        const orders = ordRes.ok ? await ordRes.json() : [];

        setStats({
          products: products.length || 0,
          categories: categories.length || 0,
          orders: orders.length || 0,
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left mt-12">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="text-sm text-gray-600">Total Products</h3>
          <p className="text-2xl sm:text-3xl font-bold text-purple-700 mt-2 sm:mt-1">
            {stats.products}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="text-sm text-gray-600">Total Categories</h3>
          <p className="text-2xl sm:text-3xl font-bold text-purple-700 mt-2 sm:mt-1">
            {stats.categories}
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow flex flex-col items-center sm:items-start text-center sm:text-left">
          <h3 className="text-sm text-gray-600">Total Orders</h3>
          <p className="text-2xl sm:text-3xl font-bold text-purple-700 mt-2 sm:mt-1">
            {stats.orders}
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
        <Link
          href="/admin/products"
          className="bg-purple-700 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
        >
          Manage Products
        </Link>
        <Link
          href="/admin/categories"
          className="bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
        >
          Manage Categories
        </Link>
        <Link
          href="/admin/orders"
          className="bg-green-700 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
        >
          Manage Orders
        </Link>
      </div>
    </div>
  );
}
