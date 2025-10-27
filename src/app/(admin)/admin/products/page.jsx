"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all products
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete product");
      setProducts(products.filter((p) => p._id !== id));
      alert("✅ Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading)
    return <p className="text-white text-center mt-10 pt-8">Loading products...</p>;

  return (
    <div className="min-h-screen bg-[#0a0411] text-white px-4 sm:px-6 py-10 mt-14 sm:py-10 sm:mt-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🛍️ Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-purple-600 px-4 py-2 rounded-lg hover:opacity-90"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-400">No products found.</p>
      ) : (
        <div className="w-full overflow-hidden rounded-lg">
          <table className="w-full table-auto bg-[#1a0b2a] rounded-lg text-sm sm:text-base">
            <thead className="bg-[#2e1743] text-gray-200">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-[#392151] hover:bg-[#3b1b64]"
                >
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">{p.price}৳</td>
                  <td className="p-3">{p.category?.name || "Uncategorized"}</td>
                  <td className="p-3 flex gap-2">
                    <Link
                      href={`/admin/products/edit/${p._id}`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
