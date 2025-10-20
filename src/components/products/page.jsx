// src/app/admin/products/page.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "@/components/Admin/AdminHeader";
import ProductForm from "@/components/products/ProductForm";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin/api/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await axios.delete(`/admin/api/products?id=${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div>
      <AdminHeader title="Products" />
      <div className="mt-6 grid gap-4">
        <ProductForm
          onSaved={fetchProducts}
          editing={editing}
          clearEdit={() => setEditing(null)}
        />

        <div className="bg-[#0f0b1a] p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Product List</h3>
          {loading ? <p>Loading...</p> : (
            <div className="space-y-2">
              {products.map(p => (
                <div key={p._id} className="flex items-center justify-between bg-[#130a25] p-3 rounded">
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-gray-400">{p.category} — ${p.price}</div>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => setEditing(p)} className="px-3 py-1 rounded bg-blue-600">Edit</button>
                    <button onClick={() => handleDelete(p._id)} className="px-3 py-1 rounded bg-red-600">Delete</button>
                  </div>
                </div>
              ))}
              {products.length === 0 && <p className="text-sm text-gray-400">No products yet</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
