"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";
import ProductForm from "@/components/products/ProductForm";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Load product by ID
  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  // Handle form submit
  async function handleSubmit(form) {
    try {
      const slug = slugify(form.title, { lower: true, strict: true });

      const body = {
        ...form,
        slug,
        price: Number(form.price || 0),
        stock: Number(form.stock || 0),
        rating: Number(form.rating || 0),
        images: Array.isArray(form.images)
          ? form.images
          : form.images
          ? form.images.split(",").map((i) => i.trim())
          : [],
      };

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update product");

      alert("✅ Product updated successfully!");
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  if (loading) return <p className="text-white text-center mt-10 pt-8">Loading...</p>;
  if (!product) return <p className="text-red-500 text-center mt-10">Product not found</p>;

  return (
    <div>
      <ProductForm product={product} onSubmit={handleSubmit} />
    </div>
  );
}
