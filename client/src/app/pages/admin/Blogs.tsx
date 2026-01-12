import React, { useState, useEffect } from "react";
import { blogAPI, BlogPost } from "@/api";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Save,
  Search,
  User,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    readTime: "",
    uploadedDate: "",
    image: "",
    tags: "",
    slug: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    metaTags: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await blogAPI.getAll();
      setBlogs(data);
    } catch (error) {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (
      e.target.name === "image" &&
      e.target instanceof HTMLInputElement &&
      e.target.files
    ) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "image") payload.append(key, value);
    });
    if (selectedFile) {
      payload.append("image", selectedFile);
    }

    try {
      if (editingBlog) {
        await blogAPI.update(editingBlog._id, payload);
        toast.success("Blog post updated");
      } else {
        await blogAPI.create(payload);
        toast.success("Blog post published");
      }
      setIsModalOpen(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description || "",
      content: blog.content,
      author: blog.author,
      readTime: blog.readTime || "",
      uploadedDate: blog.uploadedDate
        ? new Date(blog.uploadedDate).toISOString().split("T")[0]
        : "",
      image: blog.image || "",
      tags: blog.tags.join(", "),
      slug: blog.slug || "",
      seoTitle: blog.seoTitle || "",
      seoDescription: blog.seoDescription || "",
      seoKeywords: blog.seoKeywords ? blog.seoKeywords.join(", ") : "",
      metaTags: blog.metaTags || "",
    });
    setImagePreview(blog.image || "");
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await blogAPI.delete(id);
        toast.success("Blog removed");
        fetchBlogs();
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const resetForm = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      description: "",
      content: "",
      author: "",
      readTime: "",
      uploadedDate: "",
      image: "",
      tags: "",
      slug: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
      metaTags: "",
    });
    setSelectedFile(null);
    setImagePreview("");
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Blog Management</h2>
          <p className="text-gray-400">Total posts: {blogs.length}</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#453abc] hover:bg-[#5a4fee] text-white px-6 py-3 rounded-xl transition-all"
        >
          <Plus size={20} />
          <span>New Post</span>
        </button>
      </div>

      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={20} />
        </span>
        <input
          type="text"
          placeholder="Search by title or author..."
          className="w-full pl-12 pr-4 py-3 bg-[#16161a] border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-12 text-center text-gray-500">
            Loading...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="col-span-full p-12 text-center text-gray-500">
            No blog posts found
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-[#16161a] border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:border-white/10 transition-all flex flex-col"
            >
              <div className="h-48 bg-white/5 relative group">
                {blog.image ? (
                  <img
                    src={
                      blog.image.startsWith("http")
                        ? blog.image
                        : `http://localhost:5000${blog.image}`
                    }
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-700">
                    No Image
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-[#453abc] transition-all"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-red-500 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex gap-2 mb-3 flex-wrap">
                  {blog.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-[#453abc]/10 text-[#60c3e3] rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-6">
                  {blog.content}
                </p>
                <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161a] w-full max-w-4xl rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-8 border-b border-white/5">
              <h3 className="text-2xl font-bold">
                {editingBlog ? "Edit Post" : "Create New Post"}
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
              className="p-8 space-y-6 overflow-y-auto"
            >
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
                  placeholder="The Future of TechTide..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    Author
                  </label>
                  <input
                    name="author"
                    required
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    Read Time (e.g., 5 min read)
                  </label>
                  <input
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder="8 min read"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    Uploaded Date
                  </label>
                  <input
                    type="date"
                    name="uploadedDate"
                    value={formData.uploadedDate}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    Tags (comma separated)
                  </label>
                  <input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="AI, Innovation, Future..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50 resize-none"
                  placeholder="Short summary for the blog card..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  Content
                </label>
                <textarea
                  name="content"
                  required
                  rows={8}
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50 resize-none"
                  placeholder="Write your content here..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    Image
                  </label>
                  <div className="flex items-center gap-4">
                    {imagePreview && (
                      <img
                        src={
                          imagePreview.startsWith("blob")
                            ? imagePreview
                            : `http://localhost:5000${imagePreview}`
                        }
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-xl border border-white/10"
                      />
                    )}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                    Slug (Optional)
                  </label>
                  <input
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="future-of-techtide"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                  />
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 space-y-6">
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
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
                    placeholder="Focus keyword included title..."
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
                    placeholder="Meta description for search engines..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                      SEO Keywords (comma separated)
                    </label>
                    <input
                      name="seoKeywords"
                      value={formData.seoKeywords}
                      onChange={handleChange}
                      placeholder="keyword1, keyword2..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                      Meta Tags
                    </label>
                    <input
                      name="metaTags"
                      value={formData.metaTags}
                      onChange={handleChange}
                      placeholder="tag1, tag2..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#453abc]/50"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 sticky bottom-0 bg-[#16161a]">
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
                  <span>{editingBlog ? "Update Post" : "Publish Post"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
