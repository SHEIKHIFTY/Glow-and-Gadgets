"use client";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchSuggestions = async (q) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();

      const filtered = data.filter((p) =>
        p.title.toLowerCase().includes(q.toLowerCase())
      );

      setSuggestions(filtered);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search or Enter key
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Find exact match
    const exactMatch = suggestions.find(
      (p) => p.title.toLowerCase() === query.toLowerCase()
    );

    if (exactMatch) {
      router.push(`/products/${exactMatch._id}`); // ✅ Use _id
    } else {
      alert("Product not found");
    }

    setShowSuggestions(false);
    setQuery("");
  };

  // Handle clicking a suggestion
  const handleSuggestionClick = (id) => {
    router.push(`/products/${id}`); // ✅ Use _id
    setShowSuggestions(false);
    setQuery("");
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={inputRef} className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
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

      {/* Suggestions Dropdown */}
      {showSuggestions && query.trim() && (
        <div className="absolute mt-2 w-full bg-[#0E063A]/95 backdrop-blur-md border border-[#7B2FF7]/50 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-gray-400 text-sm text-center">Loading...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((product) => (
              <div
                key={product._id}
                onClick={() => handleSuggestionClick(product._id)} // ✅ Use _id
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-[#1E90FF]/20 transition"
              >
                <img
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product.title}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div>
                  <p className="text-sm text-white font-medium">
                    {highlightText(product.title, query)}
                  </p>
                  <p className="text-xs text-gray-400">${product.price}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-400 text-sm text-center">
              No products found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Highlight matching query text in results
function highlightText(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="text-[#FF00FF] font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
}
