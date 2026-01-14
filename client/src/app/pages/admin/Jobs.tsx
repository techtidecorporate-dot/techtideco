import { useState, useEffect } from "react";
import { jobAPI, JobApplication } from "@/api";
import {
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Search,
  Mail,
  Phone,
  User,
  Eye,
  X,
} from "lucide-react";
import { toast } from "sonner";

export default function JobApplications() {
  const [jobs, setJobs] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResume, setSelectedResume] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data } = await jobAPI.getAll();
      setJobs(data);
    } catch (error) {
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const getFileUrl = (path: string | undefined) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:5000${path}`;
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await jobAPI.updateStatus(id, status);
      toast.success(`Application marked as ${status}`);
      fetchJobs();
    } catch (error) {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await jobAPI.delete(id);
        toast.success("Application removed");
        fetchJobs();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reviewed":
        return "text-blue-400 bg-blue-500/10";
      case "contacted":
        return "text-green-400 bg-green-500/10";
      case "rejected":
        return "text-red-400 bg-red-500/10";
      default:
        return "text-orange-400 bg-orange-500/10";
    }
  };

  const filteredJobs = jobs.filter(
    (j) =>
      j.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Job Applications</h2>
          <p className="text-gray-400">Manage incoming talent applications.</p>
        </div>
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={20} />
        </span>
        <input
          type="text"
          placeholder="Search by name or position..."
          className="w-full pl-12 pr-4 py-3 bg-[#16161a] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No applications found
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-[#16161a] border border-white/5 rounded-2xl p-6 shadow-xl hover:border-white/10 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#453abc] to-[#60c3e3] flex items-center justify-center font-bold">
                    {job.name[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{job.name}</h3>
                    <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <User size={14} /> {job.position}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={14} /> {job.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone size={14} /> {job.phone}
                      </span>
                    </div>
                    {job.coverLetter && (
                      <div className="mt-3 p-3 bg-white/5 rounded-lg">
                        <p className="text-xs text-gray-500 mb-1">
                          Cover Letter:
                        </p>
                        <p className="text-sm text-gray-300 line-clamp-3">
                          {job.coverLetter}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusColor(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>

                  <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                    <button
                      onClick={() => handleStatusUpdate(job._id, "reviewed")}
                      className="p-2 hover:bg-blue-500/10 rounded-lg text-blue-400 transition-all title='Mark as Reviewed'"
                    >
                      <Clock size={18} />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(job._id, "contacted")}
                      className="p-2 hover:bg-green-500/10 rounded-lg text-green-400 transition-all title='Mark as Contacted'"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(job._id, "rejected")}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-all title='Mark as Rejected'"
                    >
                      <XCircle size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="p-2 hover:bg-gray-500/10 rounded-lg text-gray-400 hover:text-white transition-all title='Delete'"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {job.resume && (
                    <button
                      onClick={() => setSelectedResume(getFileUrl(job.resume))}
                      className="flex items-center gap-1 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm transition-all"
                    >
                      <Eye size={14} />
                      View CV
                    </button>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-gray-500">
                Applied on {new Date(job.createdAt).toLocaleDateString()} at{" "}
                {new Date(job.createdAt).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Resume Viewer Modal */}
      {selectedResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161a] border border-white/10 w-full max-w-5xl h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Resume Viewer</h3>
              <button
                onClick={() => setSelectedResume(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 bg-white relative">
              <iframe
                src={selectedResume}
                className="w-full h-full"
                title="Resume PDF"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
