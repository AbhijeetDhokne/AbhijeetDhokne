import type { Project } from './types';

// Verified project content. Hostmate payments = Razorpay (owner decision).
// No invented metrics, adoption claims, or performance numbers.
const base = import.meta.env.BASE_URL;

export const projects: Project[] = [
  {
    id: 'hostelresolve',
    title: 'HostelResolve',
    category: 'flagship',
    summary: 'Hostel complaint management system bringing transparency between wardens and students.',
    problem: 'Opaque, manual hostel complaint workflows between students and wardens.',
    solution:
      'MERN complaint management system: REST APIs for tracking and resolution, SMTP email notifications, and automated escalation for unresolved complaints.',
    features: [
      'Complaint tracking and resolution REST APIs (Node.js / Express.js)',
      'SMTP email notifications with automated escalation for unresolved issues',
      'Responsive React UI for students and hostel administration',
    ],
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'SMTP'],
    role: 'MERN Stack Developer',
    date: '2026',
    year: 2026,
    image: `${base}images/hostelresolve.jpg`,
    links: {
      live: 'https://hostelresolve-frontend.onrender.com/',
      github: 'https://github.com/Abhijeet83193/HostelResolve',
    },
    verified: true,
  },
  {
    id: 'hostmate',
    title: 'Hostmate',
    category: 'flagship',
    summary: 'Rental marketplace for listing, discovering, and booking rooms.',
    problem: 'Fragmented rental discovery: scattered listings, no trusted booking flow.',
    solution:
      'Full-stack rental marketplace with property listing, search and filtering, location-based discovery, cloud image management, and Razorpay payments verified by webhooks.',
    features: [
      'Property listing with search and filtering',
      'Location-based property discovery (OpenStreetMap)',
      'Cloud image management (Cloudinary)',
      'Razorpay payment processing with webhook-based verification',
    ],
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Cloudinary', 'OpenStreetMap', 'Razorpay'],
    role: 'Full Stack Developer',
    date: '2025',
    year: 2025,
    image: `${base}images/hostmate.jpg`,
    links: {
      live: 'https://hostmate-6org.onrender.com/',
      github: 'https://github.com/Abhijeet83193/Hostmate',
    },
    verified: true,
  },
  {
    id: 'weatherapp',
    title: 'WeatherApp',
    category: 'frontend',
    summary: 'Responsive React weather app powered by the OpenWeather API.',
    problem: 'Check current conditions for any city quickly.',
    solution: 'React + Vite app querying the OpenWeather API with city search.',
    features: ['City search', 'Real-time conditions', 'Responsive UI'],
    techStack: ['React', 'JavaScript', 'HTML', 'CSS', 'OpenWeather API'],
    role: 'Frontend Developer',
    date: '2025',
    year: 2025,
    image: `${base}images/weather-app.jpg`,
    links: {
      live: 'https://weatherapp-7d1e.onrender.com',
      github: 'https://github.com/Abhijeet83193/WeatherApp',
    },
    verified: true,
  },
  {
    id: 'framepro',
    title: 'FramePro',
    category: 'practice',
    summary: 'Photographer hiring platform concept in HTML/CSS.',
    problem: 'Finding photographers for events is fragmented.',
    solution: 'Responsive browsing and booking interface concept.',
    features: ['Responsive interface', 'Event-based browsing'],
    techStack: ['HTML', 'CSS'],
    role: 'Frontend Developer',
    date: '2024',
    year: 2024,
    image: `${base}images/camera.jpg`,
    links: {
      live: 'https://abhijeet83193.github.io/FramePro/',
      github: 'https://github.com/Abhijeet83193/FramePro',
    },
    verified: true,
  },
  {
    id: 'spotify-clone',
    title: 'Spotify Clone',
    category: 'practice',
    summary: 'Frontend UI study recreating Spotify in HTML/CSS.',
    problem: 'Learning layout, responsive styling, and real-world interfaces.',
    solution: 'Hand-built static UI study.',
    features: ['Responsive layout', 'Interface recreation study'],
    techStack: ['HTML', 'CSS'],
    role: 'Frontend Developer',
    date: '2024',
    year: 2024,
    image: `${base}images/spotify.jpg`,
    links: {
      live: 'https://abhijeet83193.github.io/Spotify-Clone/',
      github: 'https://github.com/Abhijeet83193/Spotify-Clone',
    },
    verified: true,
  },
];

export const flagships = projects.filter((p) => p.category === 'flagship');

/** Deprecated alias — prefer `flagships`. */
export const missions = flagships;

export const projectById = (id: string): Project | undefined => projects.find((p) => p.id === id);
