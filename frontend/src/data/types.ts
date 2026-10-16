// Floating-islands content model. Verified strings only; TODOs never render.
// No proficiency percentages, no invented metrics, no fictional branding.

export interface Social {
  id: string;
  label: string;
  url: string;
  verified: boolean;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'flagship' | 'frontend' | 'practice' | 'portfolio';
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

export interface EducationEntry {
  id: string;
  degree: string;
  school: string;
  period: string;
  detail: string;
}

export type IslandId = 'home' | 'projects' | 'skills' | 'journey' | 'experience' | 'contact';

export interface IslandDefinition {
  id: IslandId;
  /** Short label for nav + destination indicator. */
  label: string;
  /** One-line cinematic subtitle. */
  tagline: string;
  description: string;
  accent: string;
  /** Accessible 2D section anchor (fallback portfolio). */
  sectionId: string;
  /** 3D world anchor (island centre). */
  position: [number, number, number];
  /** Island visual radius (top disc). */
  radius: number;
  /** Framing box (world units) used to fit the island in view on any screen. */
  frame: {
    width: number;
    height: number;
    /** Desired island screen position in NDC (+x right, +y up). Defaults: centered, slightly low. */
    ox?: number;
    oy?: number;
    /** Per-island zoom multiplier on the fitted distance (default 1). */
    zoom?: number;
  };
  camera: { position: [number, number, number]; target: [number, number, number] };
}

// --- Island navigation state (travel requests shared by nav, beacons, camera)

export type IslandDestination = IslandId | 'overview';

export interface TravelRequest {
  dest: IslandDestination;
  nonce: number;
}

export type Selection =
  | { type: 'home' }
  | { type: 'project'; id: string }
  | { type: 'skill-node'; id: string }
  | { type: 'experience'; id: string }
  | { type: 'education' }
  | { type: 'contact' }
  | null;

export interface IslandState {
  /** Whether the visitor has entered the 3D universe (hero overlay dismissed). */
  entered: boolean;
  enter: () => void;
  returnHome: () => void;
  current: IslandDestination;
  travelRequest: TravelRequest;
  requestTravel: (dest: IslandDestination) => void;
  markArrived: (dest: IslandDestination) => void;
  traveling: boolean;
  setTraveling: (t: boolean) => void;
  /** Skip the in-flight camera tween (accessibility + reduced motion). */
  skipNonce: number;
  requestSkip: () => void;
  selection: Selection;
  select: (s: Selection) => void;
  /** In-site resume viewer overlay (PDF opens inside the portfolio, not a new tab). */
  resumeOpen: boolean;
  setResumeOpen: (v: boolean) => void;
  webglFailed: boolean;
  setWebglFailed: (v: boolean) => void;
}

