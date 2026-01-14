import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { blogAPI } from "@/api";
import { BlogPost } from "@/types";

export function BlogSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await blogAPI.getAll();
        setBlogPosts(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Different speeds for each column
  const slow = useSpring(useTransform(scrollYProgress, [0, 1], [0, -60]), {
    stiffness: 100,
    damping: 30,
  });

  const medium = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), {
    stiffness: 100,
    damping: 30,
  });

  const fast = useSpring(useTransform(scrollYProgress, [0, 1], [0, -180]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-white py-16 md:pt-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* LEFT TEXT */}
          <div className="lg:w-[38%] text-center lg:text-left">
            <h5 className="font-poppins text-sm font-medium tracking-widest text-[#453abc] uppercase mb-3">
              Featured Insights
            </h5>

            <h2 className="text-3xl md:text-4xl font-poppins font-medium leading-tight mb-6">
              <span className="text-black">
                Stories of our transformations across Services and Industries
              </span>
            </h2>

            <p className="text-gray-500 text-base md:text-lg mb-8 max-w-2xl mx-auto lg:mx-0">
              From Concept to Completion
            </p>

            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#453abc] to-[#60c3e3] text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all font-medium"
            >
              Explore More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* RIGHT EDITORIAL LAYOUT - DESKTOP */}
          <div className="relative hidden lg:flex lg:w-[62%] h-[110vh] gap-8">
            {/* LEFT — FEATURED */}
            {blogPosts[0] && (
              <motion.div style={{ y: slow }} className="w-48 h-72 mt-24">
                <BlogCard blog={blogPosts[0]} variant="featured" />
              </motion.div>
            )}

            {/* CENTER — 3 STACK */}
            <motion.div
              style={{ y: medium }}
              className="w-48 h-[90vh] flex flex-col justify-between"
            >
              {blogPosts.slice(1, 4).map((blog) => (
                <BlogCard key={blog._id} blog={blog} variant="medium" />
              ))}
            </motion.div>

            {/* RIGHT — 2 LARGE */}
            <motion.div
              style={{ y: fast }}
              className="w-48 h-[70vh] flex flex-col gap-10 justify-between mt-24"
            >
              {blogPosts.slice(4, 6).map((blog) => (
                <BlogCard key={blog._id} blog={blog} variant="large" />
              ))}
            </motion.div>
          </div>

          {/* MOBILE LIST - VISIBLE ONLY ON SMALL SCREENS */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {blogPosts.slice(0, 4).map((blog) => (
              <div key={blog._id} className="h-64 sm:h-72">
                <BlogCard blog={blog} variant="mobile" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogCard({
  blog,
  variant,
  defaultImage,
}: {
  blog: any;
  variant: "featured" | "medium" | "large" | "mobile";
  defaultImage?: string;
}) {
  const height =
    variant === "mobile"
      ? "h-full"
      : variant === "featured"
      ? "h-[92%]" // adjusted ↓
      : variant === "large"
      ? "h-[52%]" // adjusted ↑
      : "h-[30%]";

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`relative ${height} rounded-2xl overflow-hidden shadow-lg group cursor-pointer`}
    >
      <Link to={`/blog/${blog.slug}`}>
        <img
          src={
            blog.image
              ? blog.image.startsWith("http")
                ? blog.image
                : `http://localhost:5000${blog.image}`
              : defaultImage
          }
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 p-6">
          <h4 className="text-lg font-semibold text-white leading-snug">
            {blog.title.split(" ").length > 6
              ? blog.title.split(" ").slice(0, 6).join(" ") + "..."
              : blog.title}
          </h4>

          <div className="mt-3 flex items-center text-white/80 text-sm">
            Explore More
            <ArrowRight className="w-3 h-3 ml-2" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
