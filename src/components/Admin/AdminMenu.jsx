"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X, Home, Box, ShoppingCart, Layers, LogOut } from "lucide-react";

export default function Sidebar() {
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
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Products", href: "/admin/products", icon: Box },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Categories", href: "/admin/categories", icon: Layers },
  ];

  return (
    <>
      {/* Mobile Hamburger Menu */}
      <div className="sm:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setOpen(true)}
          className="p-2 bg-gradient-to-br from-[#6806aa] to-[#7B2FF7] rounded-full shadow-lg text-white transition-all hover:scale-105"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      {open && (
        <div className="sm:hidden fixed top-0 left-0 w-full h-full bg-[#0a0411] text-white z-50 p-6 flex flex-col animate-slide-down">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-[#FF00FF]">Admin Panel</h1>
            <button onClick={() => setOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => handleLinkClick(item.href)}
                  className="flex items-center gap-3 text-white hover:text-[#FF00FF] transition-colors text-lg font-medium"
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </button>
              );
            })}

            <button
              onClick={handleLogout}
              className="mt-6 bg-red-600 hover:bg-red-700 py-2 rounded-lg text-white font-medium transition"
            >
              <div className="flex items-center justify-center gap-2">
                <LogOut className="w-5 h-5" />
                Logout
              </div>
            </button>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex w-64 bg-gradient-to-b from-[#0a0411] to-[#1b0532] text-white border-r border-[#221035] min-h-screen p-6 flex-col">
        <h1 className="text-3xl font-bold mb-10 text-[#FF00FF] drop-shadow-lg">
          Admin Panel
        </h1>

        <nav className="flex-1 flex flex-col gap-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-white hover:text-[#FF00FF] hover:bg-[#7B2FF7]/20 transition-all ${
                  router.pathname === item.href
                    ? "bg-[#7B2FF7]/30 text-[#FF00FF]"
                    : ""
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 py-2 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </aside>
    </>
  );
}
