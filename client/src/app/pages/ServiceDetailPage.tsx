import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Code,
  Users,
  Database,
  Layers,
  ShoppingCart,
  Briefcase,
  BarChart,
  FileText,
  Shield,
  MessageCircle,
  Link as LinkIcon,
  Smartphone,
  TrendingUp,
  Zap,
  Loader2,
} from "lucide-react";
import { serviceAPI } from "@/api";
import { Service } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-6 h-6" />,
  database: <Database className="w-6 h-6" />,
  layers: <Layers className="w-6 h-6" />,
  "shopping-cart": <ShoppingCart className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
  "bar-chart": <BarChart className="w-6 h-6" />,
  "file-text": <FileText className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  "message-circle": <MessageCircle className="w-6 h-6" />,
  link: <LinkIcon className="w-6 h-6" />,
  code: <Code className="w-6 h-6" />,
  smartphone: <Smartphone className="w-6 h-6" />,
  "trending-up": <TrendingUp className="w-6 h-6" />,
  zap: <Zap className="w-6 h-6" />,
};

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (!slug) return;
      try {
        const { data } = await serviceAPI.getBySlug(slug);
        setService(data);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:5000${path}`;
  };

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-[#453abc] animate-spin" />
      </div>
    );
  }

  /* ---------------- Not Found ---------------- */
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-poppins font-bold text-[#191a23] mb-4">
          Service Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          The service you're looking for doesn’t exist or may have been moved.
        </p>
        <Link
          to="/services"
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#453abc] to-[#5f54e6]
            text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  /* ---------------- Page ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] via-[#fcfcfd] to-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Back Button */}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#453abc]
            transition mb-14 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Services
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* ---------------- Left Content ---------------- */}
          <div className="space-y-10">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full
              bg-white/70 backdrop-blur border border-[#453abc]/10
              text-[#453abc] font-semibold text-sm shadow-sm w-fit"
            >
              {service.icon && iconMap[service.icon] ? (
                iconMap[service.icon]
              ) : (
                <Code className="w-5 h-5" />
              )}
              <span>Expert Solution</span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-6xl font-poppins font-extrabold
              text-[#191a23] leading-[1.05] tracking-tight"
            >
              {service.title}
            </h1>

            {/* Short Description */}
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
              {service.shortDescription}
            </p>

            {/* Description */}
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="space-y-6 pt-4">
                <h3 className="text-2xl font-poppins font-bold text-[#191a23]">
                  Key Features
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start p-5 bg-white rounded-2xl
                        border border-gray-100
                        shadow-[0_10px_30px_rgba(0,0,0,0.04)]
                        hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                        transition-all duration-300"
                    >
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pt-10">
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-partner-drawer"))
                }
                className="px-12 py-4 rounded-2xl font-poppins font-bold text-lg text-white
                  bg-gradient-to-r from-[#453abc] to-[#5f54e6]
                  shadow-[0_20px_60px_rgba(69,58,188,0.35)]
                  hover:shadow-[0_30px_80px_rgba(69,58,188,0.45)]
                  transition-all duration-300 transform hover:scale-[1.03]"
              >
                Inquire About {service.title}
              </button>
            </div>
          </div>

          {/* ---------------- Right Side ---------------- */}
          <div className="space-y-14">
            {/* Image */}
            {service.image && (
              <div
                className="relative rounded-[3rem] overflow-hidden
                shadow-[0_40px_100px_rgba(0,0,0,0.12)]
                ring-1 ring-black/5"
              >
                <img
                  src={getImageUrl(service.image)}
                  alt={service.title}
                  className="w-full aspect-[4/3] object-cover
                    hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            )}

            {/* Sidebar Card */}
            <div
              className="relative rounded-[2.5rem] p-10 md:p-14
              bg-gradient-to-br from-[#151622] via-[#191a23] to-[#0f1020]
              text-white overflow-hidden
              shadow-[0_40px_100px_rgba(0,0,0,0.4)]"
            >
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#453abc]/30 rounded-full blur-[120px]" />

              <div className="relative z-10 space-y-6">
                <h4 className="text-2xl font-poppins font-bold">
                  Why TechTide?
                </h4>

                <p className="text-white/70 leading-relaxed">
                  We don’t just build software we engineer scalable, secure, and
                  future-ready solutions that help businesses grow with
                  confidence.
                </p>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-5">
                    <div
                      className="relative w-14 h-14 rounded-full
    bg-gradient-to-br from-[#453abc] to-[#6b5cff]
    flex items-center justify-center
    shadow-lg"
                    >
                      {/* Icon */}
                      <Shield className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <div className="font-bold text-white">
                        Expert Consulting
                      </div>
                      <div className="text-sm text-white/50">
                        Priority Client Support
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
