import React, { useState, useEffect } from "react";
import { serviceAPI, Service } from "@/api";
import { Plus, Edit2, Trash2, X, Save, Search } from "lucide-react";

import { toast } from "sonner";

export default function ServiceManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    slug: "",
    features: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    icon: "",
    color: "#453abc",
    bgColor: "#f3f4f6",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await serviceAPI.getAll();
      setServices(data);
    } catch (error) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "features") {
        form.append(
          key,
          JSON.stringify(value.split("\n").filter((f) => f.trim() !== ""))
        );
      } else if (key === "seoKeywords") {
        form.append(
          key,
          JSON.stringify(
            value
              .split(",")
              .map((k) => k.trim())
              .filter((k) => k !== "")
          )
        );
      } else {
        form.append(key, value);
      }
    });

    // Add image: either file or URL
    if (imageFile) {
      form.append("image", imageFile);
    } else if (imagePreview && imagePreview.startsWith("http")) {
      form.append("image", imagePreview);
    }

    try {
      if (editingService) {
        await serviceAPI.update(editingService._id, form);
        toast.success("Service updated");
      } else {
        await serviceAPI.create(form);
        toast.success("Service added");
      }
      setIsModalOpen(false);
      resetForm();
      fetchServices();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      shortDescription: service.shortDescription || "",
      description: service.description,
      slug: service.slug || "",
      features: service.features ? service.features.join("\n") : "",
      seoTitle: service.seoTitle || "",
      seoDescription: service.seoDescription || "",
      seoKeywords: service.seoKeywords ? service.seoKeywords.join(", ") : "",
      icon: service.icon || "",
      color: service.color || "#453abc",
      bgColor: service.bgColor || "#f3f4f6",
    });
    setImagePreview(service.image || "");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await serviceAPI.delete(id);
        toast.success("Service removed");
        fetchServices();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const resetForm = () => {
    setEditingService(null);
    setImageFile(null);
    setImagePreview("");
    setFormData({
      title: "",
      shortDescription: "",
      description: "",
      slug: "",
      features: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      icon: "",
      color: "#453abc",
      bgColor: "#f3f4f6",
    });
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:5000${path}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Service Management</h2>
          <p className="text-gray-400">Total services: {services.length}</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#453abc] hover:bg-[#5a4fee] text-white px-6 py-3 rounded-xl transition-all"
        >
          <Plus size={20} />
          <span>Add Service</span>
        </button>
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={20} />
        </span>
        <input
          type="text"
          placeholder="Search by title..."
          className="w-full pl-12 pr-4 py-3 bg-[#16161a] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50 text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-12 text-center text-gray-500">
            Loading...
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="col-span-full p-12 text-center text-gray-500">
            No services found
          </div>
        ) : (
          filteredServices.map((service) => (
            <div
              key={service._id}
              className="bg-[#16161a] border border-white/5 rounded-2xl p-6 shadow-xl hover:border-white/10 transition-all flex flex-col group overflow-hidden"
            >
              <div className="h-40 -mx-6 -mt-6 mb-6 overflow-hidden">
                <img
                  src={getImageUrl(service.image)}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    backgroundColor: service.bgColor,
                    color: service.color,
                  }}
                >
                  {service.icon || service.title[0]}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 hover:text-red-300 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-6">
                {service.shortDescription}
              </p>
              <div className="mt-auto flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: service.color }}
                  ></div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Brand
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border border-white/10"
                    style={{ backgroundColor: service.bgColor }}
                  ></div>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                    Accent
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161a] w-full max-w-2xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-8 border-b border-white/5">
              <h3 className="text-2xl font-bold text-white">
                {editingService ? "Edit Service" : "Add New Service"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar text-white"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    Title
                  </label>
                  <input
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                    placeholder="e.g. Web Development"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    Slug
                  </label>
                  <input
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                    placeholder="e.g. web-development"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  Service Image
                </label>
                <div className="space-y-3">
                  {/* Toggle between File Upload and URL */}
                  <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData });
                        setImageFile(null);
                      }}
                      className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                        imageFile || !imagePreview.startsWith("http")
                          ? "bg-[#453abc] text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview("");
                      }}
                      className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
                        !imageFile && imagePreview.startsWith("http")
                          ? "bg-[#453abc] text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      Image URL
                    </button>
                  </div>

                  {/* File Upload */}
                  {(!imagePreview.startsWith("http") || imageFile) && (
                    <div className="flex flex-col gap-4">
                      {imagePreview && !imagePreview.startsWith("http") && (
                        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10">
                          <img
                            src={getImageUrl(imagePreview)}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview("");
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                      <div className="relative group">
                        <input
                          type="file"
                          id="image-upload"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="image-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl hover:border-[#453abc]/50 hover:bg-white/5 transition-all cursor-pointer group"
                        >
                          <Plus className="w-8 h-8 text-gray-500 group-hover:text-[#453abc] mb-2 transition-colors" />
                          <span className="text-sm text-gray-400 group-hover:text-gray-300">
                            {imageFile
                              ? imageFile.name
                              : "Click to upload image"}
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* URL Input */}
                  {(imagePreview.startsWith("http") ||
                    (!imageFile && !imagePreview)) && (
                    <div className="space-y-2">
                      <input
                        type="url"
                        value={
                          imagePreview.startsWith("http") ? imagePreview : ""
                        }
                        onChange={(e) => {
                          setImagePreview(e.target.value);
                          setImageFile(null);
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50 text-sm"
                        placeholder="https://example.com/image.jpg"
                      />
                      {imagePreview && imagePreview.startsWith("http") && (
                        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "";
                              e.currentTarget.alt = "Invalid image URL";
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => setImagePreview("")}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  Short Description
                </label>
                <textarea
                  name="shortDescription"
                  required
                  rows={2}
                  value={formData.shortDescription}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50 resize-none"
                  placeholder="A brief summary for the cards..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  Full Description
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50 resize-none"
                  placeholder="Detailed explanation of the service..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  Features (one per line)
                </label>
                <textarea
                  name="features"
                  rows={4}
                  value={formData.features}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50 resize-none md:max-h-5"
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    Icon Name (Lucide)
                  </label>
                  <input
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                    placeholder="users, database, etc."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    Brand Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="h-12 w-12 bg-transparent border-none cursor-pointer"
                    />
                    <input
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  Background Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    name="bgColor"
                    value={formData.bgColor}
                    onChange={handleChange}
                    className="h-12 w-12 bg-transparent border-none cursor-pointer"
                  />
                  <input
                    name="bgColor"
                    value={formData.bgColor}
                    onChange={handleChange}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                  />
                </div>
              </div>

              <hr className="border-white/5" />

              <div className="space-y-4">
                <h4 className="text-sm font-bold text-[#453abc] uppercase tracking-wider">
                  SEO Settings
                </h4>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    SEO Title
                  </label>
                  <input
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                    placeholder="Meta title for search engines"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    SEO Description
                  </label>
                  <textarea
                    name="seoDescription"
                    rows={2}
                    value={formData.seoDescription}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50 resize-none"
                    placeholder="Meta description..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    SEO Keywords (comma separated)
                  </label>
                  <textarea
                    name="seoKeywords"
                    rows={2}
                    value={formData.seoKeywords}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50 resize-none"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4 sticky bottom-0 bg-[#16161a] py-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-4 border border-white/10 rounded-xl font-medium hover:bg-white/5 transition-all text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-[#453abc] rounded-xl font-medium hover:bg-[#5a4fee] shadow-lg shadow-[#453abc]/20 transition-all flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  <span>
                    {editingService ? "Update Service" : "Add Service"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
