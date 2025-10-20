"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    featured: false,
    images: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          images: form.images ? form.images.split(",").map((i) => i.trim()) : [],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add product");

      setMessage("✅ Product added successfully!");
      setForm({
        title: "",
        slug: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        featured: false,
        images: "",
      });

      setTimeout(() => router.push("/admin/products"), 1000);
    } catch (err) {
      console.error("Add product error:", err);
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0411] text-white px-6 py-10 flex justify-center">
      <div className="w-full mt-12 py-10 max-w-2xl bg-[#1a0b2a] p-8 rounded-2xl shadow-2xl border border-[#2e1743]">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-400">
          ➕ Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-300 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 bg-[#2e1743] border border-[#3d1c5e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-gray-300 mb-2">Slug *</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="w-full p-3 bg-[#2e1743] border border-[#3d1c5e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="example: coffee-latte"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 bg-[#2e1743] border border-[#3d1c5e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-300 mb-2">Price (৳) *</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-3 bg-[#2e1743] border border-[#3d1c5e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-300 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-3 bg-[#2e1743] border border-[#3d1c5e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-300 mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full p-3 bg-[#2e1743] border border-[#3d1c5e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="accent-purple-600 w-5 h-5"
            />
            <label className="text-gray-300">Mark as Featured</label>
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-300 mb-2">Images (comma separated)</label>
            <input
              type="text"
              name="images"
              value={form.images}
              onChange={handleChange}
              className="w-full p-3 bg-[#2e1743] border border-[#3d1c5e] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            {loading ? "Adding..." : "Add Product"}
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
    </div>
  );
}
