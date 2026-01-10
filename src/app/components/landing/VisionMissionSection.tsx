import { Quote } from "lucide-react";

export default function VisionMission() {
  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-16 overflow-hidden">
      {/* Vision */}
      <div className="mb-20">
        <h2 className="text-3xl md:text-5xl font-poppins font-medium mb-12 text-center md:text-left">
          Our{" "}
          <span className="bg-gradient-to-r from-[#453abc] to-[#60c3e3] bg-clip-text text-transparent">
            Vision
          </span>
        </h2>

        <div className="relative border border-gray-200 rounded-[2.5rem] md:rounded-[40px] p-8 md:p-16 shadow-sm hover:shadow-md transition-shadow">
          {/* Quote Icon */}
          <div className="absolute -top-8 right-8 md:-top-10 md:right-16">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#453abc] to-[#60c3e3] flex items-center justify-center shadow-lg">
              <Quote className="text-white w-8 h-8 md:w-10 md:h-10" />
            </div>
          </div>

          {/* Content */}
          <p className="text-base md:text-xl text-gray-700 leading-relaxed max-w-5xl italic md:not-italic">
            At TechTide, we envision transforming IT systems into smart, agile,
            and AI-driven digital assets. With a decade of expertise, we empower
            global clients through innovative, adaptive solutions, shaping a
            future where technology meets the dynamic demands of a connected
            world.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div>
        <h2 className="text-3xl md:text-5xl font-poppins font-medium mb-12 text-center md:text-left">
          Our{" "}
          <span className="bg-gradient-to-r from-[#453abc] to-[#60c3e3] bg-clip-text text-transparent">
            Mission
          </span>
        </h2>

        <div className="relative border border-gray-200 rounded-[2.5rem] md:rounded-[40px] p-8 md:p-16 shadow-sm hover:shadow-md transition-shadow">
          {/* Quote Icon */}
          <div className="absolute -top-8 right-8 md:-top-10 md:right-16">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#453abc] to-[#60c3e3] flex items-center justify-center shadow-lg">
              <Quote className="text-white w-8 h-8 md:w-10 md:h-10" />
            </div>
          </div>

          {/* Content */}
          <p className="text-base md:text-xl text-gray-700 leading-relaxed max-w-5xl italic md:not-italic">
            Our mission is to deliver scalable, secure, and intelligent digital
            solutions that help businesses innovate faster, operate smarter, and
            achieve sustainable growth through cutting-edge technology.
          </p>
        </div>
      </div>
    </section>
  );
}
