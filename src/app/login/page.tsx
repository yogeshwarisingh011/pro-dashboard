"use client";
import { useAuth } from "@/src/hooks/useAuth";
import { loginSuccess } from "@/src/redux/authSlice";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  // const { setUser } = useAuth();
  const router = useRouter();

  const dispatch = useDispatch(); // Ye hamara Delivery Boy hai

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Maan lo user ne 'Yogeshwari' type kiya
    const userData = { name: "Yogeshwari Singh" };

    // 🚀 REDUX MEIN DATA BHEJO
    dispatch(loginSuccess(userData));
    // 1. Koi API nahi, bas direct login!
    // setUser({ name: userName });

    // 2. LocalStorage mein bhi save kar lo (Persistence ke liye)
    localStorage.setItem("userName", userName);

    // 3. Dashboard par bhejo
    router.push("/inventory");
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">
            Please enter your details to login
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="username.surname"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
