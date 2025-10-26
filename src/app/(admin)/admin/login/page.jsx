"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

 
  useEffect(() => {
    const adminUser = localStorage.getItem("admin_user");
    if (adminUser) {
      router.replace("/admin");
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === "sheikh" && password === "iamadmin003") {
      localStorage.setItem("admin_user", JSON.stringify({ username: "sheikh" }));
      router.replace("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0411] to-[#1b0532] relative px-4">
      <div className="relative w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg p-8 bg-[#1a1630] rounded-2xl shadow-2xl border border-[#7B2FF7]/30">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-[#FF00FF] text-center mb-6 drop-shadow-lg">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 sm:gap-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="p-3 rounded-xl bg-[#0d0b18] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-[#FF00FF] placeholder-gray-400 text-white text-sm sm:text-base"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl bg-[#0d0b18] border border-purple-600 focus:outline-none focus:ring-2 focus:ring-[#FF00FF] placeholder-gray-400 text-white text-sm sm:text-base"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF00FF] transition"
            >
              {showPassword ? <EyeOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Eye className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-[#7B2FF7] to-[#FF00FF] py-3 rounded-xl text-white font-semibold hover:scale-105 transition-transform text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs sm:text-sm mt-6">
          &copy; 2025 Admin Only
        </p>
      </div>

      {/* Background Circles */}
      <div className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-purple-700 rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-pink-600 rounded-full mix-blend-overlay filter blur-3xl opacity-40 animate-pulse"></div>
    </div>
  );
}
