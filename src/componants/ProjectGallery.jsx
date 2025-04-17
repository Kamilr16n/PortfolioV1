import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ProjectGallery component that displays a slideshow of project images
const ProjectGallery = ({ images, onClose, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [showControls, setShowControls] = useState(true);
  const galleryRef = useRef(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Handle outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (galleryRef.current && !galleryRef.current.contains(e.target)) {
        onClose();
      }
    };

    // Add click event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Auto-hide controls after 2 seconds
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 2000);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(timer);
    };
  }, []);

  // Handle touch events for mobile swipe
  const handleTouchStart = useRef({ x: 0 });
  const handleTouchEnd = (e, startX) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    
    // If swipe distance is significant enough
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped left, go to next slide
        nextSlide();
      } else {
        // Swiped right, go to previous slide
        prevSlide();
      }
    }
  };

  // Navigate to next slide
  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    showControlsTemporarily();
  };

  // Navigate to previous slide
  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    showControlsTemporarily();
  };

  // Show controls temporarily
  const showControlsTemporarily = () => {
    setShowControls(true);
    // Hide controls after 2 seconds
    setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  // Variants for slide animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseMove={showControlsTemporarily}
      onTouchStart={() => setShowControls(true)}
    >
      {/* Main content container with click detection */}
      <div 
        ref={galleryRef} 
        className="relative w-full h-full max-w-5xl max-h-[90vh] sm:max-h-[80vh] mx-auto overflow-hidden px-2 sm:px-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - always visible */}
        <motion.button 
          onClick={onClose}
          className="absolute top-2 sm:top-4 right-2 sm:right-4 z-50 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full glass-button"
          aria-label="Close gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        {/* Project title */}
        <motion.div 
          className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 z-50 w-full sm:w-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center px-10">
            {title}
          </h3>
          <div className="flex justify-center mt-1 sm:mt-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  showControlsTemporarily();
                }}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 mx-1 rounded-full ${
                  index === currentIndex 
                    ? "bg-white" 
                    : "bg-white/30"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Main image container */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-8"
            onTouchStart={(e) => {
              handleTouchStart.current = { x: e.touches[0].clientX };
              showControlsTemporarily();
            }}
            onTouchEnd={(e) => handleTouchEnd(e, handleTouchStart.current.x)}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden ultra-glass-panel">
              <img
                src={images[currentIndex]}
                alt={`Project slide ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons - hidden on small screens, use swipe instead */}
        <motion.button
          className="absolute left-1 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 glass-button w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hidden sm:flex"
          onClick={prevSlide}
          aria-label="Previous image"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: showControls ? 1 : 0, x: showControls ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        
        <motion.button
          className="absolute right-1 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 glass-button w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hidden sm:flex"
          onClick={nextSlide}
          aria-label="Next image"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: showControls ? 1 : 0, x: showControls ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Image counter */}
      <motion.div 
        className="absolute bottom-2 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 10 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-white/70 text-xs sm:text-sm">
          {currentIndex + 1} / {images.length}
        </p>
      </motion.div>

      {/* Mobile swipe instructions - only visible on touch devices */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-40 sm:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 0.7 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-white/70 text-xs text-center">
          Swipe left/right to navigate
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ProjectGallery; 