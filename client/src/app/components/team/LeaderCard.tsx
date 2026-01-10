import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { TeamMember } from "@/types";

interface LeaderCardProps {
  member: TeamMember;
  isCEO?: boolean;
}

const LeaderCard: React.FC<LeaderCardProps> = ({ member }) => {
  const imageUrl =
    typeof member.image === "string" && member.image.startsWith("/uploads")
      ? `http://localhost:5000${member.image}`
      : member.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div
        className={`group relative rounded-3xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-3xl w-80 h-96`}
      >
        {/* Full Image Background */}
        <img
          src={imageUrl}
          alt={`Professional portrait of ${member.name}, ${member.role}`}
          className="absolute inset-0 w-full h-full object-contain object-top bg-transparent transition-transform duration-500 group-hover:scale-110"
        />

        {/* Content - Slides up from bottom on hover */}
        <div className="absolute bottom-0 w-full p-6 transform translate-y-full transition-transform duration-500 group-hover:translate-y-0">
          <div className="bg-slate-700 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/20">
            <h3 className="text-xl font-bold text-white leading-tight">
              {member.name}
            </h3>
            <p className="text-sm uppercase tracking-wide text-white/90 mt-2">
              {member.role}
            </p>

            {/* Social Icons - Shown on hover */}
            <div className="flex gap-3 mt-4">
              {member.social?.linkedin && (
                <a
                  href={member.social.linkedin}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                </a>
              )}
              {member.social?.email && (
                <a
                  href={member.social.email}
                  className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
                >
                  <Mail className="w-4 h-4 text-white" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeaderCard;
