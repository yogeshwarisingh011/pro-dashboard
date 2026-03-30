"use client";
import { LayoutDashboard, ShoppingCart, Users, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/inventory" },
    { name: "Products", icon: ShoppingCart, path: "/products" },
    { name: "Customers", icon: Users, path: "/customers" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      <div className="w-64 h-screen bg-slate-900 text-white p-5 flex flex-col border-r border-slate-800">
        <h1 className="text-2xl font-bold mb-10 text-blue-400">ProDash</h1>

        <nav className="flex-1">
          {menuItems.map((item) => (
            <Link
              href={item.path}
              key={item.name}
              className={`flex items-center gap-3 p-3 mb-2 rounded-lg transition-colors ${
                pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-400"
              }`}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SideBar;
