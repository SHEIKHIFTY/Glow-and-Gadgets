"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_user");
    router.push("/admin/login");
  };

  const handleLinkClick = (path) => {
    router.push(path);
    setOpen(false);
  };

  const menuItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Products", href: "/admin/products" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Categories", href: "/admin/categories" },
  ];

  return (
    <>
     {/* Mobile Menu Button */}
<div className="sm:hidden fixed top-20 left-5 z-50">
  <button
    onClick={() => setOpen(true)}
    className="w-10 h-10 flex items-center justify-center rounded-full 
               bg-gradient-to-r from-fuchsia-600 via-purple-700 to-indigo-700 
               shadow-[0_0_14px_rgba(168,85,247,0.6)] hover:shadow-[0_0_25px_rgba(168,85,247,0.9)] 
               text-white transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/10"
  >
    <span className="text-2xl font-bold">☰</span>
  </button>
</div>


      {/* Mobile Sidebar */}
      {open && (
        <div className="sm:hidden fixed inset-0 bg-[#0d0b18] z-50 p-6 flex flex-col animate-fadeIn">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-purple-400">Admin Panel</h1>
            <button
              onClick={() => setOpen(false)}
              className="text-white text-2xl hover:text-purple-400 transition"
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-col gap-5">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleLinkClick(item.href)}
                className="text-lg font-medium text-white hover:text-purple-400 transition-colors"
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="mt-6 bg-red-600 hover:bg-red-700 py-2 rounded-lg text-white font-medium transition"
            >
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex w-64 bg-gradient-to-b from-[#0a0411] to-[#1b0532] text-white border-r border-[#221035] min-h-screen p-6 flex-col">
        <h1 className="text-3xl font-bold mb-10 text-purple-400">Admin Panel</h1>

        <nav className="flex-1 flex flex-col gap-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 rounded-lg text-white hover:text-purple-400 hover:bg-purple-600/20 transition-all"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 py-2 rounded-lg text-white font-medium transition"
        >
          Logout
        </button>
      </aside>
    </>
  );
}
