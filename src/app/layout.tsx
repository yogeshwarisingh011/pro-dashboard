"use client";
import SideBar from "../components/SideBar";
import "./globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Providers from "../components/Providers";
import { AuthProvider } from "../context/AuthContext";
import LoginPage from "./login/page";
import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 🚫 Agar page '/login' hai, toh Sidebar nahi dikhayenge
  const isLoginPage = pathname === "/login";
  return (
    <html lang="en">
      <body className="" suppressHydrationWarning>
        {/* 🔥 Hamara naya React Query Provider pura client handle karega! */}
        <AuthProvider>
          <Providers>
            <div className="flex bg-slate-50 text-slate-900">
              {!isLoginPage && <SideBar />}
              <div className="w-full">
                {!isLoginPage && <Navbar />}
                <main className="flex-1 h-screen overflow-y-auto p-8">
                  {children}
                </main>
              </div>
            </div>

            <LoginPage />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
