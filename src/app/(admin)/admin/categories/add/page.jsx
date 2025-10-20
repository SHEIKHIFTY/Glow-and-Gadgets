"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", slug: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add category");
      setMessage("✅ Category added!");
      setForm({ name: "", slug: "" });
      setTimeout(() => router.push("/admin/categories"), 1000);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl font-bold mb-6">Add Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Category Name"
          className="w-full p-3 rounded-lg bg-[#2e1743]"
          required
        />
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug (for URL)"
          className="w-full p-3 rounded-lg bg-[#2e1743]"
          required
        />
        <button className="w-full py-3 bg-purple-600 rounded-lg font-bold">
          Add Category
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
