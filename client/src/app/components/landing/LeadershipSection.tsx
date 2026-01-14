import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Mail, Linkedin, Instagram } from "lucide-react";
import imgNadir from "@/assets/nadir.png";
import imgMoazzam from "@/assets/Moazzam.png";
import imgSajid from "@/assets/sajideen.png";
import imgAmmar from "@/assets/Muhammad Ammar Haider.png";
import imgShamin from "@/assets/Shamin.png";

const leaders = [
  {
    name: "Muhammad Nadir",
    role: "CEO & Founder",
    image: imgNadir,
    message:
      "As CEO and Founder of TechTide Corporate, I lead our vision to deliver innovative, scalable technology solutions while empowering businesses and nurturing Pakistan’s digital talent ecosystem.",
    social: {
      linkedin: "https://www.linkedin.com/in/muhammad-nadir-202186383/",
      gmail: "ceo@techtidecorporate.com",
      instagram: "https://www.instagram.com/m.nadirdurrani/",
    },
  },
  {
    name: "Muhammad Moazzam",
    role: "CFO",
    image: imgMoazzam,
    message:
      "As CFO at TechTide Co., I oversee financial strategy, budgeting, and risk management to ensure sustainable growth, profitability, and long-term financial stability across all operations.",
    social: {
      gmail: "moazzam2526@gmail.com",
      linkedin: "https://www.linkedin.com/in/muhammad-moazzam-366bb238b/",
      instagram: "#",
    },
  },
  {
    name: "Sajideen Hassan",
    role: "CTO",
    image: imgSajid,
    message:
      "As CTO of TechTide Corporate, I lead our engineering strategy by building secure, high-performance architectures and driving innovation that powers reliable, future-ready digital products.",
    social: {
      gmail: "sajideenhassan12@gmail.com",
      linkedin: "https://www.linkedin.com/in/sajideen-hassan-79875428a/",
      instagram: "https://www.instagram.com/notshigri/",
    },
  },
  {
    name: "Shamin Gull",
    role: "COO",
    image: imgShamin,
    message:
      "As COO at TechTide Co., I manage company-wide operations by aligning teams, optimizing workflows, and ensuring efficient project execution with consistent quality and accountability.",
    social: {
      gmail: "Khanshamin512@gmail.com",
      linkedin: "https://www.linkedin.com/in/shamin-gul-khan/",
      instagram: "https://www.instagram.com/gul.shamin.khan/",
    },
  },
  {
    name: "Muhammad Ammar",
    role: "Digital Marketing Head",
    image: imgAmmar,
    message:
      "As Digital Marketing Head at TechTide Corporate, I lead performance-driven marketing strategies that enhance brand visibility, generate demand, and expand our global digital presence.",
    social: {
      gmail: "ammarhaider75@gmail.com",
      linkedin: "https://www.linkedin.com/in/ammarhaider75/",
      instagram: "https://www.instagram.com/ammarhaider_here/",
    },
  },
];

export function LeadershipSection() {
  const [current, setCurrent] = useState(0);

  // Rotate leaders every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % leaders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleEmailClick = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    toast.success("Email copied to clipboard!");
  };

  return (
    <section
      id="leadership"
      className="relative min-h-screen bg-white py-20 overflow-hidden"
    >
      <h2 className="text-3xl md:text-4xl text-center font-poppins text-gray-900 mb-12 md:mb-20 px-6">
        <span className=" bg-gradient-to-r from-[#453abc] to-[#60c3e3] bg-clip-text text-transparent">
          Leadership <span className="text-black">& </span>Higher Management
        </span>
      </h2>

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-28">
        {/* Text Section */}
        <div className="flex-1 max-w-full lg:max-w-[500px] text-center lg:text-left">
          <h3
            className="text-4xl md:text-5xl font-bold mb-2 leading-tight"
            style={{
              WebkitTextFillColor: "transparent",
              backgroundImage:
                "linear-gradient(95.6204deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)",
              backgroundClip: "text",
            }}
          >
            {leaders[current].name}
          </h3>
          <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 uppercase tracking-wide">
            {leaders[current].role}
          </p>
          <div className="relative mb-10">
            <span className="absolute -left-6 -top-4 text-4xl text-[#453abc] opacity-20 font-serif">
              "
            </span>
            <p className="text-[#4b5563] text-lg leading-relaxed italic">
              {leaders[current].message}
            </p>
            <span className="absolute -right-2 -bottom-4 text-4xl text-[#453abc] opacity-20 font-serif">
              "
            </span>
          </div>

          {/* Social Links */}
          <div className="flex justify-center lg:justify-start gap-4">
            <a
              href="#"
              onClick={(e) =>
                handleEmailClick(e, leaders[current].social.gmail)
              }
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#453abc] hover:text-white transition-all duration-300"
              aria-label="Gmail"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href={leaders[current].social.linkedin}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white transition-all duration-300"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={leaders[current].social.instagram}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-[#E1306C] hover:text-white transition-all duration-300"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 relative w-full h-[350px] md:h-[500px] flex justify-center items-center">
          {/* Mobile View: Simple Fade */}
          <div className="lg:hidden relative w-full h-full flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={leaders[current].name}
                src={leaders[current].image}
                alt={leaders[current].name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                onClick={() =>
                  setCurrent((prev) => (prev + 1) % leaders.length)
                }
                className="w-auto h-full max-h-[350px] object-contain drop-shadow-xl cursor-pointer"
              />
            </AnimatePresence>
          </div>

          {/* Desktop View: 3D Carousel */}
          <div className="hidden lg:block relative w-full max-w-sm h-full perspective-1000">
            {leaders.map((leader, index) => {
              const position =
                (index - current + leaders.length) % leaders.length;

              // Position logic for 5 elements
              let xOffset = 0;
              let scale = 1;
              let blur = "0px";
              let rotateY = 0;
              let zIndex = 20;
              let opacity = 0;

              if (position === 0) {
                // Center/Front - Crystal Clear
                xOffset = 0;
                scale = 1;
                zIndex = 30;
                opacity = 1;
                blur = "0px";
              } else if (position === 1) {
                // Right side - Blurred
                xOffset = 220;
                scale = 0.75;
                rotateY = -25;
                zIndex = 20;
                opacity = 0.4;
                blur = "12px";
              } else if (position === 4) {
                // Left side - Blurred
                xOffset = -220;
                scale = 0.75;
                rotateY = 25;
                zIndex = 20;
                opacity = 0.4;
                blur = "12px";
              } else {
                // In the back - Completely hidden and scaled to zero
                xOffset = 0;
                scale = 0;
                zIndex = 5;
                opacity = 0;
                blur = "0px";
              }

              return (
                <motion.img
                  key={leader.name}
                  src={leader.image}
                  alt={leader.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity,
                    scale,
                    x: xOffset,
                    zIndex,
                    filter: `blur(${blur})`,
                    rotateY,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  onClick={() => setCurrent(index)}
                  className="absolute top-0 left-0 w-full h-full object-contain object-top cursor-pointer"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
