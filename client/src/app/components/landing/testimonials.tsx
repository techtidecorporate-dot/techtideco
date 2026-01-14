import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReviewImage1 from "@/assets/review 1.png";
import ReviewImage2 from "@/assets/review 2.png";
import ReviewImage3 from "@/assets/review 3.png";
import ReviewImage4 from "@/assets/review 4.png";
import ReviewImage5 from "@/assets/review5.png";
export function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);

  const reviews = [
    {
      name: "Ethan Rhodes",
      role: "Founder, Janet Cosmetics",
      image: ReviewImage1,
      message:
        "Without any doubt, I highly recommend TechTide Co. as a professional technology partner. Their expertise in web development and digital strategy delivered exceptional results for our brand.",
    },
    {
      name: "Julianne Ross",
      role: "Software Engineer",
      image: ReviewImage2,
      message:
        "Working with TechTide Corporate was an excellent experience. The team clearly understood complex requirements and delivered scalable, high-quality solutions with outstanding technical precision.",
    },
    {
      name: "Konradas Česnulis",
      role: "Frontend Developer",
      image: ReviewImage3,
      message:
        "TechTide Co. impressed me with their professionalism, responsiveness, and attention to detail. The collaboration was smooth, efficient, and focused on delivering real business value.",
    },
    {
      name: "David Kim",
      role: "Product Manager",
      image: ReviewImage4,
      message:
        "The TechTide Corporate team played a key role in scaling our product by building a modern, intuitive interface that significantly improved user engagement and customer satisfaction.",
    },
    {
      name: "Lisa Anderson",
      role: "DevOps Engineer",
      image: ReviewImage5,
      message:
        "TechTide Co. proved to be a reliable and knowledgeable partner. Their transparent communication and proactive approach ensured smooth delivery across every phase of our project.",
    },
  ];

  /* 🔁 Auto Slide */
  useEffect(() => {
    if (isManual) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isManual, reviews.length]);

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12 px-6">
        <h2 className="text-3xl md:text-4xl font-poppins text-[#191a23]">
          Why{" "}
          <span className="bg-gradient-to-r from-[#453abc] to-[#60c3e3] bg-clip-text text-transparent">
            Customers
          </span>{" "}
          Love
        </h2>
        <h3 className="text-2xl md:text-3xl font-poppins text-gray-800">
          Working With Us
        </h3>
      </div>

      {/* Review Message */}
      <div className="max-w-4xl mx-auto text-center mb-12 relative min-h-[180px] md:min-h-[140px] px-8 md:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Left Quote */}
            <span className="absolute -top-4 -left-2 md:-top-6 md:-left-4 text-[#F76680] text-4xl md:text-6xl font-serif opacity-80 select-none">
              “
            </span>

            {/* Message */}
            <p className="mx-auto max-w-3xl text-base md:text-xl text-[#6b7280] leading-relaxed italic">
              {reviews[activeIndex].message}
            </p>

            {/* Right Quote */}
            <span className="absolute -bottom-12 md:-bottom-10 -right-2 md:-right-4 text-[#F76680] text-4xl md:text-6xl font-serif opacity-80 select-none">
              ”
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Profile Slider */}
      <div className="flex justify-start md:justify-center items-end gap-6 md:gap-8 overflow-x-auto md:overflow-visible px-8 pb-4 no-scrollbar">
        {reviews.map((review, index) => {
          const isActive = index === activeIndex;

          return (
            <motion.button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setIsManual(true);
              }}
              animate={{
                scale: isActive ? 1.1 : 0.85,
                opacity: isActive ? 1 : 0.4,
                filter: isActive ? "blur(0px)" : "blur(1px)",
              }}
              transition={{
                default: { type: "spring", stiffness: 300, damping: 25 },
                filter: { type: "tween", ease: "easeInOut", duration: 0.3 },
              }}
              className="text-center cursor-pointer flex-shrink-0"
            >
              <div className="relative mb-3">
                <div
                  className={`rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto transition-all ${
                    isActive
                      ? "w-20 h-20 md:w-24 md:h-24"
                      : "w-16 h-16 md:w-20 md:h-20"
                  }`}
                >
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div
                className={`transition-all ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              >
                <h4 className="text-xs font-semibold text-[#191a23] whitespace-nowrap">
                  {review.name}
                </h4>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
