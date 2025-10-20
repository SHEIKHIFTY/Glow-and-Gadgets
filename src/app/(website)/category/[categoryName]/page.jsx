"use client";
import { useParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import CategorySidebar from "@/components/CategorySidebar";

// Example product list
const products = [
  { id: 1, name: "Smart LED Lamp", price: "177৳", discount: "3%", image: "/led.jpg", rating: 5, category: "Electronics" },
  { id: 2, name: "Mini Fan", price: "167৳", discount: "3%", image: "/product2.jpg", rating: 4, category: "Electronics" },
  { id: 3, name: "Trendy Bag", price: "139৳", discount: "3%", image: "/product3.jpg", rating: 3, category: "Bags" },
  { id: 4, name: "Shoes 1", price: "199৳", discount: "5%", image: "/product4.jpg", rating: 4, category: "Shoes" },
  { id: 5, name: "Shoes 2", price: "229৳", discount: "10%", image: "/product5.jpg", rating: 5, category: "Shoes" },
  {id: 6, name: "Necklace", price: "249৳", discount: "15%", image: "/product6.jpg", rating: 4, category: "Jewelry" },
  // add more products as needed
];

export default function CategoryPage() {
  const { categoryName } = useParams();
  const filteredProducts = products.filter(p => p.category === categoryName);

  return (
    <div className="flex min-h-fit p-8 mt-14 bg-gradient-to-br from-[#10002b] via-[#240046] to-[#3c096c] text-white p-6 relative">
      
      {/* Sidebar (desktop + mobile button) */}
      <CategorySidebar />

      {/* Category Products */}
      <div className="flex-1 sm:ml-72">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[#FF00FF] drop-shadow-[0_0_10px_#FF00FF] px-4">
          {categoryName}
        </h1>

        {filteredProducts.length === 0 ? (
          <p className="text-gray-300">No products found in this category.</p>
        ) : (
          <motion.div
           className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2 } } }}
          >
            {filteredProducts.map(product => (
              <motion.div
                key={product.id}
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
