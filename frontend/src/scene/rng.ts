// Deterministic PRNG + scatter placement shared by instanced nature.
// Pure functions — covered by unit tests.

export const mulberry32 = (seed: number): (() => number) => {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export interface ScatterPoint {
  x: number;
  z: number;
  s: number;
  rot: number;
}

export const scatter = (
  seed: number,
  count: number,
  cx: number,
  cz: number,
  rMin: number,
  rMax: number,
  avoid: Array<[number, number, number]> = [],
): ScatterPoint[] => {
  const rand = mulberry32(seed);
  const pts: ScatterPoint[] = [];
  let guard = 0;
  while (pts.length < count && guard < count * 40) {
    guard += 1;
    const a = rand() * Math.PI * 2;
    const r = rMin + rand() * (rMax - rMin);
    const x = cx + Math.cos(a) * r;
    const z = cz + Math.sin(a) * r;
    if (avoid.some(([ax, az, ar]) => (x - ax) ** 2 + (z - az) ** 2 < ar * ar)) continue;
    pts.push({ x, z, s: 0.7 + rand() * 0.9, rot: rand() * Math.PI * 2 });
  }
  return pts;
};
