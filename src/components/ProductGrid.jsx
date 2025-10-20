"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        // Ensure data is array
        if (Array.isArray(data)) setProducts(data);
        else if (data?.product) setProducts([data.product]);
        else setProducts([]);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (products.length === 0) return <p className="text-center mt-10">No products found.</p>;

  return (
    <div className="w-full">
      <motion.h2
        className="text-2xl sm:text-3xl font-extrabold text-left mb-6 sm:mb-4 mt-10 sm:mt-12 pt-10 sm:px-0"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <span className="text-[#1E90FF] drop-shadow-[0_0_10px_#1E90FF]">Trending</span>{" "}
        <span className="text-[#FF00FF] drop-shadow-[0_0_10px_#FF00FF]">Products</span>
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 sm:gap-6 justify-items-start px-2 sm:px-0 py-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {products.map((p) => (
          <motion.div key={p._id} variants={cardVariants} className="w-full">
            <Link href={`/products/${p._id}`}>
              <ProductCard product={p} />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
