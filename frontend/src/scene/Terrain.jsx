// DEVSLAYER Phase 2 — terrain: island base, destination platforms,
// stone wayfinding path, river, stairs, distant mountains.
// All procedural low-poly primitives; no textures, no external assets.

import { useMemo } from 'react';

const STONE = '#8A8D91';
const STONE_DARK = '#5B6066';
const PATH = '#C9BFA8';

// Waypoints for the stone path: origins -> plaza -> bridge -> trials -> stairs.
const PATH_POINTS = [
  [0, 0.06, 21], [0, 0.06, 17], [0, 0.06, 13], [0, 0.06, 9],
  [-4, 0.06, 8], [-8, 0.06, 7], [-12, 0.06, 6], [-16, 0.06, 5.5], [-20, 0.06, 5],
  [4, 0.06, 8], [8, 0.06, 7], [12, 0.06, 6], [16, 0.06, 5.5], [20, 0.06, 5],
  [0, 0.06, 5], [0, 0.06, 1], [0, 0.06, -3], [0, 0.06, -6],
  [0, 0.06, -10], [0, 0.06, -13],
];

const PLATFORMS = [
  { pos: [0, -0.05, 24], r: 11, color: '#2E564F' }, // origins clearing
  { pos: [-27, -0.05, 5], r: 10, color: '#4A5A5E' }, // training stone
  { pos: [27, -0.05, 5], r: 10, color: '#5A4E3E' }, // missions warm earth
  { pos: [0, -0.05, -17], r: 10, color: '#3A4256' }, // trials slate
];

const MOUNTAINS = [
  { pos: [-55, 0, -55], h: 34, r: 20 },
  { pos: [0, 0, -70], h: 42, r: 24 },
  { pos: [55, 0, -55], h: 30, r: 18 },
  { pos: [-70, 0, 10], h: 26, r: 16 },
  { pos: [70, 0, 10], h: 28, r: 17 },
  { pos: [-45, 0, 55], h: 22, r: 15 },
  { pos: [45, 0, 55], h: 24, r: 15 },
];

const STAIRS = [0, 1, 2, 3, 4, 5].map((i) => ({
  pos: [0, 1.1 + i * 1.35, -22.5 - i * 2.4],
  size: [7 - i * 0.5, 0.7, 2.2],
}));

const Mountain = ({ pos, h, r }) => (
  <group position={pos}>
    <mesh position={[0, h / 2 - 0.5, 0]}>
      <coneGeometry args={[r, h, 6]} />
      <meshStandardMaterial color="#3B4A63" roughness={1} flatShading />
    </mesh>
    <mesh position={[0, h - h * 0.14, 0]}>
      <coneGeometry args={[r * 0.28, h * 0.28, 6]} />
      <meshStandardMaterial color="#DCE5EB" roughness={1} flatShading />
    </mesh>
  </group>
);

const Terrain = () => {
  const stones = useMemo(
    () =>
      PATH_POINTS.map(([x, y, z], i) => ({
        key: `stone-${i}`,
        pos: [x + (i % 2 === 0 ? 0.5 : -0.5), y, z],
        rot: (i * 0.7) % Math.PI,
        s: 1.5 + ((i * 37) % 10) / 22,
      })),
    [],
  );

  return (
    <group>
      {/* Island base */}
      <mesh position={[0, -0.6, -4]} receiveShadow={false}>
        <cylinderGeometry args={[72, 60, 3, 24]} />
        <meshStandardMaterial color="#284B46" roughness={1} flatShading />
      </mesh>
      {/* Sea / void skirt */}
      <mesh position={[0, -2.4, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[500, 500]} />
        <meshBasicMaterial color="#10141B" />
      </mesh>

      {PLATFORMS.map((p) => (
        <mesh key={p.pos.join(',')} position={p.pos}>
          <cylinderGeometry args={[p.r, p.r + 1.5, 0.5, 18]} />
          <meshStandardMaterial color={p.color} roughness={1} flatShading />
        </mesh>
      ))}

      {/* Stone wayfinding path */}
      {stones.map((s) => (
        <mesh key={s.key} position={s.pos} rotation={[0, s.rot, 0]}>
          <cylinderGeometry args={[s.s, s.s * 1.1, 0.22, 7]} />
          <meshStandardMaterial color={PATH} roughness={1} flatShading />
        </mesh>
      ))}

      {/* River under the trials bridge */}
      <mesh position={[0, 0.02, -6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[46, 4.5, 1, 1]} />
        <meshStandardMaterial color="#3E7CB1" roughness={0.35} metalness={0.1} transparent opacity={0.9} />
      </mesh>
      {[-23, -14, 14, 23].map((x) => (
        <mesh key={`bank-${x}`} position={[x, 0.1, -6]}>
          <dodecahedronGeometry args={[1.4, 0]} />
          <meshStandardMaterial color={STONE_DARK} roughness={1} flatShading />
        </mesh>
      ))}

      {/* Summit plateau above the clouds */}
      <mesh position={[0, 8.2, -38]}>
        <cylinderGeometry args={[12, 9, 2.4, 7]} />
        <meshStandardMaterial color="#6B6F7A" roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 9.5, -38]}>
        <cylinderGeometry args={[10.5, 10.5, 0.4, 7]} />
        <meshStandardMaterial color={STONE} roughness={1} flatShading />
      </mesh>

      {/* Stairs: trials -> summit */}
      {STAIRS.map((s, i) => (
        <mesh key={`stair-${i}`} position={s.pos}>
          <boxGeometry args={s.size} />
          <meshStandardMaterial color={i % 2 ? STONE : STONE_DARK} roughness={1} flatShading />
        </mesh>
      ))}

      {/* Distant mountain ring */}
      {MOUNTAINS.map((m) => (
        <Mountain key={m.pos.join(',')} pos={m.pos} h={m.h} r={m.r} />
      ))}
    </group>
  );
};

export default Terrain;
