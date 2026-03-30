"use client";
import SideBar from "../components/SideBar";
import "./globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Providers from "../components/Providers";
import { AuthProvider } from "../context/AuthContext";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <html lang="en">
      <body className="" suppressHydrationWarning>
        {/* 🔥 Hamara naya React Query Provider pura client handle karega! */}
        <Provider store={store}>
          <AuthProvider>
            <Providers>
              {isLoginPage ? (
                // Sirf Login Form dikhega
                <main>{children}</main>
              ) : (
                // Poora Dashboard Structure dikhega
                <div className="flex h-screen bg-gray-50">
                  <SideBar />
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <Navbar />
                    <main className="flex-1 overflow-y-auto p-4">
                      {children}
                    </main>
                  </div>
                </div>
              )}
            </Providers>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
