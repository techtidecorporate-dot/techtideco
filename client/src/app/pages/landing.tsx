import React from "react";
import { HeroSection } from "./landing/HeroSection";
import VisionMissionSection from "./landing/VisionMissionSection";
import { ServicesSection } from "./landing/ServicesSection";
import { ProjectsSection } from "./landing/ProjectsSection";
import { TeamSection } from "./landing/testimonials";
import { LeadershipSection } from "./landing/LeadershipSection";
import { BlogSection } from "./landing/BlogSection";
import { SupportSection } from "./landing/SupportSection";

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#f8f9fa] to-[#eef2f7]">
      <HeroSection />
      <ServicesSection />
      <VisionMissionSection />
      <ProjectsSection />
      <TeamSection />
      <LeadershipSection />
      <BlogSection />
      <SupportSection />
    </div>
  );
};

export default LandingPage;
