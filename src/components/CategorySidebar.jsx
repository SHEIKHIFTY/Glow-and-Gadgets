// src/components/CategorySidebar.jsx
"use client";
import { motion } from "framer-motion";
import { Sparkles, Grid, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function CategorySidebar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to load categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    loadCategories();
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Prevent body scroll when sidebar open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Mobile Button: stays visible only when sidebar is closed */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open categories"
          className={`group fixed bottom-6 left-4 p-4 rounded-full shadow-lg sm:hidden
            bg-[#0a0411] border border-[#7B2FF7]/50 
            text-[#00BFFF] 
            transition-all duration-300 ease-in-out
            hover:bg-gradient-to-r hover:from-[#7B2FF7] hover:to-[#FF00FF]
            hover:text-white 
            hover:shadow-[0_0_20px_#FF00FF,0_0_40px_#7B2FF7]
            animate-pulse hover:animate-none
            z-[60]`} // low enough to be covered by overlay/sidebar
        >
          <Grid className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow-[0_0_8px_#00BFFF] transition-transform duration-300 group-hover:rotate-90" />
        </button>
      )}

      {/* Desktop Sidebar (unchanged except top/bottom adjustment) */}
<motion.aside
  className="hidden sm:flex fixed top-0 left-0 h-screen w-[300px] bg-[#3B0966] text-white shadow-2xl flex-col overflow-hidden border-r-2 border-[#7B2FF7]"
  initial={{ x: -60, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.6 }}
>
  <div className="sticky top-[82px] z-10 bg-[#3B0966] pt-2 px-4 pb-4 flex items-center gap-2 shadow-md">
    <Sparkles className="text-[#00BFFF] w-5 h-5" />
    <h2 className="font-bold text-xl text-[#FF00FF]">Categories</h2>
  </div>

  {/* Scrollable list starts below the sticky header */}
  <div className="flex-1 overflow-y-auto px-4 pb-5 mt-[66px]">
    <ul className="space-y-4 w-full mt-4 pt-4">
      {categories.map((cat) => (
        <motion.li
          key={cat._id}
          whileHover={{ scale: 1.03, x: 4 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="relative cursor-pointer text-sm font-medium text-white
                     bg-gradient-to-r from-[#1E1B4B]/60 to-[#2A156D]/60
                     rounded-lg py-2 px-3 flex items-center gap-2
                     shadow-[0_0_5px_rgba(0,191,255,0.3)]
                     hover:shadow-[0_0_10px_#00BFFF,0_0_20px_#7B2FF7]
                     transition-all duration-300 overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#00BFFF]/20 via-[#7B2FF7]/20 to-transparent
                           opacity-0 hover:opacity-100 blur-xl transition-opacity duration-300"></span>

          <Link
            href={`/category/${encodeURIComponent(cat.slug)}`}
            className="relative z-10 flex-1 hover:text-[#00BFFF] transition-colors duration-150"
          >
            {cat.name}
          </Link>
        </motion.li>
      ))}
    </ul>
  </div>
</motion.aside>



      {/* Mobile Slide-in Sidebar + Overlay */}
      {open && (
        <>
          {/* Fullscreen overlay: sits above page and above the floating button */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[990] sm:hidden"
            aria-hidden
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="overflow-y-auto fixed top-0 left-0 w-3/4 sm:hidden h-full 
                       bg-[#3B0966] z-[1000] p-0 shadow-2xl border-r-2 border-[#7B2FF7] flex flex-col"
          >
            <div className="sticky top-0 z-20 bg-[#3B0966] pt-6 px-5 pb-4 flex justify-between items-center shadow-md">
              <h2 className="font-bold text-xl text-[#FF00FF] flex items-center gap-2">
                <Sparkles className="text-[#00BFFF] w-5 h-5" /> Categories
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-[#FF00FF] hover:text-[#1E90FF]"
                aria-label="Close categories"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <ul className="flex-1 overflow-y-auto mt-4 px-5 pt-4 pb-6 space-y-4">
              {categories.map((cat) => (
                <li key={cat._id} className="cursor-pointer">
                  <Link
                    href={`/category/${encodeURIComponent(cat.slug)}`}
                    onClick={() => setOpen(false)}
                    className="bg-gradient-to-r from-[#1E1B4B]/60 to-[#2A156D]/60
                   rounded-lg py-2 px-3 flex items-center gap-2
                   shadow-[0_0_5px_rgba(0,191,255,0.3)]
                   hover:shadow-[0_0_10px_#00BFFF,0_0_20px_#7B2FF7]
                   transition-all duration-300 overflow-hidden"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </>
  );
}
