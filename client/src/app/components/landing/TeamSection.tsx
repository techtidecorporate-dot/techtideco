import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imgStarPerspectiveMatte from "@/assets/cf7fdeeb7451e56ef87ed8cccb007fc1a40a954f.png";
import ReviewImage from "@/assets/review2.png";

export function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);

  const reviews = [
    {
      name: "Romeena De Silva",
      role: "Janet Cosmetics",
      image: ReviewImage,
      message:
        "Without any doubt, I wholeheartedly recommend Alkaline Solutions as a premier agency for web design and digital marketing. Their expertise, professionalism, and results are truly among the best I have ever encountered in the industry.",
    },
    {
      name: "Imran Khan",
      role: "Software Engineer",
      image: ReviewImage,
      message:
        "Our experience was nothing short of fantastic from start to finish. The team not only grasped our complex requirements perfectly but consistently delivered solutions that exceeded our expectations in quality and innovation.",
    },
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      image: ReviewImage,
      message:
        "I was thoroughly impressed by their incredibly professional, responsive, and skilled approach to every task. For anyone seeking top-tier quality and reliability, I cannot recommend this team highly enough for your project.",
    },
    {
      name: "David Kim",
      role: "Product Manager",
      image: ReviewImage,
      message:
        "This team was absolutely instrumental in helping us achieve rapid scale by building a clean, modern, and incredibly intuitive user interface that our customers love and that drives our growth.",
    },
    {
      name: "Lisa Anderson",
      role: "DevOps Engineer",
      image: ReviewImage,
      message:
        "We found the team to be exceptionally reliable, deeply knowledgeable, and a true partner. Smooth, transparent, and proactive communication was maintained at every single stage of our complex project's lifecycle.",
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
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
                <p className="text-[10px] text-gray-500 whitespace-nowrap">
                  {review.role}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
