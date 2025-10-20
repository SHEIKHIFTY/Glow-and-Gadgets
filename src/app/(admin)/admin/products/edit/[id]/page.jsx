"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      const res = await fetch("/api/products");
      const data = await res.json();
      const found = data.find((p) => p._id === params.id);
      setProduct(found);
    }
    loadProduct();
  }, [params.id]);

  async function handleSubmit(form) {
    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: params.id, ...form }),
    });
    router.push("/admin/products");
  }

  return product ? (
    <ProductForm product={product} onSubmit={handleSubmit} />
  ) : (
    <p className="text-center mt-10 text-white">Loading...</p>
  );
}
