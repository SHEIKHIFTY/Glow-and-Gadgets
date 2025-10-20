// src/components/admin/AdminHeader.jsx
"use client";
import { useState } from "react";
import axios from "axios";

export default function AdminHeader({ title }) {
  const [user, setUser] = useState(() => (typeof window !== "undefined" ? localStorage.getItem("admin_user") : null));

  const logout = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setUser(null);
    location.reload();
  };

  const promptLogin = async () => {
    const username = prompt("Admin username:");
    const password = prompt("Admin password:");
    if (!username || !password) return;
    try {
      const res = await axios.post("/admin/api/auth", { username, password });
      const token = res.data.token;
      localStorage.setItem("admin_token", token);
      localStorage.setItem("admin_user", username);
      setUser(username);
      alert("Logged in");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Hi, {user}</span>
            <button onClick={logout} className="px-3 py-1 bg-red-600 rounded">Logout</button>
          </div>
        ) : (
          <button onClick={promptLogin} className="px-3 py-1 bg-blue-600 rounded">Login</button>
        )}
      </div>
    </div>
  );
}
