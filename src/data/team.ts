export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  image768?: string;
  image480?: string;
  description: string;
  expertise: string[];
  contact: {
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
  social?: {
    linkedin?: string;
    instagram?: string;
  };
  isFounder: boolean;
  badge?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "founder",
    name: "Nikhil Sain",
    role: "Founder & Lead Designer",
    image: "/assets/optimized/team/Nikhil/Nikhil-1024.jpg",
    image768: "/assets/optimized/team/Nikhil/Nikhil-768.jpg",
    image480: "/assets/optimized/team/Nikhil/Nikhil-480.jpg",
    description:
      "Nikhil Sain is an experienced and dynamic interior designer who pursued his Master's at Arch College of Interior and Business in 2017. His philosophy centers on incorporating the client's needs into the design with a creative flair. He focuses on finishes, furnishings, materials and practical solutions that last.",
    expertise: [
      "Interior Design",
      "Space Planning",
      "Project Management",
      "Design Strategy",
    ],
    contact: {
      email: "nikhil@younickdesign.com",
      phone: "+91 8854883058",
      whatsapp: "+91 8854883058",
    },
    social: {
      linkedin: "https://linkedin.com/in/nikhilsain-design",
      instagram: "https://instagram.com/nikhil_younick",
    },
    isFounder: true,
  },
  {
    id: "co-founder",
    name: "Kamal Rajoriya",
    role: "Co-Founder",
    image: "/assets/optimized/team/Kamal/Kamal-1024.jpg",
    image768: "/assets/optimized/team/Kamal/Kamal-768.jpg",
    image480: "/assets/optimized/team/Kamal/Kamal-480.jpg",
    description:
      "Kamal Kumawat is an expert civil engineer who graduated from the University of Engineering and Management, Jaipur. His client-centric approach and technical knowledge ensure projects are built to high standards with efficient execution.",
    expertise: [
      "Construction Management",
      "3D Visualization",
      "Technical Planning",
      "Quality Assurance",
    ],
    contact: {
      email: "kamal@younickdesign.com",
      phone: "+91 9166776697",
      whatsapp: "+91 9166776697",
    },
    social: {
      linkedin: "https://linkedin.com/in/kamalrajoriya-tech",
      instagram: "https://www.instagram.com/kamal_rajoriya99",
    },
    isFounder: true,
  },
  {
    id: "pooja-sain",
    name: "Pooja Sain",
    role: "Architect & Designer · CEO",
    image: "/assets/optimized/team/Pooja/Pooja-1024.jpg",
    image768: "/assets/optimized/team/Pooja/Pooja-768.jpg",
    image480: "/assets/optimized/team/Pooja/Pooja-480.jpg",
    description:
      "Pooja leads design thinking and operations, bringing sustainable architecture and refined detailing to every project.",
    expertise: [
      "Architecture",
      "Sustainable Design",
      "3D Visualization",
      "Design Detailing",
    ],
    contact: {
      email: "pooja@younickdesign.com",
      phone: "+91 90000 00000",
      whatsapp: "+91 90000 00000",
    },
    social: {
      linkedin: "https://linkedin.com/in/pooja-sain",
      instagram: "https://instagram.com/pooja_sain_design",
    },
    isFounder: true,
    badge: "CEO",
  },
{
    id: "keshav-sain",
    name: "Keshav Sain",
    role: "Technical Assistant ",
    image: "/assets/optimized/team/Keshav/Keshav-1024.jpg",
    image768: "/assets/optimized/team/Keshav/Keshav-768.jpg",
    image480: "/assets/optimized/team/Keshav/Keshav-480.jpg",
    description:
      "Keshav supports design thinking and operations, ensuring technical excellence in every project.",
    expertise: [
      "Technical Support",
      "3D Visualization",
      "Design Implementation",
    ],
    contact: {
      email: "keshavsain.jpr@gmail.com",
      phone: "+91 9887159297",
      whatsapp: "+91 9887159297",
    },
    social: {
      linkedin: "https://linkedin.com/in/keshav-sain-4450271b2 ",
      instagram: "https://instagram.com/keshav_sain_design",
    },
    isFounder: false,
    badge: "Member",
  },
];
