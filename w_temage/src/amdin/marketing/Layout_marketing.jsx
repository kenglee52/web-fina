import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Image,
  Tag,
  LayoutGrid,
  Newspaper,
  LogOut,
  Infinity,
} from "lucide-react";
import Dashboard_Marketing from "./Dashboard_Marketing";

// 👉 import component จาก shadcn/ui
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const navItems = [
  { to: "/marketing-dashboard", icon: Image, label: "Slider Manage" },
  { to: "/marketing-dashboard/promotion_manage", icon: Tag, label: "Promotion Manage" },
  { to: "/marketing-dashboard/manage_showporp", icon: LayoutGrid, label: "Manage Showporp" },
  { to: "/marketing-dashboard/event_new_mange", icon: Newspaper, label: "Event And News" },
  { to: "/marketing-dashboard/faq_manage", icon: Newspaper, label: "FAQ" },
];

const Layout_marketing = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const Sidebar = () => (
    <aside className="w-64 h-full bg-gray-900 flex flex-col p-4 shadow-2xl transition-all duration-300 ease-in-out">
      {/* Logo */}
      <div className="flex items-center space-x-2 p-2 mb-8 border-b border-gray-700 pb-4">
        <Infinity className="w-8 h-8 text-indigo-400" />
        <span className="text-2xl font-extrabold text-white tracking-wider">
          Admin FINA
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/marketing-dashboard"}
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-gray-400 hover:bg-gray-700 hover:text-indigo-300"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button ใช้ AlertDialog */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="flex items-center justify-center space-x-3 p-3 rounded-xl mt-4 text-red-400 bg-gray-800 hover:bg-red-900/50 transition-colors duration-200 w-full">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out now?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                localStorage.removeItem("token"); // ✅ ล้าง token
                navigate("/login_admin"); // ✅ ไปหน้า login
              }}
            >
              Log Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Overlay Mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sidebar Mobile */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transform lg:hidden transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="mb-6 pb-4 border-b border-gray-200">
            <Dashboard_Marketing />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout_marketing;
