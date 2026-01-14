import { Quote } from "lucide-react";

export function VisionMissionSection() {
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
            Techtide Corporate LLP is committed to setting a global standard in
            technological excellence. More than a software company, we serve as
            a trusted partner in innovation and meaningful impact using advanced
            technology to uplift communities and build a future-ready world from
            Pakistan outward.
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
            Techtide Corporate LLP is committed to crafting exceptional digital
            solutions and reinvesting our growth where it matters into the
            youth, into critical job creation, and into open access to
            education. We stand for progress with intent and partnerships that
            make a difference
          </p>
        </div>
      </div>
    </section>
  );
}
