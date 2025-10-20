"use client";

import { useState, useEffect } from "react";

export function useAdminAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminUser = localStorage.getItem("admin_user");
    if (adminUser) setUser(JSON.parse(adminUser));
    setLoading(false);
  }, []);

  return { user, loading };
}
