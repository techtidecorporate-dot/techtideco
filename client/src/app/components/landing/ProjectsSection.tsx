import imgNexusClinic from "@/assets/nexus.png";
import imgRaynovaTech from "@/assets/raynova.png";
import { useState } from "react";

// Placeholder for missing asset
const imgSerenaiva = imgNexusClinic;
import { motion } from "framer-motion";

// ProjectCard component removed as it was unused

const projects = [
  {
    title: "Nexus Clinic",
    description:
      "Nexus Clinic is a full-scale MERN healthcare management system designed to connect patients, doctors, and clinic administrators. It offers secure authentication, appointment booking, telemedicine, medical record management, and role-based dashboards to streamline clinical operations.",
    image: imgNexusClinic,
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Cloudinary",
    ],
  },
  {
    title: "RaynovaTech Website",
    description:
      "RaynovaTech is a modern corporate technology and solutions website showcasing innovative IT services, digital solutions, and enterprise-grade offerings. This project highlights responsive design, intuitive navigation, and engaging UI to present the brand effectively online.",
    image: imgRaynovaTech,
    technologies: [
      "React",
      "Tailwind CSS",
      "Responsive Web Design",
      "SEO Optimization",
      "JavaScript",
      "UI/UX Design",
    ],
  },
  {
    title: "Sereniva Premium Spa & Wellness Management System",
    description:
      "Sereniva is a premium spa and wellness management Single Page Application that enables clients to explore services, book therapists, manage profiles, and leave reviews, while administrators efficiently control bookings, content, users, and operations through a powerful dashboard.",
    image: imgSerenaiva,
    technologies: [
      "React",
      "Tailwind CSS",
      "Firebase",
      "SPA Architecture",
      "Responsive UI",
      "Framer Motion",
      "GSAP",
      "React Router",
    ],
  },
];

// Imports moved to top

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex];

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12 md:mb-20 px-6">
        <p className="font-poppins text-sm md:text-lg font-medium tracking-widest text-[#453abc] uppercase mb-3">
          Our Recent Work
        </p>
        <h2 className="text-3xl md:text-5xl font-poppins font-medium mb-6">
          Our{" "}
          <span className="bg-gradient-to-r from-[#453abc] to-[#60c3e3] bg-clip-text text-transparent">
            Latest
          </span>{" "}
          Projects
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg">
          Browse our recent projects showcasing innovative technology solutions
          and creative digital experiences.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Image */}
        <div className="bg-gray-100 rounded-[2rem] p-4 md:p-8 shadow-inner overflow-hidden">
          <motion.img
            key={activeProject.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={activeProject.image}
            alt={activeProject.title}
            className="rounded-xl w-full shadow-2xl h-[250px] md:h-auto object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full text-center lg:text-left">
          <h3 className="text-3xl md:text-4xl font-poppins font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeProject.title}
          </h3>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
            {activeProject.description}
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            {activeProject.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-4 py-2 text-xs md:text-sm font-medium rounded-xl bg-gradient-to-r from-[#453abc]/10 to-[#60c3e3]/10 text-[#453abc] border border-[#453abc]/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="max-w-5xl mx-auto mt-12 md:mt-20 flex justify-center gap-4 md:gap-6 px-6 overflow-x-auto no-scrollbar">
        {projects.map((project, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex-shrink-0 border-2 rounded-xl p-1.5 transition-all duration-300
              ${
                activeIndex === index
                  ? "border-[#453abc] shadow-lg scale-110"
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-24 h-16 md:w-32 md:h-20 object-cover rounded-lg"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
