import { TeamMember, TeamCategory } from "@/types";
import Image from "@/assets/nadir.png";
import CTO from '@/assets/sajideen.png'
import CFO from '@/assets/Moazzam.png'
import COO from '@/assets/Shamin.png'
import MarketingHead from '@/assets/Muhammad Ammar Haider.png'
import Bilal from '@/assets/Bilal.png' 
import Mubashir from '@/assets/mubashir.png'
import Hammad from '@/assets/Hammad.png'
import Ali from '@/assets/Ali.png'
import Mahmood from '@/assets/Mahmood.png'
import Mashood from '@/assets/Mashood.png'
import Ayesha from '@/assets/Ayesha.png'
import Aresha from '@/assets/Aresha.png'
import Saira from '@/assets/Saira.png'
import Amna from '@/assets/Amna.png'

export const leadership: TeamMember[] = [
  {
    _id: "CEO-1",
    name: "Muhammad Nadir",
    role: "Founder & CEO",
    category: "CEO",
    department: "Executive",
    image: Image,
    description: "Visionary leader driving innovation and strategic excellence",
    social: { linkedin: "#", email: "#" },
    skills: []
  },
  {
    _id: "CTO-1",
    name: "Sajideen Hassan",
    role: "CTO",
    category: "CTO",
    department: "Engineering",
    image: CTO,
    description: "Technology strategy and engineering leadership",
    social: { linkedin: "#" },
    skills: []
  },
  {
    _id: "CFO-1",
    name: "Muhammad Moazzam",
    role: "CFO",
    category: "CFO",
    department: "Finance",
    image: CFO,
    description: "Financial planning and business growth",
    social: { linkedin: "#" },
    skills: []
  },
  {
    _id: "COO-1",
    name: "Shamin Gull",
    role: "COO",
    category: "COO",
    department: "Operations",
    image: COO,
    description: "Operations and execution excellence",
    social: { linkedin: "#" },
    skills: []
  },
];

export const developmentTeam: TeamCategory = {
  head: [
    {
      _id: "DEV-HEAD-1",
      name: "Mubashir Ahmad Hamza",
      role: "Development Head",
      category: "Head",
      department: "Development",
      image: Mubashir,
      skills: ["MERN Stack", "Firebase", "Tailwind CSS", "JavaScript", "React", "Node.js", "TypeScript"],
    },
  ],
  senior: [
    {
      _id: "DEV-SNR-1",
      name: "Ahmed Bilal",
      role: "Senior Software Engineer",
      category: "Senior",
      department: "Development",
      image: Bilal,
      skills: ["MERN stack", "Firebase", "JavaScript", "React", "Node.js", "TypeScript"],
    },
    {
      _id: "DEV-SNR-2",
      name: "Hammad Ali",
      role: "Senior Front-end Deevloper",
      category: "Senior",
      department: "Development",
      image: Hammad,
      skills: ["React", "Tailwind CSS", "JavaScript", "Node.js", "TypeScript"],
    },
  ],
  junior: [
    {
      _id: "DEV-JNR-1",
      name: "Ali Javed",
      role: "Junior Wordpress Developer",
      category: "Junior",
      department: "Development",
      image: Ali,
      skills: ["Elementor", "woocommerce"],
    },
    {
      _id: "DEV-JNR-2",
      name: "Mahmood",
      role: "Junior Website Designer",
      category: "Junior",
      department: "Development",
      image: Mahmood,
      skills: ["Figma", "Photoshop", "Illustrator", "Canva"],
    },
    {
      _id: "DEV-JNR-3",
      name: "Mashhood Shafqat ",
      role: "Junior Software Engineer",
      category: "Junior",
      department: "Development",
      image: Mashood,
      skills: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    },
  ],
  intern: [
    {
      _id: "DEV-INT-1",
      name: "Ayesha Durrani",
      role: "Web Developer",
      category: "Intern",
      department: "Development",
      image: Ayesha,
      skills: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
    }
  ],
};

export const marketingTeam: TeamCategory = {
  head: [
    {
      _id: "MKT-HEAD-1",
      name: "MuhammadAmmar Haider",
      role: "Head of Digital Marketing",
      category: "Head",
      department: "Marketing",
      image: MarketingHead,
      description: "Brand growth and performance marketing",
      social: { linkedin: "#" },
      skills: []
    },
  ],
  senior: [
    {
      _id: "MKT-SNR-1",
      name: "Syeda Aresha",
      role: "Business Developer",
      category: "Senior",
      department: "Marketing",
      image: Aresha,
      skills: ["SEO", "Analytics"],
    },
  ],
  junior: [
    {
      _id: "MKT-JNR-1",
      name: "Amna Durrani",
      role: "Business Developmer",
      category: "Junior",
      department: "Marketing",
      image: Amna,
      skills: ["Search", "Content"],
    },
    {
      _id: "MKT-JNR-2",
      name: "Saira Shaheen",
      role: "Digital Content Creator",
      category: "Junior",
      department: "Marketing",
      image: Saira,
      skills: ["Search", "Content"],
    },
  ],
  intern: [],
};
