import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
      "Techtide exists to build profitable technology while empowering Pakistan’s youth through jobs, education, and sustainable initiatives, turning every successful project into measurable national progress together.",
  },
  {
    name: "Muhammad Moazzam",
    role: "COO",
    image: imgMoazzam,
    message:
      "Moazzam ensures operational excellence by aligning teams, optimizing processes, and delivering projects efficiently, on time, and at scale while maintaining quality, accountability, and continuous improvement.",
  },
  {
    name: "Sajideen Hassan",
    role: "CTO",
    image: imgSajid,
    message:
      "Sajideen leads our technology vision, designing secure, scalable systems, driving innovation, and enabling teams to deliver reliable products using modern architectures and forward-thinking engineering practices.",
  },
  {
    name: "Shamin Gull",
    role: "Operations Manager",
    image: imgShamin,
    message:
      "Shamin manages daily operations and projects, coordinating teams, timelines, and resources to ensure consistent execution, risk control, and precise delivery across all organizational functions companywide.",
  },
  {
    name: "Muhammad Ammar",
    role: "Digital Marketing Head",
    image: imgAmmar,
    message:
      "Ammar leads digital marketing strategy, strengthening brand presence, generating demand, and connecting our solutions with global audiences through data-driven campaigns and performance-focused growth initiatives worldwide.",
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

          <button className="px-8 py-3 bg-[#4b49c6] text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all font-medium">
            Read More
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-1 relative w-full max-w-[200px] md:max-w-sm h-[350px] md:h-[500px] perspective-1000">
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
                alt={`Photo of ${leader.name}, ${leader.role} at Techtide`}
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
                className="absolute top-0 left-0 w-full h-[300px] md:h-[400px] object-contain object-top pointer-events-none"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
