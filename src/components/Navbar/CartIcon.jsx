"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cartcontext";

export default function CartIcon() {
  const { cartItems } = useCart() || [];

  const totalCount = (cartItems || []).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/checkout" className="relative group">
      <ShoppingCart className="w-6 h-6 text-[#FF00FF] group-hover:text-[#1E90FF] transition drop-shadow-[0_0_6px_#FF00FF]" />
      {totalCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#FF00FF] text-white text-xs px-1.5 py-0.5 rounded-full shadow-md">
          {totalCount}
        </span>
      )}
    </Link>
  );
}
