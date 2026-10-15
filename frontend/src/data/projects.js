// DEVSLAYER Phase 1 — project content model.
// Verified against frontend/src/components/Projects.jsx (2026-10-15).
// problem/solution/features are grounded ONLY in the existing descriptions.
// Owner decision (Phase 2): Hostmate payments = Razorpay (spec-supported:
// cloud image management, Razorpay processing, webhook-based verification).

const base = import.meta.env.BASE_URL;

export const projects = [
  {
    id: 'spotify-clone',
    title: 'Spotify Clone',
    category: 'practice',
    summary:
      'A frontend UI clone of Spotify built during early learning phase to practice HTML and CSS fundamentals.',
    problem: 'Practice layout design, responsive styling, and recreating real-world interfaces from scratch.',
    solution: 'Hand-built static UI with HTML and CSS.',
    features: ['Responsive layout', 'Recreated real-world interface'],
    techStack: ['HTML', 'CSS'],
    role: 'Frontend Developer',
    date: '2024',
    year: 2024,
    order: 1,
    image: `${base}images/spotify.jpg`,
    links: {
      live: 'https://abhijeet83193.github.io/Spotify-Clone/',
      github: 'https://github.com/Abhijeet83193/Spotify-Clone',
    },
    verified: true,
  },
  {
    id: 'framepro',
    title: 'FramePro',
    category: 'practice',
    summary:
      'A simple, elegant platform designed using HTML and CSS to streamline hiring photographers for events.',
    problem: 'Connecting users with photographers for weddings, corporate gatherings, and photoshoots.',
    solution: 'Responsive, user-friendly interface for exploring and booking photographers.',
    features: ['Responsive interface', 'Seamless navigation for browsing and booking'],
    techStack: ['HTML', 'CSS'],
    role: 'Frontend Developer',
    date: '2024',
    year: 2024,
    order: 2,
    image: `${base}images/camera.jpg`,
    imagePosition: 'top',
    links: {
      live: 'https://abhijeet83193.github.io/FramePro/',
      github: 'https://github.com/Abhijeet83193/FramePro',
    },
    verified: true,
  },
  {
    id: 'weatherapp',
    title: 'WeatherApp',
    category: 'frontend',
    summary:
      'A modern and responsive weather application built with React (Vite) fetching real-time data from the OpenWeather API.',
    problem: 'Show current weather conditions for any searched city.',
    solution: 'React + Vite app querying the OpenWeather API.',
    features: ['City search', 'Real-time conditions display', 'Responsive UI'],
    techStack: ['React', 'JavaScript', 'HTML', 'CSS', 'OpenWeather API'],
    role: 'Frontend Developer',
    date: '2025',
    year: 2025,
    order: 3,
    image: `${base}images/weather-app.jpg`,
    links: {
      live: 'https://weatherapp-7d1e.onrender.com',
      github: 'https://github.com/Abhijeet83193/WeatherApp',
    },
    verified: true,
  },
  {
    id: 'hostmate',
    title: 'Hostmate',
    category: 'mission',
    summary:
      'A modern web application for rental room listings and booking with an intuitive interface, integrated payments, and interactive maps.',
    problem: 'Simplifying the rental experience for both hosts and guests: explore, list, and book rental rooms seamlessly.',
    solution: 'Full-stack rental marketplace with property listing, search/filtering, location-based discovery, cloud image management, and Razorpay payment processing with webhook-based verification.',
    features: [
      'Property listing, search and filtering',
      'Location-based property discovery (OpenStreetMap)',
      'Cloud-based image management (Cloudinary)',
      'Razorpay payment processing with webhook-based payment verification',
    ],
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'HTML', 'CSS', 'Razorpay', 'Cloudinary', 'OpenStreetMap'],
    role: 'Full Stack Developer',
    date: '2025',
    year: 2025,
    order: 4,
    image: `${base}images/hostmate.jpg`,
    imagePosition: 'bottom',
    links: {
      live: 'https://hostmate-6org.onrender.com/',
      github: 'https://github.com/Abhijeet83193/Hostmate',
    },
    verified: true,
  },
  {
    id: 'hostelresolve',
    title: 'HostelResolve',
    category: 'mission',
    summary:
      'A hostel complaint management system that increases transparency between wardens and students, with automatic escalation of unresolved complaints via email.',
    problem: 'Opaque, manual hostel complaint workflows between students and wardens.',
    solution: 'MERN complaint management system: REST APIs for tracking/resolution, SMTP email notifications, and automated escalation for unresolved complaints.',
    features: [
      'Complaint tracking and resolution REST APIs (Node.js/Express.js)',
      'SMTP-based automated escalation for unresolved issues',
      'Responsive React UI for students and hostel admin',
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'SMTP', 'Cloudinary', 'JavaScript', 'HTML', 'CSS', 'Framer Motion'],
    role: 'MERN Stack Developer',
    date: '2026',
    year: 2026,
    order: 5,
    image: `${base}images/hostelresolve.jpg`,
    links: {
      live: 'https://hostelresolve-frontend.onrender.com/',
      github: 'https://github.com/Abhijeet83193/HostelResolve',
    },
    verified: true,
  },
  {
    id: 'my-portfolio',
    title: 'My Portfolio',
    category: 'portfolio',
    summary:
      'A personal portfolio website showcasing skills, projects, education, and experience with smooth scrolling, animated sections, and dynamic filtering.',
    problem: 'Present identity, skills, projects, and contact in one fast, accessible site.',
    solution: 'React + Vite single-page portfolio with animated sections and reusable components.',
    features: ['Animated sections', 'Dynamic project filtering', 'Responsive layout'],
    techStack: ['React', 'JavaScript', 'HTML', 'CSS', 'Framer Motion', 'Lottie', 'Vite', 'GitHub', 'Node.js', 'Express.js', 'MongoDB'],
    role: 'Full Stack Developer',
    date: '2026',
    year: 2026,
    order: 6,
    isMe: true,
    image: `${base}images/my-portfolio.jpg`,
    imagePosition: 'top',
    links: {
      live: '#home',
      github: 'https://github.com/Abhijeet83193/Myportfolio',
    },
    verified: true,
  },
];

export default projects;
