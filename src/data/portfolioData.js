// ─── Constellation Nodes (top-level stars) ───

export const constellationNodes = [
  {
    id: 'about',
    label: 'About Me',
    description: 'Education, background & co-curriculars',
    position: [0, 4, 0],
    color: '#ffffff',
    emissive: '#ffffff',
    size: 1.0,
    glowSize: 1.8,
    isNorthStar: true,
    expandable: false,
  },
  {
    id: 'experience',
    label: 'Experience',
    description: '3 internships — click to explore each',
    position: [-4.5, 1.2, -2],
    color: '#ff6b6b',
    emissive: '#ff4444',
    size: 0.75,
    glowSize: 1.4,
    expandable: true,
  },
  {
    id: 'projects',
    label: 'Projects',
    description: '4 projects — click to explore each',
    position: [4.5, 1, -1.5],
    color: '#4ecdc4',
    emissive: '#2dbdb4',
    size: 0.8,
    glowSize: 1.5,
    expandable: true,
  },
  {
    id: 'skills',
    label: 'Skills',
    description: 'Python, Flutter, React, AWS, Docker & more',
    position: [-3, -2.5, -1],
    color: '#f7dc6f',
    emissive: '#f0c928',
    size: 0.65,
    glowSize: 1.3,
    expandable: false,
  },
  {
    id: 'contact',
    label: 'Contact',
    description: 'Get in touch — email, GitHub, LinkedIn',
    position: [3.2, -2.8, -0.5],
    color: '#64ffda',
    emissive: '#40e0c0',
    size: 0.6,
    glowSize: 1.2,
    expandable: false,
  },
];

// Lines connecting main stars
export const constellationLines = [
  ['about', 'experience'],
  ['about', 'projects'],
  ['about', 'skills'],
  ['about', 'contact'],
  ['experience', 'skills'],
  ['projects', 'contact'],
];

// ─── Sub-constellation children ───
// Positions are OFFSETS from the parent star

export const childNodes = {
  projects: [
    {
      id: 'proj-cricket',
      label: 'Cricket Auction',
      color: '#ff6b6b',
      emissive: '#ff4444',
      size: 0.38,
      glowSize: 0.8,
      offset: [-1.8, 1.2, 0.5],
    },
    {
      id: 'proj-safar',
      label: 'Safar',
      color: '#4ecdc4',
      emissive: '#2dbdb4',
      size: 0.38,
      glowSize: 0.8,
      offset: [1.8, 1.0, -0.3],
    },
    {
      id: 'proj-likhai',
      label: 'LikhAI',
      color: '#f7dc6f',
      emissive: '#f0c928',
      size: 0.32,
      glowSize: 0.7,
      offset: [0.2, -1.6, 0.4],
    },
    {
      id: 'proj-progress',
      label: 'DevrajProgress',
      color: '#bb86fc',
      emissive: '#9c5dfc',
      size: 0.34,
      glowSize: 0.75,
      offset: [-1.0, -0.8, -0.6],
    },
  ],
  experience: [
    {
      id: 'exp-meera',
      label: 'Meera AI',
      color: '#64ffda',
      emissive: '#40e0c0',
      size: 0.35,
      glowSize: 0.75,
      offset: [-1.6, 1.0, 0.5],
    },
    {
      id: 'exp-amaxa',
      label: 'AmaxaTech',
      color: '#bb86fc',
      emissive: '#9c5dfc',
      size: 0.35,
      glowSize: 0.75,
      offset: [1.4, 0.8, -0.3],
    },
    {
      id: 'exp-motilal',
      label: 'Motilal Oswal',
      color: '#ffb74d',
      emissive: '#f5a623',
      size: 0.35,
      glowSize: 0.75,
      offset: [0, -1.5, 0.3],
    },
  ],
};

// Lines connecting children to parent and to each other
export const childLines = {
  projects: [
    ['_parent', 'proj-cricket'],
    ['_parent', 'proj-safar'],
    ['_parent', 'proj-likhai'],
    ['_parent', 'proj-progress'],
    ['proj-cricket', 'proj-safar'],
    ['proj-safar', 'proj-likhai'],
    ['proj-likhai', 'proj-progress'],
    ['proj-progress', 'proj-cricket'],
  ],
  experience: [
    ['_parent', 'exp-meera'],
    ['_parent', 'exp-amaxa'],
    ['_parent', 'exp-motilal'],
    ['exp-meera', 'exp-amaxa'],
    ['exp-amaxa', 'exp-motilal'],
  ],
};

// ─── Section content ───

export const aboutMe = {
  name: "Devraj Jain",
  title: "Full Stack & Flutter Developer",
  tagline: "Building polished, production-ready software — from mobile apps on the Play Store to AI-powered web platforms.",
  bio: "I'm a Computer Engineering student at DJSCE, Mumbai, with hands-on industry experience shipping real products. I've built cross-platform mobile apps with Flutter, architected cloud-native backends on AWS, and created AI-driven tools with FastAPI and Gemini. I thrive at the intersection of elegant front-ends and robust back-ends.",
  education: {
    institution: "Dwarkadas J. Sanghvi College of Engineering",
    degree: "B. Tech in Computer Engineering",
    cgpa: "8.65 / 10",
    duration: "2022 – 2026",
    location: "Mumbai, Maharashtra"
  },
  location: "Mumbai, India",
  email: "devrajjain4@gmail.com",
  linkedin: "https://linkedin.com/in/devraj-p-jain",
  github: "https://github.com/DevrajJain04",
};

