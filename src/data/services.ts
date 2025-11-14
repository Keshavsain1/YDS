// src/data/services.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  keywords?: string[];
}

export const services: Service[] = [
  {
    id: "interior-design",
    title: "Interior Design",
    description:
      "Transform your spaces with functional and timeless interiors — blending aesthetics, comfort, and smart space planning.",
    icon: "Home",
    image: "/assets/services/interior-design.jpeg",
    features: [
      "Space Planning",
      "Furniture & Layouts",
      "Lighting Design",
      "Material Selection",
      "Color Psychology",
    ],
    keywords: [
      "home design",
      "living room interiors",
      "modular kitchen",
      "space planning",
      "decor ideas",
    ],
  },
  {
    id: "construction",
    title: "Construction",
    description:
      "From foundation to finish, we deliver robust construction services that ensure precision, durability, and timely execution.",
    icon: "Building",
    image: "/assets/services/construction.jpeg",
    features: [
      "Project Management",
      "Structural Execution",
      "Material Procurement",
      "Quality Assurance",
      "Site Supervision",
    ],
    keywords: ["turnkey projects", "building", "civil work", "contractor"],
  },
  {
    id: "renovation",
    title: "Renovation",
    description:
      "Revamp your existing spaces with modern designs, efficient layouts, and an improved living experience.",
    icon: "Wrench",
    image: "/assets/services/renovation.jpeg",
    features: [
      "Remodeling & Refurbishment",
      "Structural Alterations",
      "Interior Upgrades",
      "Energy Efficiency",
      "Budget Optimization",
    ],
    keywords: ["remodeling", "home renovation", "revamp", "modern interiors"],
  },
  {
    id: "consultation",
    title: "Consultation",
    description:
      "Professional design consultation to guide your project from concept to reality with the right decisions at every step.",
    icon: "MessageCircle",
    image: "/assets/services/consultation.jpeg",
    features: [
      "Concept Development",
      "Budget Planning",
      "Design Strategy",
      "Material Selection",
      "Timeline Optimization",
    ],
    keywords: ["interior advice", "design consultancy", "project planning"],
  },
  {
    id: "3d-visualization",
    title: "3D Visualization",
    description:
      "Experience your dream design before execution with realistic 3D renders and walkthroughs powered by advanced visualization.",
    icon: "Eye",
    image: "/assets/services/3d-visualization.jpeg",
    features: [
      "3D Modeling",
      "Photorealistic Rendering",
      "Virtual Tours",
      "Material Preview",
      "Lighting Simulation",
    ],
    keywords: ["render", "3D design", "architectural visualization", "walkthrough"],
  },
];
