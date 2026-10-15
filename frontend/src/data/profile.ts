import type { Social } from './types';

// Verified from repository files. Phone is private by owner decision —
// contact runs on email + professional profiles only.
const base = import.meta.env.BASE_URL;

export const profile = {
  name: 'Abhijeet Dhokne',
  title: 'Full Stack Developer',
  tagline: 'Computer Science engineer forging efficient, scalable systems and engaging digital experiences.',
  location: 'RAU, Indore, Madhya Pradesh, India',
  email: 'abhijeetdhokne1474@gmail.com',
  resumePath: `${base}resume/resume_1.pdf`,
  portrait: `${base}images/my-profile.jpg`,
};

export const socials: Social[] = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/AbhijeetDhokne', verified: true },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/abhijeetdhokne/', verified: true },
  { id: 'x', label: 'X', url: 'https://x.com/_AbhijeetDhokne', verified: true },
  { id: 'leetcode', label: 'LeetCode', url: 'https://leetcode.com/u/AbhijeetDhokne/', verified: true },
];

export const certificates = [
  {
    id: 'python-iitb',
    title: 'Python 3.4.3 Training',
    org: 'EduPyramids, SINE, IIT Bombay',
    detail: 'Remote programming test — verified PDF in certificates archive.',
    file: 'Certificate for the Completion of python-tarining.pdf',
  },
  {
    id: 'ai-fluency',
    title: 'AI Fluency Framework & Foundations',
    org: 'Anthropic',
    detail: 'AI agents, secure AI practices.',
    file: 'certificate-b3axfxve3ji7-1774327082.pdf',
  },
  {
    id: 'dsa-java',
    title: 'DSA in Java',
    org: 'Apna College',
    detail: 'Core data structures and algorithms in Java.',
    file: 'dsa-completion-apna-college.pdf',
  },
  {
    id: 'mern',
    title: 'Full Stack Web Development (MERN)',
    org: 'Apna College',
    detail: 'MERN stack completion.',
    file: 'full-stack-developer.pdf',
  },
];

export const certificatesBase = `${base}certificates/`;
