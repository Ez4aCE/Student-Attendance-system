"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Important for cookies
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // 1. SAVE LOGIN STATE
        localStorage.setItem("isAdmin", "true"); 
        
        alert("Login successful");
        // 2. Force a reload so the Navbar updates immediately
        window.location.href = "/admin/attendance"; 
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Network error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Admin Portal</h1>
        <p className="text-sm text-gray-500 mt-2">Sign in to manage attendance</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 ml-1">Username</label>
          <input
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2 ml-1">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm focus:bg-white focus:border-[#3dd8ff] focus:ring-2 focus:ring-[#3dd8ff]/50 outline-none transition-all"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#8dce27] hover:bg-[#7bc21e] text-gray-900 font-bold py-3.5 rounded-xl shadow-lg shadow-[#8dce27]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
          ) : (
            "Login"
          )}
        </button>
      </div>
    </div>
  );
}