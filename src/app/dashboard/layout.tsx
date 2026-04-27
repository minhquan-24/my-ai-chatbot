"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, MessageSquare, MapPin, Calculator, Home, BookPlus } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems =[
    { name: "Chat tư vấn AI", icon: MessageSquare, href: "/dashboard/chat" },
    { name: "Tìm cơ sở Y tế", icon: MapPin, href: "/dashboard/hospitals" },
    { name: "Cẩm nang Sơ cứu", icon: BookPlus, href: "/dashboard/first-aid" },
    { name: "Công cụ tính BMI", icon: Calculator, href: "/dashboard/bmi" }, 
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <Activity className="w-6 h-6 text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-800">MediCloud</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-all">
            <Home className="w-5 h-5 text-gray-400" />
            <span className="font-medium">Về trang chủ</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-slate-50/50">
        {children}
      </main>
    </div>
  );
}