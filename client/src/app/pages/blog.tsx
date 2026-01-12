import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { blogAPI } from "@/api";
import { BlogPost } from "@/types";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Web Development", "Mobile Apps", "Tech Trends"];

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await blogAPI.getAll();
        setBlogPosts(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.tags.includes(selectedCategory);
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#453abc] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef2f7] font-inter mt-10">
      {/* Hero Section */}
      <div className="relative min-h-[50vh] flex items-center md:py-44 overflow-hidden pt-24 pb-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#453abc]/10 rounded-full blur-[80px] md:blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#60c3e3]/10 rounded-full blur-[80px] md:blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 text-center">
          <p className="font-poppins text-transparent bg-clip-text bg-gradient-to-r from-[#453abc] to-[#60c3e3] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Our Blog
          </p>
          <h1 className="text-4xl md:text-7xl font-poppins font-medium text-[#191a23] mb-6 leading-tight md:leading-[1.1]">
            Insights &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#453abc] to-[#60c3e3]">
              Innovation
            </span>
          </h1>
          <p className="text-[#6b7280] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Stay ahead of the curve with our latest thoughts on technology,
            design, and the future of digital transformation.
          </p>
        </div>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className="max-w-7xl mx-auto px-6 md:px-8 -mt-6 md:-mt-10 mb-16 md:mb-20">
          <div className="glass rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden group transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 sm:h-80 lg:h-full overflow-hidden">
                <img
                  src={
                    featuredPost.image
                      ? featuredPost.image.startsWith("http")
                        ? featuredPost.image
                        : `http://localhost:5000${featuredPost.image}`
                      : ""
                  }
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#191a23]/40 to-transparent" />
                <div className="absolute top-6 left-6 glass-dark px-4 py-2 rounded-xl text-white text-[10px] md:text-xs font-poppins tracking-wider uppercase backdrop-blur-md">
                  Featured Article
                </div>
              </div>
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[10px] md:text-xs text-[#6b7280] mb-6">
                  <span className="bg-[#453abc]/5 text-[#453abc] px-4 py-1.5 rounded-full font-medium">
                    {featuredPost.tags[0] || "Blog"}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#453abc]" />
                    {featuredPost.uploadedDate
                      ? new Date(featuredPost.uploadedDate).toLocaleDateString()
                      : new Date(featuredPost.createdAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#453abc]" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-poppins font-medium text-[#191a23] mb-6 leading-tight group-hover:text-[#453abc] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-[#6b7280] text-base md:text-lg mb-8 leading-relaxed line-clamp-3 md:line-clamp-none">
                  {featuredPost.description}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gradient-to-br from-[#453abc] to-[#60c3e3] p-[2px]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#453abc] font-poppins font-semibold text-sm md:text-base">
                        {featuredPost.author.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <span className="block text-sm font-semibold text-[#191a23]">
                        {featuredPost.author}
                      </span>
                      <span className="text-[10px] md:text-xs text-[#6b7280]">
                        Staff Writer
                      </span>
                    </div>
                  </div>
                  <RouterLink
                    to={`/blog/${featuredPost.slug}`}
                    className="w-full sm:w-auto bg-[#191a23] text-white px-8 py-4 rounded-2xl font-poppins font-medium hover:bg-[#453abc] transition-all duration-300 hover:translate-x-2 flex items-center justify-center gap-3"
                  >
                    Read Article
                    <ArrowRight className="w-5 h-5" />
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 mb-12 md:mb-16">
        <div className="glass p-5 md:p-4 rounded-[2.5rem] md:rounded-3xl flex flex-col lg:flex-row gap-6 items-center justify-between shadow-sm">
          {/* Search */}
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280] group-focus-within:text-[#453abc] transition-colors" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-[#f8f9fa] border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#453abc]/20 transition-all font-inter"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl font-poppins text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-[#191a23] text-white shadow-lg"
                    : "bg-white text-[#6b7280] hover:bg-[#f8f9fa] border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredPosts.map((post) => (
            <RouterLink
              key={post._id}
              to={`/blog/${post.slug}`}
              className="bg-white rounded-2xl border border-transparent hover:border-[#453abc]/10 shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden group flex flex-col"
            >
              <article>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={
                      post.image
                        ? post.image.startsWith("http")
                          ? post.image
                          : `http://localhost:5000${post.image}`
                        : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#191a23]/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 glass-dark px-3 py-1.5 rounded-xl text-white text-[10px] font-poppins tracking-wider uppercase backdrop-blur-sm">
                    {post.tags[0] || "Blog"}
                  </div>
                </div>

                <div className="px-6 py-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-[10px] md:text-[11px] text-[#6b7280] font-medium uppercase tracking-wider mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#453abc]" />
                      {post.uploadedDate
                        ? new Date(post.uploadedDate).toLocaleDateString()
                        : new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#453abc]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-poppins font-medium text-[#191a23] mb-4 line-clamp-2 leading-snug group-hover:text-[#453abc] transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[#6b7280] text-sm mb-6 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-[#f8f9fa] text-[#6b7280] px-3 py-1 rounded-lg text-[9px] md:text-[10px] font-medium tracking-wide uppercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 ">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#453abc] to-[#60c3e3] flex items-center justify-center text-white text-[10px] font-poppins font-semibold">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-[11px] font-semibold text-[#191a23]">
                        {post.author}
                      </span>
                    </div>
                    <button className="text-[#453abc] font-poppins font-medium text-[11px] flex items-center gap-1 hover:gap-2 transition-all">
                      Full Story
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            </RouterLink>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-24 md:py-32 glass rounded-[2rem]">
            <Search className="w-12 h-12 md:w-16 md:h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-poppins font-medium text-[#191a23] mb-2">
              No articles found
            </h3>
            <p className="text-[#6b7280] text-sm md:text-base">
              Try adjusting your search or category filters.
            </p>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24">
        <div className="relative overflow-hidden bg-[#191a23] bg-gradient-to-br from-[#191a23] via-[#453abc]/20 to-[#191a23] rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-20 text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#453abc]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#60c3e3]/10 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-poppins font-medium text-white mb-6">
              Subscribe to TechTide{" "}
              <span className="text-[#60c3e3]">Insights</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 5,000+ professionals receiving weekly updates on the latest
              tech innovations and digital transformation strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your work email"
                className="flex-1 px-8 py-4.5 md:py-5 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#453abc] transition-all font-inter text-sm md:text-base"
              />
              <button className="bg-gradient-to-r from-[#453abc] to-[#60c3e3] text-white px-10 py-4.5 md:py-5 rounded-2xl font-poppins font-medium hover:shadow-[0_10px_30px_rgba(69,58,188,0.4)] transition-all hover:-translate-y-1 whitespace-nowrap text-sm md:text-base">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
