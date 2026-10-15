// DEVSLAYER Phase 2 — nature: low-poly trees, rocks, stone lanterns.
// Deterministic seeded placement (stable across renders, no hydration noise).

import { useMemo } from 'react';

// mulberry32 — tiny deterministic PRNG so the forest never reshuffles.
const rng = (seed) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const scatter = (seed, count, cx, cz, rMin, rMax, avoid = []) => {
  const rand = rng(seed);
  const pts = [];
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

export const Tree = ({ position, scale = 1, foliage = '#2F6B4F', trunk = '#5A4632' }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.9, 0]}>
      <cylinderGeometry args={[0.22, 0.32, 1.8, 5]} />
      <meshStandardMaterial color={trunk} roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 2.4, 0]}>
      <coneGeometry args={[1.5, 2.6, 6]} />
      <meshStandardMaterial color={foliage} roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 3.7, 0]}>
      <coneGeometry args={[1.0, 1.8, 6]} />
      <meshStandardMaterial color={foliage} roughness={1} flatShading />
    </mesh>
  </group>
);

export const Rock = ({ position, scale = 1, color = '#6E7480' }) => (
  <mesh position={position} scale={scale}>
    <dodecahedronGeometry args={[1, 0]} />
    <meshStandardMaterial color={color} roughness={1} flatShading />
  </mesh>
);

export const Lantern = ({ position, glow = '#E6B566', scale = 1 }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, 0.5, 0]}>
      <cylinderGeometry args={[0.12, 0.16, 1, 5]} />
      <meshStandardMaterial color="#3A3F45" roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 1.25, 0]}>
      <boxGeometry args={[0.55, 0.6, 0.55]} />
      <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={1.6} />
    </mesh>
    <mesh position={[0, 1.7, 0]}>
      <coneGeometry args={[0.5, 0.35, 4]} />
      <meshStandardMaterial color="#3A3F45" roughness={1} flatShading />
    </mesh>
  </group>
);

const PATH_CLEAR = [
  [0, 14, 4], [0, 2, 4], [0, -6, 5], [0, -14, 4],
  [-14, 6, 5], [14, 6, 5], [-27, 5, 7], [27, 5, 7], [0, 24, 8],
];

const Nature = () => {
  const forests = useMemo(
    () => ({
      origins: scatter(11, 26, 0, 24, 8, 17, PATH_CLEAR),
      training: scatter(22, 14, -27, 5, 8, 15, [[-27, 5, 7], [-33, 2, 6]]),
      missions: scatter(33, 12, 27, 5, 8, 15, [[27, 5, 7]]),
      trials: scatter(44, 8, 0, -17, 8, 14, [[0, -14, 5], [0, -6, 5]]),
    }),
    [],
  );
  const rocks = useMemo(() => scatter(55, 16, 0, -8, 12, 30, PATH_CLEAR), []);
  const lanterns = useMemo(
    () => [
      [-3.4, 0, 20.5], [3.4, 0, 20.5], [-3.4, 0, 26.5], [3.4, 0, 26.5],
      [-24, 0, 9], [-30, 0, 9], [24, 0, 9], [30, 0, 9],
      [-3, 0, -10], [3, 0, -10], [-3, 0, -14], [3, 0, -14],
      [-5, 9.6, -34], [5, 9.6, -34], [0, 9.6, -43],
    ],
    [],
  );

  return (
    <group>
      {forests.origins.map((t, i) => (
        <group key={`o-${i}`} position={[t.x, 0, t.z]} rotation={[0, t.rot, 0]} scale={t.s}>
          <Tree position={[0, 0, 0]} />
        </group>
      ))}
      {forests.training.map((t, i) => (
        <group key={`t-${i}`} position={[t.x, 0, t.z]} rotation={[0, t.rot, 0]} scale={t.s}>
          <Tree position={[0, 0, 0]} foliage="#3E7D6B" />
        </group>
      ))}
      {forests.missions.map((t, i) => (
        <group key={`m-${i}`} position={[t.x, 0, t.z]} rotation={[0, t.rot, 0]} scale={t.s}>
          <Tree position={[0, 0, 0]} foliage="#C98F9A" trunk="#6B4A3A" />
        </group>
      ))}
      {forests.trials.map((t, i) => (
        <group key={`r-${i}`} position={[t.x, 0, t.z]} rotation={[0, t.rot, 0]} scale={t.s}>
          <Tree position={[0, 0, 0]} foliage="#2C3A55" trunk="#3A3F45" />
        </group>
      ))}
      {rocks.map((r, i) => (
        <Rock key={`rock-${i}`} position={[r.x, 0.2, r.z]} scale={r.s * 1.2} />
      ))}
      {lanterns.map((p, i) => (
        <Lantern
          key={`lan-${i}`}
          position={p}
          glow={(p[1] > 5 || i > 11) ? '#F4D47C' : '#E6B566'}
        />
      ))}
    </group>
  );
};

export default Nature;
