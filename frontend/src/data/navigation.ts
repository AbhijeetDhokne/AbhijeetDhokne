// Floating-islands navigation chart.
// Five islands at different elevations and depths; the camera chart below is
// the single source of truth for CameraController travel timelines.
// Palette: midnight navy space, electric cyan/blue light, restrained violet.

import type { IslandDefinition, IslandId } from './types';

export const islands: IslandDefinition[] = [
  {
    id: 'home',
    label: 'Home',
    tagline: 'Where the journey begins',
    description:
      'The heart of the archipelago. Meet Abhijeet Dhokne and chart a course across his work.',
    accent: '#7adeff',
    sectionId: 'intro',
    position: [0, 0, 0],
    radius: 9,
    frame: { width: 20, height: 13 },
    camera: { position: [10, 16, 20], target: [0, 1.5, 0] },
  },
  {
    id: 'projects',
    label: 'Projects',
    tagline: 'Real builds, real stakes',
    description:
      'Two flagship builds, HostelResolve and Hostmate, plus frontend studies, each in its own structure.',
    accent: '#ffb35c',
    sectionId: 'projects',
    position: [26, 3, -6],
    radius: 7.5,
    frame: { width: 16, height: 12 },
    camera: { position: [8, 18, 12], target: [26, 3, -6] },
  },
  {
    id: 'skills',
    label: 'Skills',
    tagline: 'Crystal archive of the craft',
    description:
      'Languages, frameworks, databases, and tools as interactive crystal formations: a showcase of verified, production tested craft.',
    accent: '#b9c2ff',
    sectionId: 'skills',
    position: [-26, 4, -8],
    radius: 7,
    frame: { width: 15, height: 12 },
    camera: { position: [-8, 19, 10], target: [-26, 4, -8] },
  },
  {
    id: 'journey',
    label: 'Journey',
    tagline: 'Education and credentials',
    description:
      'Education history and certificates: schools, degrees, and verified credentials.',
    accent: '#6fe3a5',
    sectionId: 'education',
    position: [12, -2, -30],
    radius: 7,
    frame: { width: 15, height: 14, ox: 0, oy: -0.2, zoom: 0.85 },
    camera: { position: [0, 12, -12], target: [12, 0.5, -30] },
  },
  {
    id: 'experience',
    label: 'Experience',
    tagline: 'Professional experience',
    description:
      'Verified professional roles, most recent first: AI engineering, cloud training, and MERN product work.',
    accent: '#f49df2',
    sectionId: 'experience',
    position: [0, 8, -52],
    radius: 7,
    frame: { width: 15, height: 14, ox: 0, oy: -0.28, zoom: 1.15 },
    camera: { position: [10, 18, -28], target: [0, 7, -52] },
  },
  {
    id: 'contact',
    label: 'Contact',
    tagline: 'The signal portal',
    description:
      'Final destination. A glowing communication portal with verified email, GitHub, LinkedIn, and resume links.',
    accent: '#6aa8ff',
    sectionId: 'contact',
    position: [-12, 7, -32],
    radius: 6,
    frame: { width: 13, height: 16 },
    camera: { position: [6, 22, -14], target: [-12, 8, -32] },
  },
];

export const OVERVIEW_CAMERA = {
  position: [0, 26, 44] as [number, number, number],
  target: [0, 0, -12] as [number, number, number],
};

export const islandById = (id: IslandId): IslandDefinition =>
  islands.find((i) => i.id === id) as IslandDefinition;

export const NAV_ORDER: IslandId[] = ['home', 'projects', 'skills', 'journey', 'experience', 'contact'];
