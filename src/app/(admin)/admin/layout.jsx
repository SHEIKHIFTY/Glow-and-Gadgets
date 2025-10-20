"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { user, loading } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Redirect unauthorized users to login (only if not already on login page)
  useEffect(() => {
    if (!loading && !user && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    );
  }

  // Only show sidebar if user is logged in and not on login page
  const showSidebar = pathname !== "/admin/login" && user;

  return (
    <div className="flex min-h-screen bg-[#0d0b18] text-white">
      {showSidebar && <AdminSidebar />}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
