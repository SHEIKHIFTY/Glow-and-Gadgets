"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import CategorySidebar from "@/components/CategorySidebar";
import { motion } from "framer-motion";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products/byCategory/${categoryName}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [categoryName]);

  return (
    <div className="flex min-h-fit p-8 mt-14 bg-gradient-to-br from-[#10002b] via-[#240046] to-[#3c096c] text-white p-6 relative">
      <CategorySidebar />
      <div className="flex-1 sm:ml-72">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[#FF00FF] drop-shadow-[0_0_10px_#FF00FF] px-4">
          {decodeURIComponent(categoryName)}
        </h1>

        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-300">No products found in this category.</p>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2 } } }}
          >
            {products.map((product) => (
              <motion.div
                key={product._id}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
