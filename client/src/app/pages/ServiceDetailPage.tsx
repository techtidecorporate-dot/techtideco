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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#453abc] animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-poppins font-bold text-[#191a23] mb-4">
          Service Not Found
        </h2>
        <p className="text-gray-500 mb-8">
          The service you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/services"
          className="px-8 py-3 bg-[#453abc] text-white rounded-xl font-medium hover:bg-[#362a9a] transition-all"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfd] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Back Button */}
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#453abc] transition-colors mb-12 font-medium"
        >
          <ArrowLeft size={20} />
          <span>Back to Services</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Header & Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#453abc]/5 rounded-full text-[#453abc] font-semibold text-sm">
                {service.icon && iconMap[service.icon] ? (
                  iconMap[service.icon]
                ) : (
                  <Code className="w-5 h-5" />
                )}
                <span>Expert Solution</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-poppins font-bold text-[#191a23] leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-[#6b7280] leading-relaxed">
                {service.shortDescription}
              </p>
            </div>

            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed">
                {service.description}
              </p>
            </div>

            {service.features && service.features.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-poppins font-bold text-[#191a23]">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex gap-3 items-start p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-8">
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-partner-drawer"))
                }
                className="px-10 py-4 bg-[#453abc] text-white rounded-2xl font-poppins font-bold text-lg hover:bg-[#362a9a] transition-all shadow-xl shadow-[#453abc]/20 transform hover:scale-[1.02]"
              >
                Inquire About {service.title}
              </button>
            </div>
          </div>

          {/* Image & Sidebar */}
          <div className="space-y-10">
            {service.image && (
              <div className="rounded-[3rem] overflow-hidden shadow-2xl shadow-[#453abc]/10 border border-white">
                <img
                  src={getImageUrl(service.image)}
                  alt={service.title}
                  className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}

            <div className="bg-[#191a23] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#453abc]/20 rounded-full blur-[100px] -mr-32 -mt-32" />
              <div className="relative z-10 space-y-6">
                <h4 className="text-2xl font-poppins font-bold">
                  Why TechTide?
                </h4>
                <p className="text-white/70 leading-relaxed font-inter">
                  We don't just build software; we build solutions that move the
                  needle. Our team of experts ensures your {service.title} is
                  scalable, secure, and future-proof.
                </p>
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#453abc] flex items-center justify-center font-bold">
                      TT
                    </div>
                    <div>
                      <div className="font-bold">Expert Consulting</div>
                      <div className="text-sm text-white/50">
                        24/7 Priority Support
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
