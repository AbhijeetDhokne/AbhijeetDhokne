import type { Skill } from './types';

// Skill areas only — no proficiency percentages, per project rules.
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const base = import.meta.env.BASE_URL;

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
];

export const skillCategories = ['All', 'Frontend', 'Backend', 'Language', 'Database', 'Tools', 'Cloud'] as const;
