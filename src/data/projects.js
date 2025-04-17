// Import images
import browseEvents from "../assets/Ticketster/browseEvents.jpeg";
import dashboardMobile from "../assets/ManagmentApp/dashboard_mobile.jpg";
import projectsMobile from "../assets/ManagmentApp/projects mobile.jpg";
import statisticMobile from "../assets/ManagmentApp/statistic_mobile.jpg";

// Project data with multiple images per project
const projects = [
  {
    id: 1,
    title: "Event Management Platform",
    description: "A modern event management platform with intuitive browsing and booking features. Built with React, Node.js, and MongoDB.",
    category: "Featured",
    mainImage: browseEvents,
    images: [
      browseEvents
    ],
    technologies: ["React", "Node.js", "Django", "PostgreSQL", "REST API", "Resend", "Spline.com"],
  },
  {
    id: 2,
    title: "Project Management Mobile App",
    description: "Comprehensive project tracking and team collaboration platform with intuitive mobile interface. Features include task management, progress tracking, and team collaboration.",
    category: "Mobile",
    mainImage: projectsMobile,
    images: [
      projectsMobile,
      statisticMobile,
      dashboardMobile,
    ],
    technologies: ["React Native", "TailwindCSS", "Firebase", "Expo"],
  }
];

export default projects; 