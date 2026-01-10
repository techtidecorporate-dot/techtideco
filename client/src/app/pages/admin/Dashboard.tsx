import React from "react";
import { useAuth } from "@/app/context/AuthContext";
import { Users, Briefcase, BookOpen, Mail, LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  color,
}) => (
  <div className="bg-[#16161a] p-6 rounded-2xl border border-white/5 shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
    <h3 className="text-gray-400 text-sm font-medium">{label}</h3>
    <p className="text-3xl font-bold mt-1">{value}</p>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Welcome back, {user?.name}!</h2>
        <p className="text-gray-400 mt-1">Here is what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Users"
          value="12"
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          label="Job Applications"
          value="25"
          icon={Briefcase}
          color="bg-purple-500"
        />
        <StatCard
          label="Blog Posts"
          value="8"
          icon={BookOpen}
          color="bg-green-500"
        />
        <StatCard
          label="Messages"
          value="48"
          icon={Mail}
          color="bg-orange-500"
        />
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#16161a] p-8 rounded-2xl border border-white/5">
          <h3 className="text-xl font-bold mb-6">Quick Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <span>New Team Member added</span>
              <span className="text-xs text-gray-500">2h ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <span>Contact form entry</span>
              <span className="text-xs text-gray-500">5h ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
              <span>Blog post draft created</span>
              <span className="text-xs text-gray-500">Yesterday</span>
            </div>
          </div>
        </div>

        <div className="bg-[#16161a] p-8 rounded-2xl border border-white/5">
          <h3 className="text-xl font-bold mb-6">Resources</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-[#453abc]/20 to-transparent border border-[#453abc]/30 rounded-xl">
              <h4 className="font-bold text-[#60c3e3]">Guide</h4>
              <p className="text-xs text-gray-400 mt-1">
                How to manage teams and content.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-[#60c3e3]/20 to-transparent border border-[#60c3e3]/30 rounded-xl">
              <h4 className="font-bold text-[#453abc]">Support</h4>
              <p className="text-xs text-gray-400 mt-1">
                Contact technical administration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
