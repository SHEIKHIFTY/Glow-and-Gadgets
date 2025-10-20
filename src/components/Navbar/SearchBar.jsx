"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) router.push(`/products?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full text-black px-4 py-2 pr-10 bg-[#e5e4ec] border border-[#7B2FF7]/50 rounded-full shadow-inner placeholder-gray-400 focus:outline-none text-sm sm:text-base focus:ring-2 focus:ring-[#FF00FF]"
      />
      <button
        type="submit"
        className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#070429] p-2 rounded-full text-[#FF00FF] hover:text-[#1E90FF] transition flex items-center justify-center"
      >
        <Search className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-[0_0_8px_#FF00FF]" />
      </button>
    </form>
  );
}
