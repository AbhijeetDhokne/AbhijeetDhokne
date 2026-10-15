import type { Collectible, Destination, TrainingStation } from './types';

// Five connected destinations: 3D anchor + cinematic camera pose + 2D section.
// Camera poses are the single source of truth for the GSAP camera director.
export const destinations: Destination[] = [
  {
    id: 'origins',
    label: 'Origins',
    arc: 'Origins Arc — Forest Village',
    tagline: 'Where the journey begins',
    description: 'A lantern-lit forest gate. Identity, introduction, and the first step of the path.',
    accent: '#E6B566',
    sectionId: 'intro',
    position: [0, 0, 24],
    beacon: [6.5, 0, 20.5],
    camera: { position: [9, 10, 38], target: [-2, 2, 21] },
  },
  {
    id: 'training',
    label: 'Training',
    arc: 'Training Arc — Mountain Dojo',
    tagline: 'Sharpen the fundamentals',
    description: 'A waterfall dojo of stepping stones and practice posts. Skills, drills, and discipline.',
    accent: '#5DADE2',
    sectionId: 'skills',
    position: [-27, 0, 5],
    camera: { position: [-12, 7, 15], target: [-27, 2, 4] },
  },
  {
    id: 'missions',
    label: 'Missions',
    arc: 'Missions Arc — Developer Village',
    tagline: 'Real projects, real stakes',
    description: 'Two mission halls: HostelResolve and Hostmate. Case briefings inside.',
    accent: '#E6B566',
    sectionId: 'projects',
    position: [27, 0, 5],
    camera: { position: [12, 7, 15], target: [27, 2, 5] },
  },
  {
    id: 'trials',
    label: 'Trials',
    arc: 'Trials Arc — Mountain Trials',
    tagline: 'Prove the engineering',
    description: 'A misty mountain crossing of bridges and gates. Debugging stories and trade-offs.',
    accent: '#C98F9A',
    sectionId: 'experience',
    position: [0, 0, -17],
    camera: { position: [7, 9, -2], target: [-1, 2, -17] },
  },
  {
    id: 'summit',
    label: 'Summit',
    arc: 'Code Hashira — Summit Shrine',
    tagline: 'The path converges',
    description: 'A sunrise shrine above the clouds. Resume, contact, and the road ahead.',
    accent: '#F4D47C',
    sectionId: 'contact',
    position: [0, 9.6, -38],
    camera: { position: [8, 15, -19], target: [0, 10, -38] },
  },
];

export const OVERVIEW_CAMERA = {
  position: [0, 30, 58] as [number, number, number],
  target: [0, 3, -6] as [number, number, number],
};

export const destinationById = (id: string): Destination | undefined =>
  destinations.find((d) => d.id === id);

export const trainingStations: TrainingStation[] = [
  {
    id: 'station-frontend',
    title: 'Forms of the Frontend',
    area: 'React · JavaScript · CSS',
    description: 'Component drills: state, effects, and interfaces that respond in a single frame.',
    relatedSkills: ['react', 'javascript', 'html', 'css', 'tailwind'],
  },
  {
    id: 'station-backend',
    title: 'Breathing of the Backend',
    area: 'Node.js · Express · REST APIs',
    description: 'API katas: routing, validation, authentication, and clean data flow.',
    relatedSkills: ['node', 'express', 'mongodb', 'postman'],
  },
  {
    id: 'station-data',
    title: 'Stone Body Conditioning',
    area: 'DSA · Databases · Cloud',
    description: 'Endurance work: data structures, query design, and cloud foundations.',
    relatedSkills: ['java', 'python', 'mongodb', 'mysql', 'aws'],
  },
];

export const collectibles: Collectible[] = [
  { id: 'scroll-origins', name: 'Scroll of Beginnings', hint: 'Near the forest gate lanterns', position: [4.5, 1.6, 20], color: '#E6B566' },
  { id: 'scroll-training', name: 'Scroll of Discipline', hint: 'Behind the dojo, by the falls', position: [-33, 1.6, -3], color: '#5DADE2' },
  { id: 'scroll-missions', name: 'Scroll of Craft', hint: 'Between the two mission halls', position: [27, 1.6, 11], color: '#E6B566' },
  { id: 'scroll-trials', name: 'Scroll of Perseverance', hint: 'Past the second gate, off the path', position: [6.5, 1.6, -21], color: '#C98F9A' },
  { id: 'scroll-summit', name: 'Scroll of Dawn', hint: 'Beside the summit mirror pool', position: [-3.4, 11, -36], color: '#F4D47C' },
];
