"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function AdminSidebar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
  };

  const handleLinkClick = (path) => {
    router.push(path);
    setOpen(false); // close menu after click
  };

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
       <button
  onClick={() => setOpen(true)}
  className="fixed top-24 left-4 p-2 bg-[#0a0411] rounded shadow text-white z-50"
>
  <Menu className="w-6 h-6" />
</button>

      </div>

      {/* Mobile Slide-down Menu */}
      {open && (
        <div className="sm:hidden fixed top-0 left-0 w-full bg-[#0a0411] text-white z-50 shadow-lg p-4 pt-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <button onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-4">
            <button onClick={() => handleLinkClick("/admin")} className="text-left">Dashboard</button>
            <button onClick={() => handleLinkClick("/admin/products")} className="text-left">Products</button>
            <button onClick={() => handleLinkClick("/admin/orders")} className="text-left">Orders</button>
            <button onClick={() => handleLinkClick("/admin/categories")} className="text-left">Categories</button>
            <button onClick={handleLogout} className="mt-4 bg-red-600 py-2 rounded w-full">Logout</button>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex w-60 bg-[#0a0411] border-r border-[#221035] min-h-screen p-4 pt-10 mt-12 flex-col">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <nav className="flex flex-col gap-3">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products">Products</Link>
          <Link href="/admin/orders">Orders</Link>
          <Link href="/admin/categories">Categories</Link>
          <button onClick={handleLogout} className="mt-4 bg-red-600 py-2 rounded">
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
