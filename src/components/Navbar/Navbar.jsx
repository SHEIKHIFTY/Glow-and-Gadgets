"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";
import AccountPopup from "./AccountPopup";
import FeedbackPopup from "./FeedbackPopup";
import CartIcon from "./CartIcon";
import { useCart } from "@/context/cartcontext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useCart() || {};
  const totalCount = (cartItems || []).reduce((sum, item) => sum + item.quantity, 0);

  // helper to close menu after click
  const handleMenuClick = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#070429]/95 backdrop-blur-md z-50 shadow-lg border-b border-[#7B2FF7]/40">
      <div className="max-w-8xl mx-auto pb-6 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Link
            href="/"
            onClick={handleMenuClick}
            className="text-lg sm:text-2xl font-extrabold tracking-wider text-left leading-tight"
          >
            <span className="text-[#1E90FF] drop-shadow-[0_0_10px_#1E90FF]">Glow</span>
            <span className="text-[#1E90FF] drop-shadow-[0_0_10px_#1E90FF] mx-1">&</span>
            <span className="text-[#FF0080] drop-shadow-[0_0_10px_#FF00FF]">Gadgets</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6">
          <SearchBar />
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-5">
          <FeedbackPopup />
          <CartIcon />
          <AccountPopup />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#FF00FF] hover:text-[#1E90FF] transition relative"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu (vertical icons) */}
     {menuOpen && (
  <div className="md:hidden px-4 pt-4 pb-4 flex flex-col gap-4 border-t border-[#7B2FF7]/40 bg-[#070429]/95 relative z-[60]">
    <div
      onClick={() => {
        setMenuOpen(false);
        setTimeout(() => document.querySelector("#feedback-btn")?.click(), 50);
      }}
    >
      <FeedbackPopup id="feedback-btn" />
    </div>

    <div
      onClick={() => {
        setMenuOpen(false);
        setTimeout(() => document.querySelector("#cart-btn")?.click(), 50);
      }}
    >
      <CartIcon id="cart-btn" />
    </div>

    <div
      onClick={() => {
        setMenuOpen(false);
        setTimeout(() => document.querySelector("#account-btn")?.click(), 50);
      }}
    >
      <AccountPopup id="account-btn" />
    </div>
  </div>
)}



      {/* Floating Cart Count on Mobile */}
      {totalCount > 0 && (
        <span
          className="sm:hidden fixed top-2 right-4 bg-[#FF00FF] text-white text-xs px-1.5 py-0.5 rounded-full shadow-md z-[100]"
        >
          {totalCount}
        </span>
      )}
    </nav>
  );
}
