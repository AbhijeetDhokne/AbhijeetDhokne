import { describe, expect, it } from 'vitest';
import { destinations, collectibles, trainingStations, OVERVIEW_CAMERA } from './destinations';
import { projects, missions, projectById } from './projects';
import { skills } from './skills';
import { experience } from './experience';

const isVec3 = (v: unknown): boolean =>
  Array.isArray(v) && v.length === 3 && v.every((n) => Number.isFinite(n));

describe('destinations', () => {
  it('defines exactly five connected destinations with unique ids', () => {
    expect(destinations).toHaveLength(5);
    expect(new Set(destinations.map((d) => d.id)).size).toBe(5);
  });

  it('gives every destination a valid anchor, camera pose, and 2D section', () => {
    for (const d of destinations) {
      expect(isVec3(d.position)).toBe(true);
      expect(isVec3(d.camera.position)).toBe(true);
      expect(isVec3(d.camera.target)).toBe(true);
      expect(typeof d.sectionId).toBe('string');
    }
    expect(isVec3(OVERVIEW_CAMERA.position)).toBe(true);
    expect(isVec3(OVERVIEW_CAMERA.target)).toBe(true);
  });

  it('maps sections to real portfolio anchors', () => {
    const anchors = ['intro', 'skills', 'projects', 'experience', 'contact'];
    for (const d of destinations) {
      expect(anchors).toContain(d.sectionId);
    }
  });

  it('places collectibles and stations without id collisions', () => {
    expect(collectibles).toHaveLength(5);
    expect(trainingStations).toHaveLength(3);
    expect(new Set(collectibles.map((c) => c.id)).size).toBe(5);
    for (const c of collectibles) expect(isVec3(c.position)).toBe(true);
  });
});

describe('projects', () => {
  it('exposes the two verified missions with problem/solution/links', () => {
    expect(missions.map((m) => m.id).sort()).toEqual(['hostelresolve', 'hostmate']);
    for (const m of missions) {
      expect(m.problem.length).toBeGreaterThan(10);
      expect(m.solution.length).toBeGreaterThan(10);
      expect(m.features.length).toBeGreaterThanOrEqual(3);
      expect(m.techStack.length).toBeGreaterThanOrEqual(3);
      expect(m.links.live ?? m.links.github).toBeTruthy();
      expect(m.verified).toBe(true);
    }
  });

  it('uses Razorpay (owner decision) and no phone number anywhere', () => {
    expect(projectById('hostmate')?.techStack).toContain('Razorpay');
    const blob = JSON.stringify(projects);
    expect(blob).not.toMatch(/stripe/i);
    expect(blob).not.toMatch(/83193.?91214/);
  });
});

describe('skills + experience', () => {
  it('lists skills without proficiency claims', () => {
    expect(skills.length).toBeGreaterThan(10);
    const blob = JSON.stringify(skills);
    expect(blob).not.toMatch(/%/);
  });

  it('covers all three verified experience entries without invented metrics', () => {
    expect(experience.map((e) => e.id)).toEqual(['mern-medicaps', 'ai-intern-kv', 'aws-trainee-medicaps']);
    const blob = JSON.stringify(experience);
    expect(blob).not.toMatch(/40%/);
  });
});
