import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogAPI } from "@/api";
import { BlogPost } from "@/types";
import { Calendar, User, Clock, ChevronLeft, Share2, Tag } from "lucide-react";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await blogAPI.getAll();
        const foundPost = data.find((p) => p.slug === slug);
        if (foundPost) {
          setPost(foundPost);
          // Set SEO Meta Tags
          document.title =
            foundPost.seoTitle || `${foundPost.title} | TechTide Co.`;

          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement("meta");
            metaDesc.setAttribute("name", "description");
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute(
            "content",
            foundPost.seoDescription || foundPost.description
          );

          let metaKeywords = document.querySelector('meta[name="keywords"]');
          if (!metaKeywords) {
            metaKeywords = document.createElement("meta");
            metaKeywords.setAttribute("name", "keywords");
            document.head.appendChild(metaKeywords);
          }
          metaKeywords.setAttribute(
            "content",
            (foundPost.seoKeywords || []).join(", ")
          );
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();

    // Cleanup meta tags on unmount (optional but good practice)
    return () => {
      document.title = "TechTide Co.";
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#453abc] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Blog Post Not Found
        </h1>
        <Link
          to="/blog"
          className="text-[#453abc] hover:underline flex items-center gap-2"
        >
          <ChevronLeft size={20} />
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-20 bg-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <Link
            to="/blog"
            className="text-gray-500 hover:text-[#453abc] transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <ChevronLeft size={18} />
            Back to Blog
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#453abc]/5 text-[#453abc] text-xs font-bold uppercase tracking-wider rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-gray-100">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#453abc]/10 rounded-full flex items-center justify-center text-[#453abc]">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Author</p>
                  <p className="text-sm font-bold text-gray-900">
                    {post.author}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Published</p>
                  <p className="text-sm font-bold text-gray-900">
                    {new Date(
                      post.uploadedDate || post.createdAt
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Read Time</p>
                  <p className="text-sm font-bold text-gray-900">
                    {post.readTime}
                  </p>
                </div>
              </div>
            </div>

            <button className="p-3 text-gray-400 hover:text-[#453abc] hover:bg-[#453abc]/5 rounded-full transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <img
            src={
              post.image
                ? post.image.startsWith("http")
                  ? post.image
                  : `http://localhost:5000${post.image}`
                : ""
            }
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Footer info */}
        <footer className="mt-16 pt-10 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-2">
              <Tag size={16} />
              Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </main>
  );
}
