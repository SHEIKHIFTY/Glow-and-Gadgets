"use client";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import CategorySidebar from "@/components/CategorySidebar";
import { useCart } from "@/context/cartcontext";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, cartItems = [] } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products`);
        const data = await res.json();
        // Find the product by MongoDB _id
        const found = data.find((p) => p._id === id);
        setProduct(found || null);
      } catch (err) {
        console.error("Failed to load product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <p className="text-center py-10 text-white">Loading product...</p>;
  if (!product) return <div className="text-center py-10 text-red-400 text-xl">Product not found</div>;

  const productQuantity = cartItems.find((item) => item._id === product._id)?.quantity || 0;

  const handleAddToCart = () => addToCart(product);

  const handleOrderNow = () => {
    if (cartItems.length === 0) addToCart(product);
    router.push("/checkout");
  };

  return (
    <div className="flex min-h-fit p-8 mt-10 bg-gradient-to-br from-[#10002b] via-[#240046] to-[#3c096c] text-white relative">
      <CategorySidebar />

      <motion.div
        className="flex flex-col md:flex-row items-center justify-center flex-1 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
       <div className="relative w-64 h-64 sm:w-80 md:w-96 lg:w-[450px] sm:h-80 md:h-96 lg:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-[#3a0ca3]">
  {product.images && product.images[0] ? (
    <img
      src={product.images[0]} // works for both local (/images/...) or full URL
      alt={product.title}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
      No Image
    </div>
  )}
</div>


        <div className="mt-6 md:mt-0 md:ml-10 max-w-md space-y-4">
          <p className="text-sm uppercase tracking-wide text-[#9d4edd] font-semibold">
            {product.category || "Uncategorized"}
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold">{product.title}</h1>

          <div className="flex items-center space-x-3">
            <p className="text-yellow-400">⭐ {product.rating || 4} / 5</p>
            <span className="text-sm text-gray-300">{product.stock || "In Stock"}</span>
          </div>

          <div className="border-t border-[#5a189a]/40 my-2" />

          <div>
            <p className="text-2xl text-[#FF00FF] font-semibold">
              {product.price}৳
            </p>
            {product.discount && (
              <p className="text-lg text-[#1E90FF]">Discount: {product.discount}%</p>
            )}
          </div>

          <div className="border-t border-[#5a189a]/40 my-2" />

          <p className="text-gray-300 leading-relaxed">{product.description}</p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#1E90FF] hover:bg-[#FF00FF] text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              ➕ Add to Cart {productQuantity > 0 && `(${productQuantity})`}
            </button>
            <button
              onClick={handleOrderNow}
              className="flex-1 bg-gradient-to-r from-[#FF00FF] to-[#1E90FF] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
            >
              🛒 Order Now
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
