// DEVSLAYER — experience content model.
// Entry 1 verified from App.jsx Experience section (metric softened: the
// "40% transparency" claim had no evidence, reworded without numbers).
// Entries 2-3 from the resume snapshot in DESIGN_SPEC §5 (owner-approved
// Phase 2 decision). No invented responsibilities, achievements, or metrics.

export const experience = [
  {
    id: 'mern-medicaps',
    role: 'MERN Stack Developer',
    org: 'Medicaps University',
    location: 'Indore, Madhya Pradesh, India',
    period: 'Feb 2026 - May 2026',
    team: '2-Member Team',
    logo: `${import.meta.env.BASE_URL}images/medicaps-logo-fin-Picsart-BackgroundRemover.png`,
    summary:
      'Built a hostel complaint management system (HostelResolve) to digitize complaint workflows and improve transparency between students and wardens.',
    bullets: [
      'Built REST APIs with Node.js & Express.js for complaint tracking',
      'Integrated SMTP-based automated escalation for unresolved issues',
      'Designed responsive React UI for students & hostel admin',
    ],
    techStack: ['React', 'Node.js', 'MongoDB', 'SMTP', 'Express.js'],
  },
  {
    id: 'ai-intern-kv',
    role: 'AI Software Development Intern (Societal Intern)',
    org: 'PM SHRI Kendriya Vidyalaya, Pandhurna',
    location: 'Pandhurna, Madhya Pradesh, India',
    period: 'Jul 2026 - Aug 2026',
    team: null,
    icon: 'cpu',
    summary:
      'Worked on AI-integrated project workflows using prompt engineering, LLM tools, and AI-assisted development platforms.',
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
    period: 'Jun 2026 - Jul 2026',
    team: null,
    icon: 'cloud',
    summary:
      'Trained in AWS Cloud Foundations and Cloud Architecting, covering scalability, security, reliability, and cost optimization concepts.',
    bullets: [
      'Studied AWS Cloud Foundations and Cloud Architecting',
      'Learned scalability, reliability, and cost-optimization concepts',
      'Covered cloud security fundamentals',
    ],
    techStack: ['AWS', 'Cloud Foundations', 'Cloud Architecting'],
  },
];

export default experience;
