import React from "react";
import {
  HeroSection,
  VisionMissionSection,
  ServicesSection,
  ProjectsSection,
  TeamSection,
  LeadershipSection,
  BlogSection,
  SupportSection,
} from "../components/landing";

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
