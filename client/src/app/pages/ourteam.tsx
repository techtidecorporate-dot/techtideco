import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, TrendingUp, Users, Loader2 } from "lucide-react";
import LeaderCard from "../components/team/LeaderCard";
import TeamMemberCard from "../components/team/TeamMemberCard";
import { teamAPI, TeamMember } from "@/api";

const TeamOption1 = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const { data } = await teamAPI.getAll();
        setTeams(data);
      } catch (error) {
        console.error("Failed to fetch team data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  // Categorization logic
  const ceo = teams.find((m) => m.category === "CEO");
  const executives = teams.filter((m) =>
    ["CTO", "CFO", "COO", "Executive Leadership"].includes(m.category)
  );

  const getDepartmentData = (dept: string) => {
    const deptMembers = teams.filter((m) => m.department === dept);
    return {
      head: deptMembers.filter((m) => m.category === "Head"),
      senior: deptMembers.filter((m) => m.category === "Senior"),
      junior: deptMembers.filter((m) => m.category === "Junior"),
      intern: deptMembers.filter((m) => m.category === "Intern"),
    };
  };

  const devTeam = getDepartmentData("Development");
  const mktTeam = getDepartmentData("Marketing");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="w-12 h-12 text-[#453abc] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef2f7] font-inter mt-10 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-screen md:py-44 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#453abc]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#60c3e3]/10 rounded-full blur-[120px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center my-24 md:my-0"
          >
            <p className="font-poppins text-transparent bg-clip-text bg-gradient-to-r from-[#453abc] to-[#60c3e3] text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Our Team
            </p>
            <h1 className="text-5xl md:text-7xl font-poppins mb-4">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Leadership
              </span>
            </h1>
            <p className="text-[#6b7280] text-lg max-w-3xl mx-auto leading-relaxed">
              Organizational structure and team members
            </p>
          </motion.div>
        </div>

        {/* Leadership Section */}
        <div className="mb-20 mt-16">
          {/* CEO Section */}
          {ceo && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                <h2 className="text-3xl font-poppins text-gray-800">
                  Chief Executive Officer
                </h2>
              </div>
              <div className="flex justify-center">
                <LeaderCard member={ceo} isCEO={true} />
              </div>
            </div>
          )}

          {/* C-Suite Section */}
          {executives.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Executive Leadership
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                {executives.map((member, i) => (
                  <LeaderCard key={i} member={member} isCEO={false} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Department Tabs */}
        <div className="mb-12">
          <div className="flex justify-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("development")}
              className={`px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all ${
                activeTab === "development"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl"
                  : "bg-white text-gray-600 shadow-md hover:shadow-lg"
              }`}
            >
              <Code className="w-5 h-5" />
              Development Team
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("marketing")}
              className={`px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all ${
                activeTab === "marketing"
                  ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-xl"
                  : "bg-white text-gray-600 shadow-md hover:shadow-lg"
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              Marketing Team
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab("all")}
              className={`px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 transition-all ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-xl"
                  : "bg-white text-gray-600 shadow-md hover:shadow-lg"
              }`}
            >
              <Users className="w-5 h-5" />
              All
            </motion.button>
          </div>
        </div>

        {/* Department Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-20"
          >
            {/* Head Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-pink-600 rounded-full" />
                <h2 className="text-3xl font-poppins font-semibold text-gray-800">
                  Head
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center max-w-4xl mx-auto">
                {/* Development Head */}
                {(activeTab === "development" || activeTab === "all") &&
                  devTeam.head.map((member, i) => (
                    <LeaderCard
                      key={`dev-head-${i}`}
                      member={member}
                      isCEO={false}
                    />
                  ))}
                {/* Marketing Head */}
                {(activeTab === "marketing" || activeTab === "all") &&
                  mktTeam.head.map((member, i) => (
                    <LeaderCard
                      key={`mark-head-${i}`}
                      member={member}
                      isCEO={false}
                    />
                  ))}
              </div>
            </div>

            {/* Senior Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
                <h2 className="text-3xl font-poppins font-semibold text-gray-800">
                  Senior
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-8">
                {(activeTab === "development" || activeTab === "all") &&
                  devTeam.senior.map((member, i) => (
                    <TeamMemberCard
                      key={`dev-sr-${i}`}
                      member={member}
                      color="blue"
                    />
                  ))}
                {(activeTab === "marketing" || activeTab === "all") &&
                  mktTeam.senior.map((member, i) => (
                    <TeamMemberCard
                      key={`mark-sr-${i}`}
                      member={member}
                      color="orange"
                    />
                  ))}
              </div>
            </div>

            {/* Junior Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                <h2 className="text-3xl font-poppins font-semibold text-gray-800">
                  Junior
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-8">
                {(activeTab === "development" || activeTab === "all") &&
                  devTeam.junior.map((member, i) => (
                    <TeamMemberCard
                      key={`dev-jr-${i}`}
                      member={member}
                      color="blue"
                    />
                  ))}
                {(activeTab === "marketing" || activeTab === "all") &&
                  mktTeam.junior.map((member, i) => (
                    <TeamMemberCard
                      key={`mark-jr-${i}`}
                      member={member}
                      color="orange"
                    />
                  ))}
              </div>
            </div>

            {/* Intern Section */}
            <div className="space-y-8">
              {(devTeam.intern.length > 0 || mktTeam.intern.length > 0) && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
                    <h2 className="text-3xl font-poppins font-semibold text-gray-800">
                      Intern
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-8">
                    {(activeTab === "development" || activeTab === "all") &&
                      devTeam.intern.map((member, i) => (
                        <TeamMemberCard
                          key={`dev-int-${i}`}
                          member={member}
                          color="blue"
                        />
                      ))}
                    {(activeTab === "marketing" || activeTab === "all") &&
                      mktTeam.intern.map((member, i) => (
                        <TeamMemberCard
                          key={`mark-int-${i}`}
                          member={member}
                          color="orange"
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TeamOption1;
