// Import images
import browseEvents from "../assets/browseEvents.jpeg";
import dashboardMobile from "../assets/dashboard_mobile.jpg";
import projectsMobile from "../assets/projects mobile.jpg";
import statisticMobile from "../assets/statistic_mobile.jpg";

// Project data with multiple images per project
const projects = [
  {
    id: 1,
    title: "Event Management Platform",
    description: "A modern event management platform with intuitive browsing and booking features. Built with React, Node.js, and MongoDB.",
    category: "Featured",
    mainImage: browseEvents,
    images: [
      browseEvents,
      dashboardMobile,
      projectsMobile,
    ],
    technologies: ["React", "Node.js", "MongoDB", "Express"],
  },
  {
    id: 2,
    title: "Project Management Dashboard",
    description: "Comprehensive project tracking and team collaboration platform with intuitive mobile interface. Features include task management, progress tracking, and team collaboration.",
    category: "Mobile",
    mainImage: projectsMobile,
    images: [
      projectsMobile,
      statisticMobile,
      dashboardMobile,
    ],
    technologies: ["React", "TailwindCSS", "Firebase", "Chart.js"],
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with interactive data visualization and reporting tools. Helps businesses track KPIs and make data-driven decisions.",
    category: "Analytics",
    mainImage: dashboardMobile,
    images: [
      dashboardMobile,
      statisticMobile,
      projectsMobile,
    ],
    technologies: ["Vue.js", "D3.js", "Firebase", "TailwindCSS"],
  },
  {
    id: 4,
    title: "Statistics & Performance Metrics",
    description: "Advanced statistics and performance monitoring system with detailed insights and metrics. Perfect for tracking user engagement and system performance.",
    category: "Analytics",
    mainImage: statisticMobile,
    images: [
      statisticMobile,
      dashboardMobile,
      browseEvents,
    ],
    technologies: ["React", "Redux", "Node.js", "MongoDB", "Express"],
  }
];

export default projects; 