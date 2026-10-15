import { describe, expect, it } from 'vitest';
import { mulberry32, hashSeed } from './rng';

describe('seeded rng', () => {
  it('produces deterministic sequences per seed', () => {
    const a = mulberry32(42);
    const b = mulberry32(42);
    expect(Array.from({ length: 8 }, () => a())).toEqual(Array.from({ length: 8 }, () => b()));
  });

  it('separates streams across seeds', () => {
    const a = mulberry32(hashSeed('home'));
    const b = mulberry32(hashSeed('projects'));
    expect(a()).not.toBe(b());
  });

  it('emits values in [0, 1)', () => {
    const rand = mulberry32(7);
    for (let i = 0; i < 50; i++) {
      const v = rand();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });
});
