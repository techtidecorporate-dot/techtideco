import { useEffect, useState } from "react";
import { serviceAPI } from "@/api";
import { Service } from "@/types";
import { Loader2 } from "lucide-react";

const gradients = [
  "from-[#453abc] to-[#60c3e3]",
  "from-[#60c3e3] to-[#453abc]",
  "from-[#453abc] via-[#60c3e3] to-[#453abc]",
];

import { FloatingCTA } from "../components/ui/FloatingCTA";

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await serviceAPI.getAll();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:5000${path}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef2f7] font-inter mt-10">
      <FloatingCTA />
      {/* Hero Section */}
      <div className="relative pt-32 pb-16 md:py-44 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#453abc]/10 rounded-full blur-[80px] md:blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#60c3e3]/10 rounded-full blur-[80px] md:blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 text-center">
          <p className="font-poppins text-transparent bg-clip-text bg-gradient-to-r from-[#453abc] to-[#60c3e3] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Our Expertise
          </p>
          <h1 className="text-4xl md:text-7xl font-poppins font-medium text-[#191a23] mb-6 leading-tight md:leading-[1.1]">
            Comprehensive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#453abc] to-[#60c3e3]">
              Tech Solutions
            </span>
          </h1>
          <p className="text-[#6b7280] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We deliver end-to-end technology solutions that empower businesses
            to innovate, scale, and lead in the digital era.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-[#453abc] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {services.map((service, index) => (
              <div
                key={service._id}
                className="bg-white rounded-[1rem] md:rounded-[1rem] border border-transparent shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:border-[#453abc]/10 transition-all duration-500 overflow-hidden group flex flex-col"
              >
                {service.image && (
                  <div className="h-52 overflow-hidden">
                    <img
                      src={getImageUrl(service.image)}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl md:text-2xl font-poppins font-medium text-[#191a23] mb-3  group-hover:text-[#453abc] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-[#6b7280] text-sm md:text-base leading-relaxed font-inter mb-6">
                    {service.shortDescription}
                  </p>

                  <button
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent("open-partner-drawer")
                      )
                    }
                    className="w-full py-2.5 rounded-lg text-white font-medium shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-sm mt-auto"
                    style={{
                      backgroundImage:
                        "linear-gradient(93.1835deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)",
                    }}
                  >
                    Get in touch
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-24 md:pb-32">
        <div className="relative overflow-hidden bg-[#191a23] bg-gradient-to-br from-[#191a23] via-[#453abc]/20 to-[#191a23] rounded-[2.5rem] md:rounded-[3.5rem] p-10 md:p-20 text-center">
          <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#453abc]/10 rounded-full blur-[100px] md:blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#60c3e3]/10 rounded-full blur-[100px] md:blur-[120px]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-poppins font-medium text-white mb-6 md:mb-8 leading-tight">
              Ready to Start Your{" "}
              <span className="text-[#60c3e3]">Next Big Thing</span>?
            </h2>
            <p className="text-white/70 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-inter">
              Join dozens of successful startups and enterprises who trust
              TechTide to build their most critical digital products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
