import React, { useState, useEffect } from "react";
import { jobPositionAPI, JobPosition } from "@/api";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function JobPositions() {
  const [positions, setPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingPosition, setEditingPosition] = useState<JobPosition | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
    requirements: [] as string[],
    isActive: true,
  });
  const [requirementInput, setRequirementInput] = useState("");

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const { data } = await jobPositionAPI.getAll();
      setPositions(data);
    } catch (error) {
      toast.error("Failed to fetch job positions");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPosition) {
        await jobPositionAPI.update(editingPosition._id, formData);
        toast.success("Position updated successfully");
      } else {
        await jobPositionAPI.create(formData);
        toast.success("Position created successfully");
      }
      fetchPositions();
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to save position");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this position?")) {
      try {
        await jobPositionAPI.delete(id);
        toast.success("Position deleted");
        fetchPositions();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const handleEdit = (position: JobPosition) => {
    setEditingPosition(position);
    setFormData({
      title: position.title,
      department: position.department,
      location: position.location,
      type: position.type,
      salary: position.salary || "",
      description: position.description,
      requirements: position.requirements,
      isActive: position.isActive,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPosition(null);
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      salary: "",
      description: "",
      requirements: [],
      isActive: true,
    });
    setRequirementInput("");
  };

  const addRequirement = () => {
    if (requirementInput.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, requirementInput.trim()],
      });
      setRequirementInput("");
    }
  };

  const removeRequirement = (index: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== index),
    });
  };

  const filteredPositions = positions.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Job Positions</h2>
          <p className="text-gray-400">Manage job openings and postings.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#453abc] to-[#60c3e3] text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all"
        >
          <Plus size={20} />
          Add New Position
        </button>
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={20} />
        </span>
        <input
          type="text"
          placeholder="Search by title or department..."
          className="w-full pl-12 pr-4 py-3 bg-[#16161a] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="p-12 text-center text-gray-500">Loading...</div>
        ) : filteredPositions.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No positions found
          </div>
        ) : (
          filteredPositions.map((position) => (
            <div
              key={position._id}
              className="bg-[#16161a] border border-white/5 rounded-2xl p-6 shadow-xl hover:border-white/10 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#453abc] to-[#60c3e3] flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Briefcase size={14} /> {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {position.type}
                      </span>
                      {position.salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign size={14} /> {position.salary}
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-gray-300 line-clamp-2">
                      {position.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
                      position.isActive
                        ? "text-green-400 bg-green-500/10"
                        : "text-gray-400 bg-gray-500/10"
                    }`}
                  >
                    {position.isActive ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle size={14} /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <XCircle size={14} /> Inactive
                      </span>
                    )}
                  </span>

                  <div className="flex items-center gap-2 border-l border-white/10 pl-3">
                    <button
                      onClick={() => handleEdit(position)}
                      className="p-2 hover:bg-blue-500/10 rounded-lg text-blue-400 transition-all"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(position._id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#16161a] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-2xl font-bold">
                {editingPosition ? "Edit Position" : "Add New Position"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#0d0d0f] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                  placeholder="e.g., Senior Full Stack Developer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#0d0d0f] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                    placeholder="e.g., Engineering"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Type *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#0d0d0f] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#0d0d0f] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                    placeholder="e.g., Remote / Karachi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#0d0d0f] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                    placeholder="e.g., $120k - $180k"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-[#0d0d0f] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                  placeholder="Detailed job description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Requirements
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={requirementInput}
                    onChange={(e) => setRequirementInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      (e.preventDefault(), addRequirement())
                    }
                    className="flex-1 px-4 py-3 bg-[#0d0d0f] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                    placeholder="Add a requirement..."
                  />
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="px-4 py-3 bg-[#453abc] text-white rounded-xl hover:bg-[#3a2f9e] transition-all"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.requirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-[#0d0d0f] px-4 py-2 rounded-lg"
                    >
                      <span className="text-sm">{req}</span>
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <XCircle size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-white/5"
                />
                <label htmlFor="isActive" className="text-sm font-medium">
                  Active (visible on career page)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#453abc] to-[#60c3e3] text-white rounded-xl hover:shadow-xl transition-all"
                >
                  {editingPosition ? "Update Position" : "Create Position"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
