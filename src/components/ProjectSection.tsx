import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { Project, projects } from "../data/projects";

const ProjectsSection: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelected(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelected(null);
    setModalOpen(false);
  };

  return (
    <section className="py-12 px-6 md:px-12">
      <h2 className="mb-8 text-3xl font-bold text-white">Our Projects</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => openModal(project)}
          />
        ))}
      </div>

      <ProjectModal isOpen={modalOpen} onClose={closeModal} project={selected} />
    </section>
  );
};

export default ProjectsSection;