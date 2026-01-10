import { ExternalLink } from "lucide-react";
import imgFrame15 from "@/assets/80d61d17f2eedb3360eb75e42daf1c2edc16e351.png";
import imgLinkedinLogo from "@/assets/5b20ff7d2c56b7b458e377fa7bd3ef1f75118fea.png";
import imgGmailLogo from "@/assets/b350107bd00a655e6a6e60b806ac2ce72d6ac305.png";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

function ProjectCard({
  title,
  description,
  image,
  technologies,
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl group">
      <div className="relative h-64 overflow-hidden">
        <img
          alt={title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
          src={image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
          <ExternalLink className="w-5 h-5 text-[#453abc]" />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-[#191a23] text-xl mb-3">{title}</h3>
        <p className="text-[#374151] text-sm leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-[#453abc]/10 to-[#60c3e3]/10 text-[#453abc] rounded-full text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const projects = [
  {
    title: "Momento",
    description:
      "Momento is a modern fashion e-commerce platform that celebrates individual style. The brand curates everyday essentials and statement pieces designed to empower customers to express themselves authentically, wherever life takes them.",
    image: imgFrame15,
    technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS", "GSAP"],
  },
  {
    title: "FinTech Dashboard",
    description:
      "A real-time financial analytics dashboard with smart reports, charts, and performance insights.",
    image: imgFrame15,
    technologies: ["Next.js", "TypeScript", "Chart.js", "Redis"],
  },
  {
    title: "Healthcare Portal",
    description:
      "Secure patient management system with telemedicine and medical record handling.",
    image: imgFrame15,
    technologies: ["Vue.js", "Python", "MongoDB", "Docker"],
  },
];

import { useState } from "react";
import { motion } from "framer-motion";

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
