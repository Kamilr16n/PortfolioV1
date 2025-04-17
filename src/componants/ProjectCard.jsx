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
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 translate-y-0 sm:translate-y-6 sm:group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-xs sm:text-sm font-medium text-blue-300 mb-1 sm:mb-2 inline-block px-2 py-0.5 sm:px-2 sm:py-1 bg-blue-500/10 rounded-full">
              {project.category}
            </span>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">
              {project.title}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
              {project.description}
            </p>
            
            {/* Technology tags */}
            <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
              {project.technologies.slice(0, 2).map((tech, i) => (
                <span 
                  key={i} 
                  className="text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/10 rounded-full text-white/80"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 2 && (
                <span className="text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/10 rounded-full text-white/80">
                  +{project.technologies.length - 2}
                </span>
              )}
            </div>
            
            {/* View gallery button indicator */}
            <div className="mt-3 sm:mt-4 flex items-center text-blue-300 text-xs sm:text-sm font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      
      {/* Mobile-only project title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:hidden bg-gradient-to-t from-black/80 to-transparent">
        <h3 className="text-base font-bold text-white truncate">
          {project.title}
        </h3>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 