// DEVSLAYER Phase 1 — destination registry.
// Maps the five adventure destinations to portfolio sections (accessible 2D equivalents).
// Camera poses / 3D scene config will extend this file in Phase 2 (no invented content).

export const destinations = [
  {
    id: 'origins',
    label: 'Origins',
    arc: 'Origins Arc — Forest Village',
    sectionId: 'home',
    description: 'First impression: identity, intro, and start of the journey.',
    accent: '#E6B566',
  },
  {
    id: 'training',
    label: 'Training',
    arc: 'Training Arc — Mountain Dojo',
    sectionId: 'skills',
    description: 'Technical skills and learning areas.',
    accent: '#5DADE2',
  },
  {
    id: 'missions',
    label: 'Missions',
    arc: 'Missions Arc — Developer Village',
    sectionId: 'projects',
    description: 'Project case studies: HostelResolve and Hostmate.',
    accent: '#E6B566',
  },
  {
    id: 'trials',
    label: 'Trials',
    arc: 'Trials Arc — Mountain Trials',
    sectionId: 'achievements',
    description: 'Engineering growth: certifications and coding profiles.',
    accent: '#C98F9A',
  },
  {
    id: 'summit',
    label: 'Summit / Contact',
    arc: 'Code Hashira — Summit Shrine',
    sectionId: 'contact',
    description: 'Professional close: resume, contact, and verified profiles.',
    accent: '#F4D47C',
  },
];

export const scrollToSection = (sectionId) => {
  const main = document.querySelector('.main-content');
  const el = document.getElementById(sectionId);
  if (!el) return false;
  if (main) {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    main.scrollTo({
      top: sectionId === 'home' ? 0 : el.getBoundingClientRect().top + main.scrollTop - 80,
      behavior: reduce ? 'auto' : 'smooth',
    });
  } else {
    el.scrollIntoView({ block: 'start' });
  }
  return true;
};

export default destinations;
