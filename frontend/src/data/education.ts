import type { EducationEntry } from './types';

// Verified education history. Keep dates and descriptions editable here —
// the Experience island and the 2D fallback both render from this file.
export const education: EducationEntry[] = [
  {
    id: 'btech',
    degree: 'B.Tech, Computer Science Engineering',
    school: 'Medicaps University, Indore',
    period: 'Aug 2023 – Jun 2027',
    detail:
      'CGPA 7.55. Coursework: DSA, Web Development, DBMS, Operating Systems, OOP, Computer Networks.',
  },
  {
    id: 'high-school',
    degree: 'Higher Secondary (PCM)',
    school: 'Govt LBS Hindi Higher Secondary School, Pandhurna',
    period: '2018 – 2023',
    detail:
      'Grade A+. District-level stage performances with the school music group as lead vocalist.',
  },
  {
    id: 'primary',
    degree: 'Primary & Middle School',
    school: 'New Sunflower English Medium School, Pandhurna',
    period: '2009 – 2017',
    detail: 'Sports, drama, and dance — foundations in teamwork and performing arts.',
  },
];
