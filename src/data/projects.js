// Import images
import browseEvents from "../assets/Ticketster/browseEvents.jpeg";
import dashboardMobile from "../assets/ManagmentApp/dashboard_mobile.jpg";
import projectsMobile from "../assets/ManagmentApp/projects mobile.jpg";
import statisticMobile from "../assets/ManagmentApp/statistic_mobile.jpg";
import darelfarah from "../assets/weddingPlace/darelfarah.png";
import darelfarah2 from "../assets/weddingPlace/darelfarah2.png";
import darelfarah3 from "../assets/weddingPlace/darelfarah3.png";


// Project data with multiple images per project
const projects = [
  {
    id: 1,
    title: "Event Management Platform",
    description: "A modern event management platform with intuitive browsing and booking features. Built with React, Node.js.",
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
  },
  {
    id: 3,
    title: "wedding place showcase",
    description: "A wedding place showcase website built with React, Node.js.",
    category: "Featured",
    mainImage: darelfarah,
    images: [
      darelfarah,
      darelfarah2,
      darelfarah3,
    ],
    technologies: ["React", "Node.js", "Django", "PostgreSQL", "REST API"],
  },
];

export default projects; 