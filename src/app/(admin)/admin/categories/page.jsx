"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", slug: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Load categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadCategories();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update category
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setMessage("❌ Category name is required");

    setLoading(true);
    setMessage("");
    try {
      const method = editingId ? "PUT" : "POST";
      const body = editingId
        ? { id: editingId, ...form }
        : form;

      const res = await fetch("/api/categories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save category");

      if (editingId) {
        setCategories((prev) =>
          prev.map((cat) => (cat._id === editingId ? data : cat))
        );
        setMessage("✅ Category updated successfully!");
      } else {
        setCategories((prev) => [...prev, data]);
        setMessage("✅ Category added successfully!");
      }

      setForm({ name: "", slug: "" });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Edit category
  const handleEdit = (cat) => {
    setForm({ name: cat.name, slug: cat.slug || "" });
    setEditingId(cat._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`/api/categories?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete category");
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
      setMessage("✅ Category deleted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0b18] text-white px-3 py-10 mt-12">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Manage Categories
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form */}
        <div className="w-full lg:w-1/3 bg-[#1a0b2a] p-6 rounded-2xl shadow-lg border border-[#2e1743]">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">
            {editingId ? "✏️ Edit Category" : "➕ Add New Category"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Category name"
                className="w-full p-3 bg-[#2e1743] border border-[#3d1c5e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="Optional slug"
                className="w-full p-3 bg-[#2e1743] border border-[#3d1c5e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
            >
              {loading ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update Category" : "Add Category"}
            </button>
            {message && (
              <p
                className={`text-center mt-3 ${
                  message.startsWith("✅") ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>

        {/* Existing Categories */}
        <div className="w-full lg:w-2/3 bg-[#1a0b2a] p-6 rounded-2xl shadow-lg border border-[#2e1743] overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-purple-400">📂 Existing Categories</h2>
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b border-[#3d1c5e]">
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Slug</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b border-[#3d1c5e] hover:bg-[#2e1743]/50">
                  <td className="py-2 px-3">{cat.name}</td>
                  <td className="py-2 px-3">{cat.slug || "—"}</td>
                  <td className="py-2 px-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-gray-400">
                    No categories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
