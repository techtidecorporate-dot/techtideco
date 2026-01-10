import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TeamMemberCard from "./TeamMemberCard";

interface AutoSliderProps {
  members: any[];
  title: string;
  color: string;
}

const AutoSlider: React.FC<AutoSliderProps> = ({ members, title, color }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const cardsToShow = 4; // Number of cards visible at once

  // Duplicate members for infinite loop effect
  const duplicatedMembers = [...members, ...members];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Auto-advance every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // When we reach the end of the first set, instantly reset to the beginning
    if (currentIndex >= members.length) {
      setIsTransitioning(false);
      setTimeout(() => {
        setCurrentIndex(0);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 50);
    }
  }, [currentIndex, members.length]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <div className={`w-2 h-8 bg-gradient-to-b ${color} rounded-full`} />
        {title}
      </h3>

      <div className="relative overflow-hidden px-4">
        <motion.div
          className="flex gap-2"
          animate={{
            x: `calc(-${currentIndex * (100 / cardsToShow)}%)`,
          }}
          transition={
            isTransitioning
              ? {
                  duration: 0.8,
                  ease: "easeInOut",
                }
              : { duration: 0 }
          }
        >
          {duplicatedMembers.map((member, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / cardsToShow}%` }}
            >
              <TeamMemberCard member={member} color="blue" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {members.map((_: any, index: number) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex % members.length
                ? "w-8 bg-gradient-to-r from-blue-600 to-purple-600"
                : "w-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoSlider;
