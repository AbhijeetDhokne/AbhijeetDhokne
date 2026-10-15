import type { Skill } from './types';

// Skill areas only — no proficiency percentages, per project rules.
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const base = import.meta.env.BASE_URL;

// Honest text badge for concepts without a brand icon (REST, JWT, ...).
const badge = (label: string): string => {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
    `<rect x="2" y="2" width="60" height="60" rx="14" fill="#0e2233" stroke="#7adeff" stroke-opacity="0.5" stroke-width="2"/>` +
    `<text x="32" y="38" font-family="monospace" font-size="13" font-weight="bold" fill="#7adeff" text-anchor="middle">${label}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const skills: Skill[] = [
  { id: 'react', name: 'React', icon: `${DEVICON}/react/react-original.svg`, category: 'Frontend', description: 'Component-based dynamic UIs with hooks and modern patterns' },
  { id: 'javascript', name: 'JavaScript', icon: `${DEVICON}/javascript/javascript-original.svg`, category: 'Language', description: 'Core language of the web' },
  { id: 'java', name: 'Java', icon: `${base}images/java.jpg`, category: 'Language', description: 'OOP, DSA, enterprise foundations' },
  { id: 'python', name: 'Python', icon: `${DEVICON}/python/python-original.svg`, category: 'Language', description: 'Scripting, automation, problem solving' },
  { id: 'html', name: 'HTML5', icon: `${DEVICON}/html5/html5-original.svg`, category: 'Frontend', description: 'Semantic markup and modern standards' },
  { id: 'css', name: 'CSS3', icon: `${DEVICON}/css3/css3-original.svg`, category: 'Frontend', description: 'Responsive layouts and animation' },
  { id: 'tailwind', name: 'Tailwind CSS', icon: `${base}images/tailwind-css-icon.jpg`, category: 'Frontend', description: 'Utility-first rapid UI development' },
  { id: 'bootstrap', name: 'Bootstrap', icon: `${base}images/bootsrap.jpg`, category: 'Frontend', description: 'Responsive component library' },
  { id: 'node', name: 'Node.js', icon: `${DEVICON}/nodejs/nodejs-original.svg`, category: 'Backend', description: 'Server-side JavaScript for scalable APIs' },
  { id: 'express', name: 'Express.js', icon: `${DEVICON}/express/express-original.svg`, category: 'Backend', description: 'Minimalist Node web framework' },
  { id: 'mongodb', name: 'MongoDB', icon: `${DEVICON}/mongodb/mongodb-original.svg`, category: 'Database', description: 'Flexible NoSQL data models' },
  { id: 'mysql', name: 'MySQL', icon: `${DEVICON}/mysql/mysql-original.svg`, category: 'Database', description: 'Structured relational data' },
  { id: 'git', name: 'Git & GitHub', icon: `${DEVICON}/git/git-original.svg`, category: 'Tools', description: 'Version control and collaboration' },
  { id: 'postman', name: 'Postman', icon: `${DEVICON}/postman/postman-original.svg`, category: 'Tools', description: 'API testing and development' },
  { id: 'vscode', name: 'VS Code', icon: `${base}images/visual-studio-code-1-1.jpg`, category: 'Tools', description: 'Primary editor' },
  { id: 'aws', name: 'AWS', icon: `${DEVICON}/amazonwebservices/amazonwebservices-original.svg`, category: 'Cloud', description: 'Cloud foundations and architecting' },
  { id: 'sql', name: 'SQL', icon: badge('SQL'), category: 'Database', description: 'Relational queries, joins, and schema design' },
  { id: 'spring', name: 'Spring Boot', icon: `${DEVICON}/spring/spring-original.svg`, category: 'Backend', description: 'Production-ready Java services' },
  { id: 'rest', name: 'REST APIs', icon: badge('REST'), category: 'Backend', description: 'Resource-oriented HTTP API design' },
  { id: 'jwt', name: 'JWT Authentication', icon: badge('JWT'), category: 'Backend', description: 'Token-based authentication flows' },
  { id: 'mvc', name: 'MVC Architecture', icon: badge('MVC'), category: 'Backend', description: 'Model-View-Controller application structure' },
  { id: 'linux', name: 'Linux', icon: `${DEVICON}/linux/linux-original.svg`, category: 'Tools', description: 'Command line, permissions, and hosting basics' },
  { id: 'docker', name: 'Docker', icon: `${DEVICON}/docker/docker-original.svg`, category: 'Cloud', description: 'Containerized builds and environments' },
  { id: 'kubernetes', name: 'Kubernetes', icon: `${DEVICON}/kubernetes/kubernetes-plain.svg`, category: 'Cloud', description: 'Container orchestration concepts' },
  { id: 'jenkins', name: 'Jenkins', icon: `${DEVICON}/jenkins/jenkins-original.svg`, category: 'Cloud', description: 'Automation server for build pipelines' },
  { id: 'cicd', name: 'CI/CD', icon: badge('CI/CD'), category: 'Cloud', description: 'Automated build, test, and deploy pipelines' },
];

export const skillCategories = ['All', 'Frontend', 'Backend', 'Language', 'Database', 'Tools', 'Cloud'] as const;

export const skillById = (id: string) => skills.find((s) => s.id === id);

// Interactive 3D groupings for the Skills island. Each node renders as one
// crystal cluster; selecting it lists the verified skills below — areas of
// work, never proficiency percentages.
export interface SkillNode {
  id: string;
  title: string;
  area: string;
  description: string;
  skillIds: string[];
}

export const skillNodes: SkillNode[] = [
  {
    id: 'node-frontend',
    title: 'Interface Craft',
    area: 'React · JavaScript · CSS',
    description: 'Component-driven interfaces: state, effects, and responsive layouts that hold up in production.',
    skillIds: ['react', 'javascript', 'html', 'css', 'tailwind', 'bootstrap'],
  },
  {
    id: 'node-backend',
    title: 'Service Foundations',
    area: 'Node.js · Express · REST APIs',
    description: 'Server-side work: routing, validation, authentication, and clean data flow.',
    skillIds: ['node', 'express', 'spring', 'rest', 'jwt', 'mvc', 'postman'],
  },
  {
    id: 'node-data',
    title: 'Data & Platforms',
    area: 'Databases · Languages · Cloud',
    description: 'Persistence and platform knowledge: data modelling, query design, DSA foundations, and cloud basics.',
    skillIds: ['mongodb', 'mysql', 'sql', 'java', 'python', 'git', 'linux', 'vscode', 'aws', 'docker', 'kubernetes', 'jenkins', 'cicd'],
  },
];
