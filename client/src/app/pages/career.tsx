import {
  ArrowUpRight,
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  MapPinned,
  Users,
  Zap,
} from "lucide-react";

import { useState, useEffect } from "react";
import { jobPositionAPI, JobPosition } from "@/api";
import { JobApplicationForm } from "../components/career/JobApplicationForm";
import { toast } from "sonner";

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [jobListings, setJobListings] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(
    null
  );
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await jobPositionAPI.getActive();
      setJobListings(data);
    } catch (error) {
      toast.error("Failed to load job positions");
    } finally {
      setLoading(false);
    }
  };

  const departments = [
    "All",
    ...Array.from(new Set(jobListings.map((job) => job.department))),
  ];

  const filteredJobs =
    selectedDepartment === "All"
      ? jobListings
      : jobListings.filter((job) => job.department === selectedDepartment);

  const handleApplyClick = (position: JobPosition) => {
    setSelectedPosition(position);
    setIsApplicationFormOpen(true);
  };

  const benefits = [
    {
      icon: <MapPinned className="w-6 h-6" />,
      title: "Remote Work",
      description: "Work from anywhere in the world",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Events",
      description: "Regular team building and social events",
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Competitive Salary",
      description: "Industry-leading compensation packages",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef2f7] font-inter">
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:py-44 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#453abc]/10 rounded-full blur-[80px] md:blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#60c3e3]/10 rounded-full blur-[80px] md:blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 text-center">
          <p className="font-poppins text-transparent bg-clip-text bg-gradient-to-r from-[#453abc] to-[#60c3e3] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Careers
          </p>
          <h1 className="text-4xl md:text-7xl font-poppins font-medium text-[#191a23] mb-6 leading-tight md:leading-[1.1]">
            Build Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#453abc] to-[#60c3e3]">
              Career
            </span>{" "}
            With Us
          </h1>
          <p className="text-[#6b7280] text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Join a mission-driven team dedicated to building the future of
            technology. We're looking for passionate individuals who want to
            make a real impact.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mt-10 text-[#6b7280]">
            <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-[#453abc]" />
              <span className="font-poppins font-medium text-sm text-[#191a23]">
                {loading ? "..." : jobListings.length} Position
                {jobListings.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
              <MapPinned className="w-5 h-5 text-[#453abc]" />
              <span className="font-poppins font-medium text-sm text-[#191a23]">
                Remote First
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl lg:text-4xl font-poppins font-medium text-[#191a23] mb-4">
            Why TechTide?
          </h2>
          <p className="text-[#6b7280] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We've built an environment where you can grow, learn, and do your
            best work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-[2.5rem] border border-transparent shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-8 md:p-10 hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#453abc]/5 flex items-center justify-center text-[#453abc] mb-6 md:mb-8 group-hover:bg-[#453abc] group-hover:text-white transition-all duration-500">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-poppins font-medium text-[#191a23] mb-4">
                {benefit.title}
              </h3>
              <p className="text-[#6b7280] leading-relaxed text-sm">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Job Listings Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-32">
        <div className="mb-12">
          <h2 className="text-3xl font-poppins font-medium text-[#191a23] mb-8 text-center md:text-left">
            Latest Opportunities
          </h2>

          {/* Department Filter */}
          {jobListings.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-6 py-3 rounded-2xl font-poppins text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    selectedDepartment === dept
                      ? "bg-[#191a23] text-white shadow-xl"
                      : "bg-white text-[#6b7280] hover:bg-[#f8f9fa] border border-gray-100"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Job Cards */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-[#453abc]/20 border-t-[#453abc] rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading positions...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-poppins font-medium text-[#191a23] mb-2">
              No Current Positions Available
            </h3>
            <p className="text-gray-500">
              We don't have any open positions at the moment. Check back soon!
            </p>
          </div>
        ) : (
          <div className="space-y-6 md:space-y-8">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] hover:border-[#453abc]/10 transition-all duration-500 p-8 md:p-10 lg:p-14 group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-10">
                  <div className="flex-1">
                    <div className="flex items-start md:items-center gap-4 md:gap-6 mb-8">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#453abc] to-[#60c3e3] flex items-center justify-center text-white flex-shrink-0 shadow-lg">
                        <Briefcase className="w-6 h-6 md:w-7 md:h-7" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-poppins font-medium text-[#191a23] mb-3 group-hover:text-[#453abc] transition-colors leading-tight">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 md:gap-4">
                          <span className="px-3 py-1 rounded-lg bg-[#453abc]/5 text-[#453abc] text-[10px] font-semibold uppercase tracking-wider">
                            {job.department}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-[#6b7280] font-medium">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="whitespace-nowrap">
                              {job.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-[#6b7280] font-medium">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="whitespace-nowrap">
                              {job.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[#6b7280] text-base md:text-lg mb-8 lg:max-w-3xl leading-relaxed font-inter">
                      {job.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {job.requirements.map((req, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 px-5 py-3 rounded-xl bg-[#f8f9fa] text-xs md:text-sm text-[#191a23] font-medium"
                        >
                          <Zap className="w-3.5 h-3.5 text-[#453abc]" />
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-6 bg-gray-50 p-8 md:p-10 rounded-[2rem] lg:min-w-[280px]">
                    {job.salary && (
                      <div className="text-center lg:text-right">
                        <span className="block text-[10px] font-poppins font-semibold text-[#6b7280] uppercase tracking-widest mb-1">
                          Estimated Range
                        </span>
                        <span className="text-xl md:text-2xl font-poppins font-medium text-[#191a23]">
                          {job.salary}
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="w-full sm:w-auto lg:w-full bg-[#191a23] text-white px-8 py-4.5 rounded-xl font-poppins font-medium hover:bg-[#453abc] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
                    >
                      Apply Now
                      <ArrowUpRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Culture Section / CTA */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="relative overflow-hidden bg-[#191a23] rounded-[2.5rem] md:rounded-[3.5rem] p-10 md:p-20 text-center">
          <div className="absolute top-[-20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#60c3e3]/10 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-poppins font-medium text-white mb-6 md:mb-8 leading-tight">
              Don't See Your <span className="text-[#60c3e3]">Ideal Role</span>?
            </h2>
            <p className="text-white/70 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-inter">
              We're always looking for brilliant minds to join us. Send us your
              portfolio and tell us how you can help us reshape the digital
              landscape.
            </p>
            <div className="flex justify-center">
              <button className="w-full sm:w-auto bg-white text-[#191a23] px-10 md:px-12 py-4.5 md:py-5 rounded-xl font-poppins font-medium hover:shadow-[0_15px_40px_rgba(255,255,255,0.1)] transition-all hover:-translate-y-1">
                Speculative Application
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      <JobApplicationForm
        isOpen={isApplicationFormOpen}
        onClose={() => setIsApplicationFormOpen(false)}
        position={selectedPosition}
      />
    </div>
  );
}
