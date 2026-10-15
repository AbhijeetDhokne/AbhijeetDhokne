// DEVSLAYER Phase 1 — skills content model.
// Verified against frontend/src/components/Skills.jsx. Areas only — no proficiency claims.

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const BASE = import.meta.env.BASE_URL;

export const skillCategories = ['All', 'Frontend', 'Backend', 'Language', 'Database', 'Tools', 'Cloud'];

export const skills = [
  { id: 'react', name: 'React', icon: `${DEVICON_BASE}/react/react-original-wordmark.svg`, category: 'Frontend', span: 'wide', color: '#61DAFB', description: 'Building dynamic, component-based UIs with hooks and modern patterns' },
  { id: 'node', name: 'Node.js', icon: `${DEVICON_BASE}/nodejs/nodejs-original-wordmark.svg`, category: 'Backend', span: 'wide', color: '#68A063', description: 'Server-side JavaScript for scalable APIs and microservices' },
  { id: 'javascript', name: 'JavaScript', icon: `${DEVICON_BASE}/javascript/javascript-original.svg`, category: 'Language', span: 'normal', color: '#F7DF1E', description: 'Core language for web development' },
  { id: 'python', name: 'Python', icon: `${DEVICON_BASE}/python/python-original-wordmark.svg`, category: 'Language', span: 'normal', color: '#3776AB', description: 'Scripting, automation, and problem solving' },
  { id: 'mongodb', name: 'MongoDB', icon: `${DEVICON_BASE}/mongodb/mongodb-original-wordmark.svg`, category: 'Database', span: 'normal', color: '#47A248', description: 'NoSQL database for flexible data models' },
  { id: 'express', name: 'Express.js', icon: `${DEVICON_BASE}/express/express-original-wordmark.svg`, category: 'Backend', span: 'normal', color: '#000000', description: 'Minimalist web framework for Node.js' },
  { id: 'html5', name: 'HTML5', icon: `${DEVICON_BASE}/html5/html5-original-wordmark.svg`, category: 'Frontend', span: 'normal', color: '#E34F26', description: 'Semantic markup and modern web standards' },
  { id: 'css3', name: 'CSS3', icon: `${DEVICON_BASE}/css3/css3-original-wordmark.svg`, category: 'Frontend', span: 'normal', color: '#1572B6', description: 'Responsive layouts, animations, and styling' },
  { id: 'tailwind', name: 'Tailwind', icon: `${BASE}images/tailwind-css-icon.jpg`, category: 'Frontend', span: 'normal', color: '#06B6D4', description: 'Utility-first CSS for rapid UI development' },
  { id: 'bootstrap', name: 'Bootstrap', icon: `${BASE}images/bootsrap.jpg`, category: 'Frontend', span: 'normal', color: '#7952B3', description: 'Component library for responsive design' },
  { id: 'java', name: 'Java', icon: `${BASE}images/java.jpg`, category: 'Language', span: 'normal', color: '#ED8B00', description: 'OOP, DSA, and enterprise applications' },
  { id: 'mysql', name: 'MySQL', icon: `${DEVICON_BASE}/mysql/mysql-original-wordmark.svg`, category: 'Database', span: 'normal', color: '#4479A1', description: 'Relational database for structured data' },
  { id: 'git', name: 'Git & GitHub', icon: `${DEVICON_BASE}/git/git-original-wordmark.svg`, category: 'Tools', span: 'wide', color: '#F05032', description: 'Version control, collaboration, and CI/CD workflows' },
  { id: 'aws', name: 'AWS', icon: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg`, category: 'Cloud', span: 'normal', color: '#FF9900', description: 'Cloud deployment and infrastructure' },
  { id: 'vscode', name: 'VS Code', icon: `${BASE}images/visual-studio-code-1-1.jpg`, category: 'Tools', span: 'normal', color: '#007ACC', description: 'Primary IDE with powerful extensions' },
  { id: 'postman', name: 'Postman', icon: `${DEVICON_BASE}/postman/postman-original-wordmark.svg`, category: 'Tools', span: 'normal', color: '#FF6C37', description: 'API testing and development' },
];

export default skills;
