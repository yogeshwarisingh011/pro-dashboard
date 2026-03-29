"use client";
import { LayoutDashboard, ShoppingCart, Users, Settings } from "lucide-react";

const SideBar = () => {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Products", icon: ShoppingCart },
    { name: "Customers", icon: Users },
    { name: "Settings", icon: Settings },
  ];

  return (
    <>
      <div className="w-64 h-screen bg-slate-900 text-white p-5 flex flex-col border-r border-slate-800">
        <h1 className="text-2xl font-bold mb-10 text-blue-400">ProDash</h1>

        <nav className="flex-1">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 p-3 mb-2 rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SideBar;
