import React from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/app/context/AuthContext";
import {
  Users,
  Briefcase,
  BookOpen,
  Mail,
  LogOut,
  LayoutDashboard,
  Box,
  Handshake,
} from "lucide-react";

interface SidebarLinkProps {
  to: string;
  icon: any;
  label: string;
  active: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon: Icon,
  label,
  active,
}) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-6 py-4 transition-all ${
      active
        ? "bg-[#453abc] text-white"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  if (!user) {
    navigate("/signin");
    return null;
  }

  const menuItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/users", icon: Users, label: "Users" },
    { to: "/admin/job-positions", icon: Briefcase, label: "Job Positions" },
    { to: "/admin/jobs", icon: Briefcase, label: "Job Applications" },
    { to: "/admin/teams", icon: Users, label: "Teams" },
    { to: "/admin/blogs", icon: BookOpen, label: "Blogs" },
    { to: "/admin/services", icon: Box, label: "Services" },
    { to: "/admin/partners", icon: Handshake, label: "Partners" },
    { to: "/admin/messages", icon: Mail, label: "Messages" },
  ];

  return (
    <div className="flex min-h-screen bg-[#0a0a0c] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 flex flex-col">
        <div className="p-8">
          <h1 className="text-2xl font-poppins font-semibold">
            Tech<span className="text-[#60c3e3]">Tide</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <SidebarLink
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.to}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#453abc] to-[#60c3e3] flex items-center justify-center text-xs font-bold">
              {user?.name?.[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#0f0f12]">
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
