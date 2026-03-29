"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react"; // Sundar icons ke liye
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    // 1. Memory saaf karo
    setUser(null);
    // 2. LocalStorage se token hatao
    localStorage.removeItem("token");
    // 3. Wapas login par bhej do
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
      {/* Left Side: Welcome Message */}
      <div className="flex items-center gap-2">
        <div className="bg-blue-100 p-2 rounded-full">
          <User size={20} className="text-blue-600" />
        </div>
        <span className="text-gray-700 font-medium">
          Welcome,{" "}
          <span className="text-blue-600 font-bold">
            {user ? user.name : "Guest"}
          </span>
        </span>
      </div>

      {/* Right Side: Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-all font-medium border border-red-100"
      >
        <LogOut size={18} />
        Logout
      </button>
    </nav>
  );
}
