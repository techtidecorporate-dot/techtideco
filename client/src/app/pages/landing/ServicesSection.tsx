import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { serviceAPI } from "@/api";
import { Service } from "@/types";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
}

function ServiceCard({ title, description, image }: ServiceCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
      {/* Image */}
      <div className="relative h-[180px] m-4 rounded-lg overflow-hidden">
        <img
          alt={`Illustration of ${title} services`}
          className="w-full h-full object-cover"
          src={image}
        />
      </div>

      {/* Content */}
      <div className="px-5 pb-5 space-y-3">
        <h3 className="text-[#191a23] text-lg font-semibold">{title}</h3>

        <p className="text-[#6b7280] text-sm leading-relaxed line-clamp-3">
          {description}
        </p>

        <button
          onClick={() =>
            window.dispatchEvent(new CustomEvent("open-partner-drawer"))
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
  );
}

export function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  /* 🔁 Auto slide */
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrevious = () => {
    setIsPaused(true);
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsPaused(true);
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const getPosition = (index: number) => {
    if (index === activeIndex) return "center";
    if (index === (activeIndex - 1 + services.length) % services.length)
      return "left";
    if (index === (activeIndex + 1) % services.length) return "right";
    return "hidden";
  };

  const variants = {
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      rotate: 0,
      filter: "blur(0px)",
      zIndex: 3,
    },
    left: {
      x: -220,
      scale: 0.88,
      opacity: 0.5,
      rotate: -4,
      filter: "blur(3px)",
      zIndex: 2,
    },
    right: {
      x: 220,
      scale: 0.88,
      opacity: 0.5,
      rotate: 4,
      filter: "blur(3px)",
      zIndex: 2,
    },
    hidden: {
      opacity: 0,
      scale: 0.75,
      zIndex: 1,
    },
  };

  return (
    <section
      id="services"
      className="relative bg-white overflow-hidden py-16 md:py-24"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 items-center text-center mb-12 md:mb-16 px-6">
        <p className="font-poppins text-sm md:text-lg font-medium tracking-widest text-[#453abc] uppercase">
          What We Do
        </p>

        <h2 className="text-[#191a23] text-3xl md:text-5xl font-poppins font-medium">
          Our <span className="text-[#453abc]">Services</span>
        </h2>

        <p className="text-[#6b7280] max-w-xl text-base md:text-lg">
          Discover Techtide Co.'s expertise in web development, mobile apps, and
          digital marketing.
        </p>
      </div>

      {/* Slider Container */}
      <div
        className="relative max-w-7xl mx-auto h-[450px] md:h-[500px] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {loading ? (
          <Loader2 className="w-10 h-10 text-[#453abc] animate-spin" />
        ) : (
          <AnimatePresence>
            {services.map((service, index) => {
              const position = getPosition(index);
              const xOffset =
                position === "left" ? -280 : position === "right" ? 280 : 0;
              const mobileXOffset =
                position === "left" ? -160 : position === "right" ? 160 : 0;

              const getImageUrl = (path: string) => {
                if (!path) return "";
                if (path.startsWith("http")) return path;
                return `http://localhost:5000${path}`;
              };

              return (
                <motion.div
                  key={service._id}
                  className="absolute w-[280px] md:w-[350px]"
                  variants={variants}
                  animate={position}
                  transition={{ duration: 0.7, ease: "easeInOut" }}
                  style={{
                    x:
                      typeof window !== "undefined" && window.innerWidth < 768
                        ? mobileXOffset
                        : xOffset,
                  }}
                >
                  <ServiceCard
                    title={service.title}
                    description={service.shortDescription}
                    image={getImageUrl(service.image)}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {/* Controls - Hidden on very small screens to avoid clutter if needed, or just smaller */}
        <div className="absolute inset-x-4 md:inset-x-10 flex justify-between pointer-events-none z-10">
          <button
            onClick={handlePrevious}
            className="pointer-events-auto bg-white/90 backdrop-blur border border-gray-200 p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110 active:scale-90"
          >
            <ChevronLeft size={24} className="text-[#453abc]" />
          </button>

          <button
            onClick={handleNext}
            className="pointer-events-auto bg-white/90 backdrop-blur border border-gray-200 p-2 md:p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110 active:scale-90"
          >
            <ChevronRight size={24} className="text-[#453abc]" />
          </button>
        </div>
      </div>
    </section>
  );
}
