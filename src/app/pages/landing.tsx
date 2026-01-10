import React from "react";
import { HeroSection } from "../components/landing/HeroSection";
import VisionMissionSection from "../components/landing/VisionMissionSection";
import { ServicesSection } from "../components/landing/ServicesSection";
import { ProjectsSection } from "../components/landing/ProjectsSection";
import { TeamSection } from "../components/landing/TeamSection";
import { LeadershipSection } from "../components/landing/LeadershipSection";
import { BlogSection } from "../components/landing/BlogSection";
import { SupportSection } from "../components/landing/SupportSection";

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
