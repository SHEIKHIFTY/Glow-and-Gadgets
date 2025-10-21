"use client";
import { useState, useEffect } from "react";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", slug: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setMessage("❌ Name required");
    setLoading(true);
    setMessage("");
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId ? { id: editingId, ...form } : form;
      const res = await fetch("/api/categories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      if (editingId) {
        setCategories((prev) => prev.map((c) => (c._id === editingId ? data : c)));
        setMessage("✅ Updated");
      } else {
        setCategories((prev) => [...prev, data]);
        setMessage("✅ Added");
      }
      setForm({ name: "", slug: "" });
      setEditingId(null);
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (cat) => {
    setForm({ name: cat.name, slug: cat.slug || "" });
    setEditingId(cat._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete category?")) return;
    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      setCategories((prev) => prev.filter((c) => c._id !== id));
      setMessage("✅ Deleted");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0b18] text-white px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 bg-[#1a0b2a] p-6 rounded-2xl shadow border border-[#2e1743]">
          <h2 className="text-xl mb-4 text-purple-400">{editingId ? "Edit Category" : "Add Category"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Name *</label>
              <input name="name" value={form.name} onChange={handleChange} className="w-full p-3 rounded bg-[#2e1743]" required />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Slug</label>
              <input name="slug" value={form.slug} onChange={handleChange} className="w-full p-3 rounded bg-[#2e1743]" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded">
              {loading ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update" : "Add")}
            </button>
            {message && <p className={`mt-2 ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>{message}</p>}
          </form>
        </div>

        <div className="w-full lg:w-2/3 bg-[#1a0b2a] p-6 rounded-2xl shadow border border-[#2e1743] overflow-x-auto">
          <h2 className="text-xl mb-4 text-purple-400">Existing Categories</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#3d1c5e]">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Slug</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b border-[#3d1c5e] hover:bg-[#2e1743]/40">
                  <td className="py-3 px-3">{cat.name}</td>
                  <td className="py-3 px-3">{cat.slug || "—"}</td>
                  <td className="py-3 px-3 flex gap-2">
                    <button onClick={() => startEdit(cat)} className="bg-blue-600 px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(cat._id)} className="bg-red-600 px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
