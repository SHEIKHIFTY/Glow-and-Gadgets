"use client";
import { motion } from "framer-motion";
import { Sparkles, Grid, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CategorySidebar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    loadCategories();
  }, []);

  return (
    <>
      {/* Mobile Category Button */}
      <button
        className="fixed bottom-10 left-4 z-50 bg-[#3B0966] text-white p-3 rounded-full shadow-lg sm:hidden hover:bg-[#5E17EB] transition-all duration-300"
        onClick={() => setOpen(true)}
      >
        <Grid className="w-6 h-6 text-[#00BFFF]" />
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        className="hidden sm:flex fixed top-[79px] left-0 h-[calc(100vh-79px)] w-[300px] bg-[#3B0966]
                   text-white shadow-2xl flex-col overflow-hidden border-r-2 border-[#7B2FF7]"
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="sticky top-0 z-10 bg-[#3B0966] pt-6 px-4 pb-4 flex items-center gap-2 shadow-md">
          <Sparkles className="text-[#00BFFF] w-5 h-5 drop-shadow-[0_0_6px_#00BFFF]" />
          <h2 className="font-bold text-xl text-[#FF00FF] drop-shadow-[0_0_10px_#FF00FF]">
            Categories
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-5">
          <ul className="space-y-4 w-full">
            {categories.map((cat) => (
              <motion.li
                key={cat._id}
                className="cursor-pointer text-sm font-medium bg-[#1E1B4B]/60 hover:bg-[#2A156D] 
                           transition-all duration-300 rounded-lg py-2 px-3 flex items-center gap-2 hover:pl-4
                           hover:text-[#00BFFF] drop-shadow-[0_0_6px_#00BFFF]"
                whileHover={{ scale: 1.05 }}
              >
                <Link href={`/category/${encodeURIComponent(cat.slug)}`}>{cat.name}</Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.aside>

      {/* Mobile Slide-in Sidebar */}
      {open && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="overflow-y-auto fixed top-0 left-0 w-3/4 sm:hidden h-full bg-[#3B0966] z-50 p-0 shadow-2xl border-r-2 border-[#7B2FF7] flex flex-col"
        >
          <div className="sticky top-0 z-10 bg-[#3B0966] pt-6 px-5 pb-4 flex justify-between items-center shadow-md">
            <h2 className="font-bold text-xl text-[#FF00FF] drop-shadow-[0_0_10px_#FF00FF] flex items-center gap-2">
              <Sparkles className="text-[#00BFFF] w-5 h-5" /> Categories
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="text-[#FF00FF] hover:text-[#1E90FF] transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <ul className="flex-1 overflow-y-auto mt-4 px-5 pt-4 pb-6 space-y-4">
            {categories.map((cat) => (
              <motion.li
                key={cat._id}
                className="cursor-pointer text-sm font-medium bg-[#1E1B4B]/60 hover:bg-[#2A156D] 
                           transition-all duration-300 rounded-lg py-2 px-3 flex items-center gap-2 hover:pl-4
                           hover:text-[#00BFFF] drop-shadow-[0_0_6px_#00BFFF]"
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  href={`/category/${encodeURIComponent(cat.slug)}`}
                  onClick={() => setOpen(false)}
                >
                  {cat.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </>
  );
}
