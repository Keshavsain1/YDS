// src/components/ProjectCard.tsx
import React from "react";
import { MapPin, Calendar, Square } from "lucide-react";
import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  view?: "grid" | "list";
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, view = "grid" }) => {
  // Use sensible tailwind defaults for category colors (fallback safe classes)
  const catColors: Record<string, string> = {
    "Interior Design": "bg-amber-100 text-amber-800",
    Construction: "bg-amber-500 text-white",
    Renovation: "bg-teal-500 text-white",
    Consultation: "bg-indigo-500 text-white",
    "3D Visualization": "bg-pink-500 text-white",
  };

  const catClass = catColors[project.category] || "bg-amber-100 text-amber-800";
  const aspectClass = view === "list" ? "aspect-[16/9]" : "aspect-[4/3]";

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    img.onerror = null as any;
    img.src = "/assets/placeholder.jpg"; // fallback placeholder
  };

  // image src fallback resolution
  const imgSrc = project.image || (project.images && project.images.length > 0 ? project.images[0] : "/assets/placeholder.jpg");
  const imgAlt = project.title ? `${project.title} — project image` : "Project image";

  return (
    <article
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Open project ${project.title} details`}
    >
      <div className="relative">
        {/* Responsive Image Ratio */}
        <div className={`w-full ${aspectClass} bg-gray-100 flex items-center justify-center overflow-hidden relative`}>
          <img
            src={imgSrc}
            alt={imgAlt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={handleImgError}
          />

          {/* subtle overlay shown on hover/focus */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/35 to-black/0 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4"
            aria-hidden={!project.title}
          >
            <button
              type="button"
              onClick={(e) => {
                // ensure clicking CTA performs same action but doesn't double-run bubbling click
                e.stopPropagation();
                onClick();
              }}
              className="bg-white/95 text-gray-900 px-4 py-2 rounded-full font-medium shadow hover:translate-y-[-1px] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
              aria-label={`View project ${project.title}`}
            >
              View Project
            </button>
          </div>
        </div>

        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold shadow ${catClass} inline-flex items-center`}>
            {project.category}
          </span>
        </div>

        {/* Featured Tag */}
        {project.featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold shadow">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[#0A2647] group-hover:text-indigo-700 transition-colors duration-200 mb-1">
          {project.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">{project.description}</p>

        <div className="space-y-2 text-sm text-gray-500">
          {project.location && (
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-indigo-500" aria-hidden="true" />
              <span>{project.location}</span>
            </div>
          )}
          {project.area && (
            <div className="flex items-center space-x-2">
              <Square size={16} className="text-indigo-500" aria-hidden="true" />
              <span>{project.area}</span>
            </div>
          )}
          {project.completionDate && (
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-indigo-500" aria-hidden="true" />
              <span>{project.completionDate}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
