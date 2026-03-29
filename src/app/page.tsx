"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // 🔄 Check karo user login hai ya nahi
    if (user) {
      // Agar login hai, toh Inventory par bhej do
      router.push("/inventory");
    } else {
      // Agar login nahi hai, toh Login page par bhej do
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          Loading Pro Dashboard...
        </h1>
        <div className="mt-4 animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  );
}
