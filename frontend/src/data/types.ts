// DEVSLAYER content model — typed. Verified strings only; TODOs never render.

export interface Social {
  id: string;
  label: string;
  url: string;
  verified: boolean;
}

export interface CodingProfile {
  id: string;
  label: string;
  username: string;
  url: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'mission' | 'frontend' | 'practice' | 'portfolio';
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  role: string;
  date: string;
  year: number;
  image?: string;
  links: ProjectLinks;
  verified: boolean;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'Frontend' | 'Backend' | 'Language' | 'Database' | 'Tools' | 'Cloud';
  description: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  location: string;
  period: string;
  team?: string;
  logo?: string;
  icon?: 'cpu' | 'cloud';
  summary: string;
  bullets: string[];
  techStack: string[];
}

export type DestinationId = 'origins' | 'training' | 'missions' | 'trials' | 'summit';

export interface Destination {
  id: DestinationId;
  label: string;
  arc: string;
  tagline: string;
  description: string;
  accent: string;
  /** 2D portfolio section anchor (accessible equivalent). */
  sectionId: string;
  /** 3D world anchor. */
  position: [number, number, number];
  /** Beacon marker anchor (defaults to position; offset for camera composition). */
  beacon?: [number, number, number];
  camera: { position: [number, number, number]; target: [number, number, number] };
}

export interface TrainingStation {
  id: string;
  title: string;
  area: string;
  description: string;
  relatedSkills: string[];
}

export interface Collectible {
  id: string;
  name: string;
  hint: string;
  position: [number, number, number];
  color: string;
}
