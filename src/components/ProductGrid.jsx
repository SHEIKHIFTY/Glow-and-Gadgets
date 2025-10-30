"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useEffect, useState, useRef } from "react";

// Motion variants
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
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        if (!isMountedRef.current) return;
        if (Array.isArray(data)) setProducts(data);
        else if (data?.product) setProducts([data.product]);
        else setProducts([]);
      } catch (err) {
        console.error("Failed to load products:", err);
        if (isMountedRef.current) setProducts([]); // graceful fallback
      } finally {
        if (isMountedRef.current) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      isMountedRef.current = false; // cleanup
    };
  }, []);

  // Loading state
  if (loading) {
    return <p className="text-center mt-16">Loading products...</p>;
  }

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

      {products.length === 0 ? (
        <p className="text-center text-gray-400 mt-16">
          No products available at the moment.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 justify-items-start px-2 sm:px-0 py-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <motion.div key={product._id} variants={cardVariants} className="w-full">
              <Link href={`/products/${product._id}`}>
                <ProductCard product={product} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
