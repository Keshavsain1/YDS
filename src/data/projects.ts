export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  image: string;
  images: string[];
  description: string;
  longDescription?: string;
  workScope?: string[];
  clientContact?: string;
  completionDate?: string;
  area?: string;
  featured: boolean;
  focalPoint?: { x: number; y: number };
  subtitle?: string;
  link?: string;
  tech?: string[];
}

export const projects: Project[] = [
  {
    id: "pcp-sikar",
    slug: "pcp-sikar",
    title: "PCP Sikar",
    category: "Interior Design",
    location: "Sikar",
    image: "/assets/optimized/Projects/PCP Sikar/1/1-1024.jpg",
    images: [
      "/assets/optimized/Projects/PCP Sikar/1/1-1024.jpg",
      "/assets/optimized/Projects/PCP Sikar/2/2-1024.jpg",
      "/assets/optimized/Projects/PCP Sikar/3/3-1024.jpg",
      "/assets/optimized/Projects/PCP Sikar/4/4-1024.jpg",
      "/assets/optimized/Projects/PCP Sikar/5/5-1024.jpg"
    ],
    description:
      "Complete interior transformation of a luxury villa with modern contemporary design elements.",
    longDescription:
      "This luxury villa project redefined elegance with open spaces, natural light, and custom furniture. Our focus was on blending sophistication with comfort for a timeless living experience.",
    workScope: [
      "Full Interior Design",
      "Furniture Selection",
      "Lighting Design",
      "Color Consultation"
    ],
    clientContact: "Available upon request",
    completionDate: "December 2023",
    area: "4,500 sq ft",
    featured: true,
    focalPoint: { x: 0.5, y: 0.45 }
  },
  {
    id: "bright-school",
    slug: "bright-school",
    title: "Bright School",
    category: "Construction",
    location: "Govindgarh",
    image: "/assets/optimized/Projects/BRIGHT SCHOOL/1/1-1024.jpg",
    images: [
      "/assets/optimized/Projects/BRIGHT SCHOOL/1/1-1024.jpg",
      "/assets/optimized/Projects/BRIGHT SCHOOL/2/2-1024.jpg",
      "/assets/optimized/Projects/BRIGHT SCHOOL/3/3-1024.jpg",
      "/assets/optimized/Projects/BRIGHT SCHOOL/4/4-1024.jpg",
      "/assets/optimized/Projects/BRIGHT SCHOOL/5/5-1024.jpg"
    ],
    description:
      "Modern school construction with functional classrooms and play areas.",
    longDescription:
      "A contemporary educational facility designed for safety, flexibility, and natural light. Includes learning zones, labs and recreational areas tailored to children.",
    workScope: [
      "Space Planning",
      "Construction Management",
      "Interior Design",
      "MEP Coordination"
    ],
    clientContact: "Available upon request",
    completionDate: "October 2023",
    area: "2,800 sq ft",
    featured: true,
    focalPoint: { x: 0.5, y: 0.5 }
  },
  {
    id: "jk-lon",
    slug: "jk-lon",
    title: "JK LON Hospital",
    category: "Renovation",
    location: "Jaipur",
    image: "/assets/optimized/Projects/JK LON/1/1-1024.jpg",
    images: [
      "/assets/optimized/Projects/JK LON/1/1-1024.jpg",
      "/assets/optimized/Projects/JK LON/2/2-1024.jpg",
      "/assets/optimized/Projects/JK LON/3/3-1024.jpg",
      "/assets/optimized/Projects/JK LON/4/4-1024.jpg",
      "/assets/optimized/Projects/JK LON/5/5-1024.jpg",
      "/assets/optimized/Projects/JK LON/6/6-1024.jpg",
      "/assets/optimized/Projects/JK LON/7/7-1024.jpg",
      "/assets/optimized/Projects/JK LON/8/8-1024.jpg",
      "/assets/optimized/Projects/JK LON/9/9-1024.jpg"
    ],
    description:
      "Complete apartment renovation with smart storage solutions and contemporary aesthetics.",
    longDescription:
      "This apartment project maximized functionality in a compact space. Clever storage, minimalistic furniture, and neutral palettes were combined to create a modern urban home.",
    workScope: [
      "Renovation Planning",
      "Interior Design",
      "Kitchen Design",
      "Bathroom Renovation"
    ],
    clientContact: "Available upon request",
    completionDate: "August 2023",
    area: "1,200 sq ft",
    featured: true,
    focalPoint: { x: 0.5, y: 0.45 }
  },
  {
    id: "home-dharmendra",
    slug: "home-dharmendra",
    title: "Villa",
    category: "3D Visualization",
    location: "Jagatpura",
    image: "/assets/optimized/Projects/Home-Dharmendra/1/1-1024.jpg",
    images: [
      "/assets/optimized/Projects/Home-Dharmendra/1/1-1024.jpg",
      "/assets/optimized/Projects/Home-Dharmendra/2/2-1024.jpg",
      "/assets/optimized/Projects/Home-Dharmendra/3/3-1024.jpg",
      "/assets/optimized/Projects/Home-Dharmendra/4/4-1024.jpg",
      "/assets/optimized/Projects/Home-Dharmendra/5/5-1024.jpg"
    ],
    description:
      "3D visualization and design consultation for an upscale restaurant concept.",
    longDescription:
      "This restaurant project emphasized ambiance through lighting, material selection, and seating arrangements. The 3D visuals helped the client envision the fine dining experience before execution.",
    workScope: [
      "3D Modeling",
      "Concept Development",
      "Material Selection",
      "Design Consultation"
    ],
    clientContact: "Available upon request",
    completionDate: "November 2023",
    area: "3,000 sq ft",
    featured: false
  },
  {
    id: "home-pradeep",
    slug: "home-pradeep",
    title: "Villa",
    category: "Consultation",
    location: "Jagatpura",
    image: "/assets/optimized/Projects/Home-Pradeep/1/1-1024.jpg",
    images: [
      "/assets/optimized/Projects/Home-Pradeep/1/1-1024.jpg",
      "/assets/optimized/Projects/Home-Pradeep/2/2-1024.jpg",
      "/assets/optimized/Projects/Home-Pradeep/3/3-1024.jpg",
      "/assets/optimized/Projects/Home-Pradeep/4/4-1024.jpg"
    ],
    description:
      "Design consultation for boutique hotel with traditional Rajasthani elements.",
    longDescription:
      "The boutique hotel project focused on cultural integration, combining local Rajasthani motifs with modern amenities to offer guests an authentic yet luxurious stay.",
    workScope: [
      "Design Consultation",
      "Cultural Integration",
      "Space Planning",
      "Material Guidance"
    ],
    clientContact: "Available upon request",
    completionDate: "September 2023",
    area: "8,000 sq ft",
    featured: false
  },
  {
    id: "foyer",
    slug: "foyer",
    title: "Foyer",
    category: "Interior Design",
    location: "Tonk Phatak",
    image: "/assets/optimized/Projects/Foyer/1/1-1024.jpg",
    images: [
      "/assets/optimized/Projects/Foyer/1/1-1024.jpg",
      "/assets/optimized/Projects/Foyer/2/2-1024.jpg",
      "/assets/optimized/Projects/Foyer/3/3-1024.jpg",
      "/assets/optimized/Projects/Foyer/4/4-1024.jpg",
      "/assets/optimized/Projects/Foyer/5/5-1024.jpg"
    ],
    description:
      "Contemporary farmhouse design blending modern amenities with rustic charm.",
    longDescription:
      "This farmhouse project brought modern living to a rustic setting. Natural wood, large windows, and outdoor integration made this design both cozy and contemporary.",
    workScope: [
      "Interior Design",
      "Furniture Design",
      "Landscape Integration",
      "Lighting Design"
    ],
    clientContact: "Available upon request",
    completionDate: "July 2023",
    area: "3,200 sq ft",
    featured: false
  }
];

export default projects;
