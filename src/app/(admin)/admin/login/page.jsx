"use client";

import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    // Replace with your real validation
    if (username === "admin" && password === "admin1234") {
      localStorage.setItem("admin_user", JSON.stringify({ username: "admin" }));
      router.push("/admin"); // redirect to dashboard
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#0d0b18] text-white">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 bg-[#1a1630] p-8 rounded"
      >
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-2 rounded bg-[#0d0b18] border border-purple-600"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 rounded bg-[#0d0b18] border border-purple-600"
          required
        />
        <button className="bg-purple-600 px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}
