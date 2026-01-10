import { Code, Shield, Smartphone, TrendingUp, Users, Zap } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: "Web Development",
      description:
        "We build fast, secure, and scalable websites designed to enhance performance, visibility, and long-term business growth.",
      gradient: "from-[#453abc] to-[#60c3e3]",
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "Mobile App Development",
      description:
        "We develop high-performance iOS and Android applications that deliver seamless experiences and drive meaningful user engagement.",
      gradient: "from-[#60c3e3] to-[#453abc]",
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Digital Marketing",
      description:
        "We create data-driven digital marketing strategies that increase brand visibility, attract audiences, and convert leads effectively.",
      gradient: "from-[#453abc] via-[#60c3e3] to-[#453abc]",
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Cybersecurity Solutions",
      description:
        "We protect your systems with robust cybersecurity solutions that safeguard data, prevent threats, and ensure business continuity.",
      gradient: "from-[#60c3e3] to-[#453abc]",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Cloud Solutions",
      description:
        "We deliver scalable cloud solutions that improve operational efficiency, reduce infrastructure costs, and support business expansion.",
      gradient: "from-[#453abc] to-[#60c3e3]",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "IT Consulting",
      description:
        "We provide strategic IT consulting to help organizations optimize technology decisions and achieve sustainable digital growth.",
      gradient: "from-[#60c3e3] to-[#453abc]",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef2f7] font-inter mt-10">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-transparent shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] hover:border-[#453abc]/10 transition-all duration-500 overflow-hidden group flex flex-col"
            >
              <div className="p-8 md:p-10 lg:p-12">
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white mb-6 md:mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}
                >
                  <div className="scale-75 md:scale-100">{service.icon}</div>
                </div>
                <h3 className="text-xl md:text-2xl font-poppins font-medium text-[#191a23] mb-3  group-hover:text-[#453abc] transition-colors">
                  {service.title}
                </h3>

                <p className="text-[#6b7280] text-sm md:text-base leading-relaxed font-inter">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
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
