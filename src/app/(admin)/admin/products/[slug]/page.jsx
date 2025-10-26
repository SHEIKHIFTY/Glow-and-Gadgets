"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (!product) return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-white">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img src={product.images?.[0] || "/placeholder.png"} alt={product.title} className="w-72 h-72 object-cover rounded-xl shadow-lg" />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-400 mb-4">{product.description}</p>
          <p className="text-lg font-semibold mb-4">${product.price}</p>
          <button className="bg-[#FF00FF] text-white px-6 py-2 rounded-full hover:bg-[#1E90FF] transition">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
