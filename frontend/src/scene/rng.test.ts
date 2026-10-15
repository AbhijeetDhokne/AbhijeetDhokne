import { describe, expect, it } from 'vitest';
import { mulberry32, scatter } from './rng';

describe('mulberry32', () => {
  it('is deterministic per seed', () => {
    const a = mulberry32(11);
    const b = mulberry32(11);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it('differs across seeds', () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });
});

describe('scatter', () => {
  it('returns the requested count inside the annulus', () => {
    const pts = scatter(11, 26, 0, 24, 8, 17, []);
    expect(pts).toHaveLength(26);
    for (const p of pts) {
      const r = Math.hypot(p.x - 0, p.z - 24);
      expect(r).toBeGreaterThanOrEqual(7.9);
      expect(r).toBeLessThanOrEqual(17.1);
    }
  });

  it('respects avoidance zones', () => {
    const pts = scatter(11, 26, 0, 24, 8, 17, [[10, 24, 5]]);
    expect(pts).toHaveLength(26);
    for (const p of pts) {
      expect(Math.hypot(p.x - 10, p.z - 24)).toBeGreaterThanOrEqual(5);
    }
  });
});
