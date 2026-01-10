import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import imgBilal from "@/assets/review2.png";
import imgSarah from "@/assets/review2.png";
import imgJohn from "@/assets/review2.png";

const leaders = [
  {
    name: "Mr. Muhammad Nadir",
    role: "CEO & Founder",
    image: imgBilal,
    message: `Techtide was founded on a vision that goes beyond the balance sheet. We are committed to achieving commercial excellence, but our ultimate mandate is to fuel Pakistan's future. Every successful project with Techtide directly funds youth employment, educational initiatives, and sustainable charity chains. Our success is our nation's progress. We invite you to partner with purpose.`,
  },
  {
    name: "Ms. Sarah Khan",
    role: "COO",
    image: imgSarah,
    message: `Sarah leads operational excellence across all departments, ensuring smooth processes and high performance.`,
  },
  {
    name: "Mr. John Doe",
    role: "CTO",
    image: imgJohn,
    message: `John drives technological innovation, building robust systems that empower the business.`,
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

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
        {/* Text Section */}
        <div className="flex-1 max-w-full lg:max-w-[600px] text-center lg:text-left">
          <h3
            className="text-2xl md:text-4xl font-bold bg-clip-text mb-4 leading-tight"
            style={{
              WebkitTextFillColor: "transparent",
              backgroundImage:
                "linear-gradient(95.6204deg, rgb(69, 58, 188) 0%, rgb(96, 195, 227) 103.41%)",
            }}
          >
            {leaders[current].role} <br /> {leaders[current].name}
          </h3>
          <p className="text-[#374151] mb-8 leading-relaxed italic md:not-italic">
            "{leaders[current].message}"
          </p>

          <div className="flex justify-center lg:justify-start gap-4 mb-8">
            <button className="p-3 rounded-full bg-gray-50 hover:bg-gray-200 transition-colors">
              <i className="fab fa-facebook-f text-[#453abc]" />
            </button>
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <i className="fab fa-instagram text-[#453abc]" />
            </button>
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <i className="fas fa-envelope text-[#453abc]" />
            </button>
          </div>

          <button className="px-8 py-3 bg-[#4b49c6] text-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all font-medium">
            Read More
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-1 relative w-full max-w-[280px] md:max-w-sm h-[350px] md:h-[500px] perspective-1000">
          {leaders.map((leader, index) => {
            const position =
              (index - current + leaders.length) % leaders.length;

            // Front leader = 0, middle = 1, back = 2
            let xOffset = 0;
            let scale = 1;
            let blur = "0px";
            let rotateY = 0;
            let zIndex = 20;

            if (position === 1) {
              xOffset = 60; // Reduced for mobile
              scale = 0.85;
              blur = "2px";
              rotateY = -15;
              zIndex = 10;
            } else if (position === 2) {
              xOffset = -60; // Reduced for mobile
              scale = 0.85;
              blur = "2px";
              rotateY = 15;
              zIndex = 5;
            }

            return (
              <motion.img
                key={leader.name}
                src={leader.image}
                alt={leader.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: position === 0 ? 1 : 0.6,
                  scale,
                  x: xOffset,
                  zIndex,
                  filter: `blur(${blur})`,
                  rotateY,
                }}
                transition={{ duration: 0.8 }}
                className="absolute top-0 left-0 w-full h-[300px] md:h-[400px] object-contain object-top rounded-3xl"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
