import { motion } from "framer-motion";

// ProjectCard component for displaying individual projects in the gallery
const ProjectCard = ({ project, onClick, index }) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl glass-panel aspect-square cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="w-full h-full relative">
        <img 
          src={project.mainImage} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-xs sm:text-sm font-medium text-blue-300 mb-2 sm:mb-3 inline-block px-2 sm:px-3 py-1 bg-blue-500/10 rounded-full">
              {project.category}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
            
            {/* Technology tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, i) => (
                <span 
                  key={i} 
                  className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
            
            {/* View gallery button indicator */}
            <div className="mt-4 flex items-center text-blue-300 text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              View Gallery
            </div>
          </div>
        </div>
      </div>

      {/* Hover accent effect */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500"></div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 