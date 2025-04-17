import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { blogPosts } from "../data/blogPosts"
import { useState, useEffect } from "react"

export default function Thoughts() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Cursor Light Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-10"
        style={{
          background: `
            radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(29, 78, 216, 0.15),
              transparent 40%
            ),
            radial-gradient(300px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255, 255, 255, 0.08),
              transparent 50%
            )
          `,
        }}
      />

      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-2 p-4">
          {[...Array(144)].map((_, i) => (
            <div
              key={i}
              className="glass-grid-cell rounded-md backdrop-blur-[1px] transition-all duration-500"
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 p-4 sm:p-8 flex justify-between z-30">
        <Link 
          to="/"
          className="glass-button px-4 sm:px-8 py-2 sm:py-3 rounded-full text-white text-base sm:text-lg font-medium tracking-wide transform hover:scale-105 transition-all duration-300 hover:silver-highlight"
        >
          Back Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto pt-24 sm:pt-32 px-4 pb-16">
        <motion.h1 
          className="text-3xl sm:text-5xl font-bold text-center mb-8 sm:mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white animate-gradient"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Thoughts
        </motion.h1>

        <div className="space-y-8 sm:space-y-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="ultra-glass-panel p-4 sm:p-8 rounded-xl blog-post"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
            >
              <div className="flex flex-col relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <span className="date-badge self-start mb-2 sm:mb-0 text-sm sm:text-base">{post.date}</span>
                  {post.category && (
                    <span className="px-2 sm:px-3 py-1 bg-blue-500/20 rounded-full text-xs sm:text-sm font-medium text-blue-300">
                      {post.category}
                    </span>
                  )}
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  {post.title}
                </h2>

                <div className="prose prose-invert max-w-none">
                  {post.content.split('\n\n').map((paragraph, i) => (
                    <motion.p 
                      key={i} 
                      className="text-white/90 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed tracking-wide font-light"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: index * 0.2 + i * 0.1
                      }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-2 sm:px-3 py-1 bg-white/5 rounded-full text-xs sm:text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
} 