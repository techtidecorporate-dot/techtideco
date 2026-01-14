import heroVideo from "@/assets/hero.mp4";
import { FloatingCTA } from "../../components/ui/FloatingCTA";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen min-h-screen w-full overflow-hidden bg-gray-900">
      <FloatingCTA />

      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-6 md:px-[70px] pt-32 md:pt-42">
        <div className="max-w-[986px]">
          <h1 className="mb-6 md:mb-8 leading-tight">
            <span className="font-poppins block text-white text-2xl md:text-[2rem] tracking-tight mb-2">
              Building Technology
            </span>
            <span className="font-poppins block text-white text-4xl md:text-[4rem] tracking-tight">
              Investing <br className="hidden md:block" />
              in Tomorrow's Pakistan
            </span>
          </h1>

          <div className="space-y-4 md:space-y-2 text-base md:text-[1rem] w-full md:w-[600px] leading-relaxed md:leading-tight">
            <p className="m-0">
              <span
                className="bg-clip-text"
                style={{
                  WebkitTextFillColor: "transparent",
                  backgroundImage:
                    "linear-gradient(98.6725deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)",
                }}
              >
                We are Corporate LLP committed to excellence in Digital
                solutions, Channeling profits directly into youth growth,
                critical employment and free education resources.
              </span>
            </p>
            <p className="text-white mt-2 font-medium">Partner with purpose.</p>
          </div>

          <button
            className="px-8 py-3 mt-8 md:mt-4 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
            style={{
              backgroundImage:
                "linear-gradient(93.1835deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)",
            }}
            onClick={() => navigate("/services")}
          >
            <span className="text-white font-medium">Explore Services</span>
          </button>
        </div>
      </div>
    </section>
  );
}