export const experiences = {
  'exp-meera': {
    role: "Flutter Development Intern",
    company: "Meera AI Tech Solutions LLP",
    duration: "Sep 2025 – Oct 2025",
    location: "Bandra, Mumbai",
    color: "#64ffda",
    bullets: [
      "Developed the MrMuscle mobile app for iOS & Android (live on Play Store & App Store) with Bluetooth weighing-machine integration.",
      "Integrated RazorPay payment gateway for seamless in-app purchases."
    ]
  },
  'exp-amaxa': {
    role: "Full Stack Development Intern",
    company: "AmaxaTech Solutions LLP",
    duration: "Feb 2025 – May 2025",
    location: "Remote",
    color: "#bb86fc",
    bullets: [
      "Built cloud infrastructure with AWS S3 & SQS, connecting an AI interviewer to a Django backend.",
      "Implemented CI/CD pipelines using GitHub Actions & Terraform; managed multiple deployment branches.",
      "Added Multilingual Support, face-detection proctoring, and multiple interview types.",
      "Created a recruiter Dashboard in React + Vite + TailwindCSS for managing interviews."
    ]
  },
  'exp-motilal': {
    role: "Business Process Excellence Intern",
    company: "Motilal Oswal Financial Services",
    duration: "Jul 2024 – Sep 2024",
    location: "Malad, Mumbai",
    color: "#ffb74d",
    bullets: [
      "Built automation solutions with Selenium, Python & Pandas for data analysis workflows.",
      "Conducted Time & Motion studies, achieving up to 80% efficiency gains for the team."
    ]
  }
};

export const projects = {
  'proj-cricket': {
    name: "Cricket Auction App",
    description: "A comprehensive, private Cricket Auction Application designed to automate and streamline the entire player acquisition process in a simulated, real-time auction environment for team managers. Features a dynamic player database, live bidding engine, and automated roster tracking.",
    technologies: ["Python", "FastAPI", "WebSockets", "SQLAlchemy", "DB Browser", "CricData API", "Gemini"],
    githubUrl: "https://github.com/DevrajJain04/cricket_auction_application",
    liveUrl: null,
    color: "#ff6b6b",
  },
  'proj-safar': {
    name: "Safar — AI Travel Planner",
    description: "A full-stack, AI-powered travel planner featuring a React.js web client, a Flutter mobile app, a Node.js backend, and a dedicated Python FastAPI service. Uses Google Gemini for personalised itineraries from natural language and supports real-time collaborative planning.",
    technologies: ["Python", "FastAPI", "React", "Flutter", "MongoDB", "Gemini", "SerpAPI", "Open-Meteo"],
    githubUrl: "https://github.com/Keegan001/Codeshastra_xi_BeyondBestCase/",
    liveUrl: "https://safar-swart.vercel.app/",
    color: "#4ecdc4",
  },
  'proj-likhai': {
    name: "LikhAI — Script Analysis",
    description: "An AI-driven script analysis platform built with FastAPI and Gemini Pro, delivering scene insights on character emotions, visuals, sound cues, and narrative direction. Includes caching to reduce repeated AI requests and boost response times.",
    technologies: ["Python", "FastAPI", "Gemini Pro", "Pydantic", "Uvicorn"],
    githubUrl: "https://github.com/DevrajJain04/LikhAI/",
    liveUrl: null,
    color: "#f7dc6f",
  },
  'proj-progress': {
    name: "DevrajProgress",
    description: "A personal growth and practice tracking tool built to monitor daily progress, habit streaks, and learning milestones. Live and actively used as a self-improvement dashboard.",
    technologies: ["React", "Vercel", "JavaScript"],
    githubUrl: "https://github.com/DevrajJain04",
    liveUrl: "https://devrajsprogress.vercel.app",
    color: "#bb86fc",
  },
};

export const skills = {
  "Languages & Databases": [
    "Python", "C++", "Dart", "C", "JavaScript", "HTML", "CSS", "SQL", "SQLite", "Firebase"
  ],
  "Frameworks & Libraries": [
    "Flutter", "Django", "FastAPI", "React", "SQLAlchemy", "Pipecat-ai"
  ],
  "Developer Tools": [
    "Git", "GitHub", "GitHub Actions", "AWS", "Docker", "Docker-Compose", "Terraform", "Postman", "LocalStack", "DB Browser"
  ]
};

export const activities = {
  org: "DJS Unicode",
  role: "Flutter Developer Mentee",
  duration: "Jan 2023 – Jun 2024",
  highlights: [
    "Organised CELESTIA, a tech event with 3 000+ footfall.",
    "Co-developed Tailor Trade, a Flutter app for streamlining tailor-trade processes.",
    "Actively contributed to multiple projects in development and review phases."
  ]
};
