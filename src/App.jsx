"use client"

import { useState, useEffect } from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import emailjs from '@emailjs/browser'
import ProjectsSection from "./componants/ProjectsSection"

export default function Home() {
  const [showMyStory, setShowMyStory] = useState(false)
  const [showHireMe, setShowHireMe] = useState(false)
  const [showMyThoughts, setShowMyThoughts] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  })

  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0])
  const headerY = useTransform(scrollY, [0, 200], [0, -100])
  const projectsOpacity = useTransform(scrollY, [100, 300], [0, 1])
  const projectsY = useTransform(scrollY, [100, 300], [100, 0])

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: "Please fill in all fields"
      })
      return
    }

    setFormStatus({ submitting: true, submitted: false, error: null })

    try {
      await emailjs.send(
        'service_6jk5ird', // Replace with your EmailJS service ID
        'template_rl33nga', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_name: 'Nassreddine', // Your name
        },
        '7XGTYZOwsIEunT0VQ' // Replace with your EmailJS public key
      )

      setFormStatus({
        submitting: false,
        submitted: true,
        error: null
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: ""
      })

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowHireMe(false)
        setFormStatus({
          submitting: false,
          submitted: false,
          error: null
        })
      }, 2000)

    } catch (error) {
      setFormStatus({
        submitting: false,
        submitted: false,
        error: "Failed to send message. Please try again."
      })
    }
  }

  return (
    <div className="bg-black text-white relative">
      {/* Navigation Buttons */}
      <div className="fixed top-0 left-0 right-0 p-4 sm:p-8 flex flex-col sm:flex-row justify-between z-20">
        <div className="flex gap-4 flex-col sm:flex-row">
          <button
            onClick={() => setShowMyStory(true)}
            className="glass-button px-6 sm:px-8 py-2 sm:py-3 rounded-full text-white text-base sm:text-lg font-medium tracking-wide transform hover:scale-105 transition-all duration-300 hover:silver-highlight whitespace-nowrap"
          >
            My Story
          </button>
          <Link
            to="/thoughts"
            className="glass-button px-6 sm:px-8 py-2 sm:py-3 rounded-full text-white text-base sm:text-lg font-medium tracking-wide transform hover:scale-105 transition-all duration-300 hover:silver-highlight whitespace-nowrap"
          >
            My Thoughts
          </Link>
        </div>
        <button
          onClick={() => setShowHireMe(true)}
          className="glass-button mt-4 sm:mt-0 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-white text-base sm:text-lg font-medium tracking-wide transform hover:scale-105 transition-all duration-300 hover:silver-highlight whitespace-nowrap"
        >
          Hire Me
        </button>
      </div>

      {/* Cursor Light Effect (Behind) */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
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

      {/* Glass Grid */}
      <div className="fixed inset-0 z-10">
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-2 p-4">
          {[...Array(144)].map((_, i) => (
            <div
              key={i}
              className="glass-grid-cell rounded-md backdrop-blur-[1px] transition-all duration-500"
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Header Section */}
        <motion.section 
          className="h-screen flex flex-col items-center justify-center px-4"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <div className="text-center transform hover:scale-105 transition-all duration-500">
            <h1 className="text-4xl sm:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white animate-gradient">
              Nassreddine Larbi Aissa
            </h1>
            <p className="text-xl sm:text-3xl text-gray-300 font-light tracking-wide mb-6 sm:mb-8">
              Web Developer & Designer
            </p>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed px-4 sm:px-0">
              Crafting beautiful digital experiences with modern web technologies
            </p>
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section 
          className="min-h-screen px-4 py-32 relative"
          style={{ opacity: projectsOpacity, y: projectsY }}
        >
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 sm:mb-24 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white">
            My Journey
          </h2>
          <div className="max-w-[800px] mx-auto relative">
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-[50%] top-0 bottom-0 w-[2px] timeline-line"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            
            {/* Timeline Events */}
            <div className="space-y-32">
            {[
  {
    "year": "2019",
    "title": "The Spark",
    "description": "Discovered my passion for technology and web development, realizing that coding was my way of creating and problem-solving.",
    "side": "left"
  },
  {
    "year": "2020-2022",
    "title": "Web Development & Multimedia Studies",
    "description": "Studied web development, UI/UX, and multimedia at the National Institute of Graphic Arts and Industries, mastering HTML, CSS, JavaScript, and MySQL.",
    "side": "right"
  },
  {
    "year": "2022-2023",
    "title": "Freelancing & Real-World Projects",
    "description": "Developed web applications for clients, focusing on front-end development, UI/UX, and 3D elements using Blender and Spline.",
    "side": "left"
  },
  {
    "year": "2023-2024",
    "title": "Tryed Mobile & Full-Stack",
    "description": "Created a task management app while deepening my expertise in React, Tailwind CSS, and backend technologies.",
    "side": "right"
  },
  {
    "year": "April 2025",
    "title": "Diploma & Future Goals",
    "description": "Completing my Technician Superior diploma after 30 months of hands-on learning, ready to tackle new challenges in tech and development.",
    "side": "left"
  }

            ].map((event, index) => (
                <motion.div 
                  key={index}
                  className="relative flex items-center"
                  initial={{ opacity: 0, x: event.side === "left" ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  {event.side === "left" ? (
                    <>
                      <div className="w-1/2 pr-4 sm:pr-12 text-right">
                        <motion.div
                          className="timeline-card inline-block p-4 sm:p-6"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          <div className="timeline-card-content">
                            <span className="timeline-year text-sm sm:text-base">{event.year}</span>
                            <h3 className="text-lg sm:text-xl font-bold mt-2">{event.title}</h3>
                            <p className="text-gray-400 mt-2 text-sm sm:text-base">{event.description}</p>
                          </div>
                        </motion.div>
                      </div>
                      <motion.div 
                        className="absolute left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 timeline-dot"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          duration: 0.5,
                          delay: index * 0.2 + 0.5,
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                      />
                    </>
                  ) : (
                    <>
                      <motion.div 
                        className="absolute left-1/2 w-4 h-4 rounded-full transform -translate-x-1/2 timeline-dot"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          duration: 0.5,
                          delay: index * 0.2 + 0.5,
                          type: "spring",
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                      />
                      <div className="w-1/2 ml-auto pl-4 sm:pl-12">
                        <motion.div
                          className="timeline-card p-4 sm:p-6"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                          viewport={{ once: true }}
                        >
                          <div className="timeline-card-content">
                            <span className="timeline-year text-sm sm:text-base">{event.year}</span>
                            <h3 className="text-lg sm:text-xl font-bold mt-2">{event.title}</h3>
                            <p className="text-gray-400 mt-2 text-sm sm:text-base">{event.description}</p>
                          </div>
                        </motion.div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Timeline End Marker */}
            <motion.div 
              className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full mt-8"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 1,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center timeline-dot">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600" />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Section - Replaced with new component */}
        <ProjectsSection />
      </main>

      {/* Popups with Backdrop */}
      {(showMyStory || showHireMe || showMyThoughts) && (
        <div 
          className="fixed inset-0 backdrop-blur-[2px] z-50 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowMyStory(false)
              setShowHireMe(false)
              setShowMyThoughts(false)
            }
          }}
        >
          <div className="w-full max-w-4xl mx-4">
            {showMyThoughts && (
              <div className="ultra-glass-panel rounded-2xl p-8 shadow-2xl max-h-[80vh] overflow-y-auto blog-scroll">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-white animate-gradient">My Thoughts</h2>
                  <button
                    onClick={() => setShowMyThoughts(false)}
                    className="glass-button px-6 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-8">
                  {[
                    {
                      date: "March 15, 2024",
                      title: "The Future of Web Development",
                      content: `As I delve deeper into the world of web development, I'm constantly amazed by the rapid evolution of technologies and methodologies. The landscape is shifting towards more immersive, interactive experiences, and I'm excited to be part of this transformation.

Today, I want to share my thoughts on where I see web development heading in the next few years. From AI-powered development tools to the rise of Web3 technologies, there's so much to explore and learn.

What fascinates me most is how we're moving towards more seamless, intuitive user experiences. The lines between web and native applications are blurring, and new frameworks and tools are emerging to support this convergence.`
                    },
                    {
                      date: "March 10, 2024",
                      title: "Learning and Growing",
                      content: `Today marks another milestone in my journey as a developer. I've been working on several challenging projects that have pushed me out of my comfort zone and taught me valuable lessons about problem-solving and persistence.

One thing I've learned is that the best way to grow is to embrace challenges head-on. Whether it's tackling a complex algorithm or learning a new framework, each challenge is an opportunity to become better at what we do.`
                    }
                  ].map((post, index) => (
                    <motion.article
                      key={index}
                      className="glass-panel p-6 rounded-xl blog-post"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      <span className="date-badge mb-4">{post.date}</span>
                      <h3 className="text-2xl font-bold mt-2 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">{post.title}</h3>
                      <div className="prose prose-invert max-w-none">
                        {post.content.split('\n\n').map((paragraph, i) => (
                          <motion.p 
                            key={i} 
                            className="text-gray-300 mb-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.5, 
                              delay: index * 0.1 + i * 0.1 
                            }}
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            )}
            
      {showMyStory && (
              <div className="ultra-glass-panel rounded-2xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold mb-6">My Story</h2>
                <div className="space-y-4 text-lg">
                  <p>
                  Technology has always been my way of expressing myself. While some create with paint or words, I build with code.

My journey started with pure curiosity—taking things apart, experimenting with web design, and learning how digital experiences come to life. That passion led me to study Web Development and Multimedia, where I mastered front-end technologies, UI/UX, and even 3D design.

Today, I create modern, user-friendly, and visually engaging digital experiences. Always learning, always building—I'm excited for what's next. Let's create something great together. 🚀
                  </p>
                  
                </div>
                <button
                  onClick={() => setShowMyStory(false)}
                  className="glass-button mt-6 px-6 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            )}
            
      {showHireMe && (
              <div className="ultra-glass-panel rounded-2xl p-8 shadow-2xl">
                <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:border-opacity-50 outline-none transition-all duration-300 focus:bg-white/20"
                      placeholder="Your name"
                      disabled={formStatus.submitting}
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:border-opacity-50 outline-none transition-all duration-300 focus:bg-white/20"
                      placeholder="your@email.com"
                      disabled={formStatus.submitting}
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 focus:border-opacity-50 outline-none transition-all duration-300 h-32 focus:bg-white/20"
                      placeholder="Tell me about your project..."
                      disabled={formStatus.submitting}
                    />
                  </div>
                  
                  {formStatus.error && (
                    <div className="text-red-400 text-sm font-medium">
                      {formStatus.error}
                    </div>
                  )}
                  
                  {formStatus.submitted && (
                    <div className="text-green-400 text-sm font-medium">
                      Message sent successfully! I'll get back to you soon.
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={formStatus.submitting}
                      className={`flex-1 glass-button px-6 py-3 rounded-lg text-white font-medium hover:silver-highlight transform hover:scale-105 transition-all duration-300 ${
                        formStatus.submitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {formStatus.submitting ? 'Sending...' : 'Send Message'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowHireMe(false)}
                      className="glass-button px-6 py-3 rounded-lg"
                      disabled={formStatus.submitting}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
      <SpeedInsights />
    </div>
  )
}