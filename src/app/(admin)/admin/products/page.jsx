"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          console.error("Products API error:", res.status, await res.text());
          setProducts([]);
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data?.product) {
          setProducts([data.product]);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to load products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0a0411] text-white pt-6 mt-10">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0411] text-white px-4 sm:px-6 py-10 mt-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">🛍️ Products</h1>
        <Link
          href="/admin/products/add"
          className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 sm:px-5 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
        >
          + Add Product
        </Link>
      </div>

      {/* Product Table */}
      {products.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">
          No products found. Try adding one!
        </div>
      ) : (
        <div className="overflow-x-auto bg-[#1a0b2a] border border-[#2e1743] rounded-2xl shadow-lg">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-[#2e1743] text-gray-200 uppercase text-xs sm:text-sm">
              <tr>
                <th className="p-2 sm:p-3 text-left">Name</th>
                <th className="p-2 sm:p-3 text-left">Price</th>
                <th className="p-2 sm:p-3 text-left">Category</th>
                <th className="p-2 sm:p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-t border-[#392151] hover:bg-[#3b1b64] transition"
                >
                  <td className="p-2 sm:p-3 font-medium break-words max-w-[120px] sm:max-w-none">
                    {p.title}
                  </td>
                  <td className="p-2 sm:p-3 text-gray-300">{p.price}৳</td>
                  <td className="p-2 sm:p-3 text-gray-300 break-words max-w-[100px] sm:max-w-none">
                    {p.category || "Uncategorized"}
                  </td>
                  <td className="p-2 sm:p-3 flex flex-wrap gap-2">
                    <Link
                      href={`/admin/products/edit/${p._id}`}
                      className="text-blue-400 hover:text-blue-300 transition text-sm sm:text-base"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={async () => {
                        if (!confirm("Delete this product?")) return;
                        try {
                          const res = await fetch(`/api/products`, {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: p._id }),
                          });

                          if (!res.ok) {
                            console.error("Failed to delete product", await res.text());
                            return;
                          }

                          setProducts(products.filter((x) => x._id !== p._id));
                        } catch (err) {
                          console.error("Delete product error:", err);
                        }
                      }}
                      className="text-red-500 hover:text-red-400 transition text-sm sm:text-base"
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
