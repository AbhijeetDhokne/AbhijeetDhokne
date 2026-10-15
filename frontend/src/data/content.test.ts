// Verified-content contract for the floating-islands universe.
// Guards: five islands, genuine project data, no invented metrics, no phantom links.

import { describe, expect, it } from 'vitest';
import { islands, OVERVIEW_CAMERA, NAV_ORDER } from './navigation';
import { flagships, projectById, projects } from './projects';
import { skills, skillNodes } from './skills';
import { experience } from './experience';
import { education } from './education';

const isVec3 = (v: unknown): boolean =>
  Array.isArray(v) && v.length === 3 && v.every((n) => Number.isFinite(n));

describe('islands navigation chart', () => {
  it('defines exactly six islands with unique ids in nav order', () => {
    expect(islands).toHaveLength(6);
    expect(new Set(islands.map((i) => i.id)).size).toBe(6);
    expect(NAV_ORDER).toEqual(['home', 'projects', 'skills', 'journey', 'experience', 'contact']);
  });

  it('gives every island a valid anchor, radius, and cinematic camera pose', () => {
    for (const isl of islands) {
      expect(isVec3(isl.position)).toBe(true);
      expect(isl.radius).toBeGreaterThan(3);
      expect(isVec3(isl.camera.position)).toBe(true);
      expect(isVec3(isl.camera.target)).toBe(true);
      expect(typeof isl.sectionId).toBe('string');
    }
    expect(isVec3(OVERVIEW_CAMERA.position)).toBe(true);
    expect(isVec3(OVERVIEW_CAMERA.target)).toBe(true);
  });

  it('gives every island a positive framing box for responsive zoom', () => {
    for (const isl of islands) {
      expect(isl.frame.width).toBeGreaterThan(0);
      expect(isl.frame.height).toBeGreaterThan(0);
    }
  });

  it('maps islands to real portfolio sections', () => {
    const anchors = ['intro', 'projects', 'skills', 'education', 'experience', 'contact'];
    for (const isl of islands) {
      expect(anchors).toContain(isl.sectionId);
    }
  });

  it('staggers islands across elevations and depths', () => {
    const ys = new Set(islands.map((i) => i.position[1]));
    const zs = new Set(islands.map((i) => i.position[2]));
    expect(ys.size).toBeGreaterThan(2);
    expect(zs.size).toBeGreaterThan(2);
  });
});

describe('projects', () => {
  it('exposes the two verified flagships with problem/solution/links', () => {
    expect(flagships.map((m) => m.id).sort()).toEqual(['hostelresolve', 'hostmate']);
    for (const m of flagships) {
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

describe('skills + journey', () => {
  it('lists skills without proficiency claims', () => {
    expect(skills.length).toBeGreaterThan(10);
    for (const s of skills) {
      expect(`${s.name} ${s.description} ${s.category}`).not.toMatch(/%/);
    }
  });

  it('groups every skill into an interactive 3D node exactly once', () => {
    const grouped = skillNodes.flatMap((n) => n.skillIds);
    const ids = skills.map((s) => s.id);
    for (const id of ids) expect(grouped).toContain(id);
    expect(new Set(grouped).size).toBe(grouped.length);
  });

  it('covers all three verified experience entries, most-recent-first, without invented metrics', () => {
    expect(experience.map((e) => e.id)).toEqual(['ai-intern-kv', 'aws-trainee-medicaps', 'mern-medicaps']);
    const blob = JSON.stringify(experience);
    expect(blob).not.toMatch(/40%/);
  });

  it('keeps education editable in its own data file', () => {
    expect(education.length).toBeGreaterThanOrEqual(3);
    for (const e of education) {
      expect(e.period.length).toBeGreaterThan(3);
      expect(e.detail.length).toBeGreaterThan(10);
    }
  });
});
