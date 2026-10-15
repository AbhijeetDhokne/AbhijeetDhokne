import type { ExperienceEntry } from './types';

// Resume-grounded only. No invented responsibilities or metrics.
const base = import.meta.env.BASE_URL;

// Sorted most-recent-first by start date. Keep this order — the Experience
// island renders monoliths left-to-right in array order.
export const experience: ExperienceEntry[] = [
  {
    id: 'ai-intern-kv',
    role: 'AI Software Development Intern (Societal Intern)',
    org: 'PM SHRI Kendriya Vidyalaya, Pandhurna',
    location: 'Pandhurna, Madhya Pradesh, India',
    period: 'Jul 2026 – Aug 2026',
    icon: 'cpu',
    summary: 'AI-integrated project workflows using prompt engineering, LLM tools, and AI-assisted development platforms.',
    bullets: [
      'Applied design-to-code workflows with AI-assisted development platforms',
      'Explored local LLM setups using Ollama',
      'Prototyped AI-assisted builds with Google AI Studio',
    ],
    techStack: ['Prompt Engineering', 'LLM Tools', 'Ollama', 'Google AI Studio'],
  },
  {
    id: 'aws-trainee-medicaps',
    role: 'AWS Cloud Computing Trainee',
    org: 'Medicaps University',
    location: 'Indore, Madhya Pradesh, India',
    period: 'Jun 2026 – Jul 2026',
    icon: 'cloud',
    summary: 'AWS Cloud Foundations and Cloud Architecting: scalability, security, reliability, and cost optimization.',
    bullets: [
      'Studied AWS Cloud Foundations and Cloud Architecting',
      'Learned scalability, reliability, and cost-optimization concepts',
      'Covered cloud security fundamentals',
    ],
    techStack: ['AWS', 'Linux', 'Apache HTTP Server', 'Cloud Foundations', 'Cloud Architecting'],
  },
  {
    id: 'mern-medicaps',
    role: 'MERN Stack Developer',
    org: 'Medicaps University',
    location: 'Indore, Madhya Pradesh, India',
    period: 'Feb 2026 – May 2026',
    team: '2-member team',
    logo: `${base}images/medicaps-logo-fin-Picsart-BackgroundRemover.png`,
    summary: 'Built HostelResolve, a hostel complaint management system digitizing workflows between students and wardens.',
    bullets: [
      'Built REST APIs with Node.js & Express.js for complaint tracking',
      'Integrated SMTP-based automated escalation for unresolved issues',
      'Designed responsive React UI for students and hostel administration',
    ],
    techStack: ['React', 'Node.js', 'MongoDB', 'SMTP', 'Express.js'],
  },
];

// Education lives in ./education so dates stay editable in one place.
export { education } from './education';
