import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectGallery from "./ProjectGallery";
import projects from "../data/projects";

// Main Projects section component
const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle opening a project gallery
  const openGallery = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden"; // Prevent scrolling when gallery is open
  };

  // Handle closing a project gallery
  const closeGallery = () => {
    setSelectedProject(null);
    document.body.style.overflow = ""; // Re-enable scrolling
  };

  return (
    <motion.section
      id="projects"
      className="min-h-screen px-4 py-32"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <h2 className="text-3xl sm:text-5xl font-bold text-center mb-8 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
        My Projects
      </h2>
      
      {/* Gallery description */}
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12">
        A showcase of my recent work. Click on a project to view the gallery and learn more about the design and development process.
      </p>

      {/* Projects grid */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onClick={() => openGallery(project)}
          />
        ))}
      </div>

      {/* Gallery modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectGallery
            images={selectedProject.images}
            title={selectedProject.title}
            onClose={closeGallery}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ProjectsSection; 