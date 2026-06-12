import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { ArrowLeft, Menu, X, Briefcase, Clock ,View} from "lucide-react"; // 👈 เพิ่มไอคอนใหม่

const Career_Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Careers", icon: <Briefcase size={18} />, href: "." }, 
    { name: "History Careers", icon: <Clock size={18} />, href: "history_careers" },
    { name: "View Careers", icon: <View size={18} />, href: "view_careers" },

  ];
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-100 via-blue-50 to-orange-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 bg-gradient-to-b from-blue-900 to-orange-100 text-white shadow-xl fixed h-full flex-col">
        <div className="p-6 border-b border-white/30 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-200 transition"
            title="Back to Home"
          >
            <ArrowLeft size={22} />
          </button>
          <h1 className="text-xl font-bold tracking-wide text-orange-400">FINA Career</h1>
        </div>

        <div className="p-6 border-b border-white/30 flex flex-col items-center space-y-3">
          <SignedIn>
            <UserButton
              appearance={{ elements: { userButtonAvatarBox: "w-16 h-16 ring-2 ring-white rounded-full" } }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" appearance={{ elements: { devBadge: "hidden" } }}>
              <button className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "."}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-white/25 text-orange-200 font-semibold"
                    : "text-white/90 hover:bg-white/15 hover:text-white"
                }`
              }
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 text-center text-xs text-orange-500/80 border-t border-white/20">
          © 2025 FINA Career Portal v1.0
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 from-blue-500 to-orange-400 flex items-center justify-between p-4 text-blue-900 shadow">
        <div className="flex items-center justify-around w-full gap-4">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <ArrowLeft size={22} />
          </button>
          <img src="/fina-logo.png" alt="About us" className="w-16 h-auto" />
          <div className="flex items-center justify-between w-full">
            <h2 className="text-3xl font-extrabold text-blue-900">Careers</h2>
          </div>

          <UserButton
            appearance={{ elements: { userButtonAvatarBox: "w-14 h-14 ring-2 ring-white rounded-full" } }}
          />
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <aside className="md:hidden fixed top-16 left-0 w-full bg-slate-300 text-orange-500 font-bold shadow z-40 flex flex-col p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "."}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive ? "bg-white/25 text-white font-semibold" : "hover:bg-white/20"
                }`
              }
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 overflow-y-auto p-6 mt-16 md:mt-0">
        <header className="mb-8 pb-4 border-b border-blue-200 flex items-center gap-4"></header>
        <div className="bg-white p-8 rounded-2xl shadow-lg min-h-[500px] transition-all duration-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Career_Layout;
