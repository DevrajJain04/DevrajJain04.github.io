// Project stars data - each project is a star in the constellation
export const projects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, shopping cart, payment integration, and admin dashboard.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    liveUrl: "https://your-ecommerce-demo.com",
    position: [2, 1, -3],
    color: "#ff6b6b", // Red star
    size: 0.8,
    constellation: "frontend"
  },
  {
    id: 2,
    name: "AI Chat Application",
    description: "Real-time chat application with AI integration using OpenAI API. Features include message history, typing indicators, and smart responses.",
    technologies: ["React", "Socket.io", "OpenAI API", "Express", "PostgreSQL"],
    githubUrl: "https://github.com/yourusername/ai-chat-app",
    liveUrl: "https://your-chat-demo.com",
    position: [-2, 2, -4],
    color: "#4ecdc4", // Teal star
    size: 0.7,
    constellation: "ai"
  },
  {
    id: 3,
    name: "Task Management System",
    description: "Collaborative project management tool with drag-and-drop functionality, real-time updates, and team collaboration features.",
    technologies: ["Vue.js", "Firebase", "Vuex", "CSS3"],
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "https://your-task-demo.com",
    position: [0, -1, -2],
    color: "#45b7d1", // Blue star
    size: 0.6,
    constellation: "fullstack"
  },
  {
    id: 4,
    name: "Portfolio Website",
    description: "Interactive 3D portfolio website using Three.js and React. Features animated transitions, responsive design, and constellation theme.",
    technologies: ["React", "Three.js", "Framer Motion", "CSS3"],
    githubUrl: "https://github.com/yourusername/portfolio",
    liveUrl: "https://your-portfolio.com",
    position: [-3, 0, -1],
    color: "#f7dc6f", // Golden star
    size: 0.9,
    constellation: "creative"
  },
  {
    id: 5,
    name: "Weather Forecast App",
    description: "Beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
    technologies: ["React Native", "API Integration", "Charts.js", "Geolocation"],
    githubUrl: "https://github.com/yourusername/weather-app",
    liveUrl: "https://your-weather-demo.com",
    position: [1, -2, -5],
    color: "#bb8fce", // Purple star
    size: 0.5,
    constellation: "mobile"
  },
  {
    id: 6,
    name: "Data Visualization Dashboard",
    description: "Interactive dashboard for data analysis with real-time charts, filters, and export functionality.",
    technologies: ["D3.js", "React", "Python", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/yourusername/data-dashboard",
    liveUrl: "https://your-dashboard-demo.com",
    position: [3, 2, -2],
    color: "#82e5aa", // Green star
    size: 0.7,
    constellation: "data"
  }
];

// Skills as constellations that connect the project stars
export const skills = {
  frontend: {
    name: "Frontend Development",
    description: "Modern frontend technologies and frameworks",
    technologies: ["React", "Vue.js", "TypeScript", "CSS3", "HTML5"],
    connections: [1, 3, 4], // Connected project IDs
    color: "#ff6b6b"
  },
  backend: {
    name: "Backend Development", 
    description: "Server-side technologies and APIs",
    technologies: ["Flask", "Python", "Django", "FastAPI", "PostgreSQL"],
    connections: [1, 2, 6],
    color: "#4ecdc4"
  },
  fullstack: {
    name: "Full Stack Development",
    description: "End-to-end application development",
    technologies: ["REST APIs", "Database Design", "Authentication"],
    connections: [1, 2, 3],
    color: "#45b7d1"
  },
  mobile: {
    name: "Mobile Development",
    description: "Cross-platform mobile applications",
    technologies: ["Flutter", "Android"],
    connections: [5],
    color: "#bb8fce"
  },
  ai: {
    name: "AI & Machine Learning",
    description: "Artificial intelligence and data science",
    technologies: ["OpenAI API", "TensorFlow", "Python", "Data Analysis"],
    connections: [2, 6],
    color: "#4ecdc4"
  },
  creative: {
    name: "Creative Development",
    description: "Interactive and visual experiences",
    technologies: ["Three.js", "WebGL", "Animation", "UI/UX Design"],
    connections: [4],
    color: "#f7dc6f"
  },
  data: {
    name: "Data Visualization",
    description: "Data analysis and visualization",
    technologies: ["D3.js", "Charts.js", "Analytics", "Data Processing"],
    connections: [6],
    color: "#82e5aa"
  }
};

// About me data - The North Star
export const aboutMe = {
  name: "Devraj Jain",
  title: "Software Developer",
  description: "Passionate about building incredible software solutions. Love to tinker with new technologies , ",
  location: "Mumbai, India",
  email: "your.email@example.com",
  linkedin: "https://linkedin.com/in/devrajpjain",
  github: "https://github.com/DevrajJain04",
  position: [0, 3, 0], // North Star position
  color: "#ffffff", // Brightest star
  size: 1.2
};
