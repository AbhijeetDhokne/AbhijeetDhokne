// Procedural floating island: grass-topped rock disc, tapered stone underside,
// orbiting shards, instanced pines, accent crystals, and a glowing rim ring.
// All geometry is generated from a seed — no external models required, so the
// app runs identically with or without the Blender asset pipeline.

import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { mulberry32, hashSeed } from './rng';

interface FloatingIslandProps {
  position: [number, number, number];
  radius?: number;
  accent?: string;
  seed?: string;
  /** Freeze bobbing (reduced-motion mode). */
  still?: boolean;
  selected?: boolean;
  hovered?: boolean;
  onSelect?: () => void;
  onHover?: (h: boolean) => void;
  children?: React.ReactNode;
}

const ROCK = '#2b3b4d';
const ROCK_DARK = '#1b2634';
const GRASS = '#2a5f4e';
const GRASS_LIGHT = '#3f8a6c';
const TRUNK = '#4a3a2e';

const Pines = ({ radius, seed, count = 14 }: { radius: number; seed: string; count?: number }) => {
  const rand = useMemo(() => mulberry32(hashSeed(seed)), [seed]);
  const placements = useMemo(
    () =>
      Array.from({ length: count }, () => {
        const a = rand() * Math.PI * 2;
        const r = radius * (0.35 + rand() * 0.52);
        const s = 0.7 + rand() * 0.7;
        return { x: Math.cos(a) * r, z: Math.sin(a) * r, s, lean: (rand() - 0.5) * 0.14 };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [radius, seed],
  );
  return (
    <group>
      {placements.map((p, i) => (
        <group key={i} position={[p.x, 0.8, p.z]} scale={p.s} rotation={[0, (i * 2.4) % 6.28, p.lean]}>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.09, 0.14, 0.9, 5]} />
            <meshStandardMaterial color={TRUNK} roughness={0.95} />
          </mesh>
          <mesh position={[0, 1.25, 0]}>
            <coneGeometry args={[0.65, 1.5, 6]} />
            <meshStandardMaterial color={i % 3 === 0 ? GRASS_LIGHT : GRASS} roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, 2.05, 0]}>
            <coneGeometry args={[0.42, 1.0, 6]} />
            <meshStandardMaterial color={GRASS_LIGHT} roughness={0.9} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
};

const Shards = ({ radius, seed, accent }: { radius: number; seed: string; accent: string }) => {
  const rand = useMemo(() => mulberry32(hashSeed(seed + ':shards')), [seed]);
  const rocks = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => ({
        angle: rand() * Math.PI * 2,
        dist: radius * (1.25 + rand() * 0.5),
        y: -1 - rand() * 3,
        s: 0.25 + rand() * 0.55,
        speed: 0.05 + rand() * 0.08,
        glow: i % 3 === 0,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [radius, seed],
  );
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    const t = clock.elapsedTime;
    g.children.forEach((child, i) => {
      const r = rocks[i];
      child.position.set(
        Math.cos(r.angle + t * r.speed) * r.dist,
        r.y + Math.sin(t * 0.5 + i * 1.7) * 0.35,
        Math.sin(r.angle + t * r.speed) * r.dist,
      );
      child.rotation.y = t * r.speed * 2 + i;
    });
  });
  return (
    <group ref={group}>
      {rocks.map((r, i) => (
        <mesh key={i} scale={r.s}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color={r.glow ? accent : ROCK}
            emissive={r.glow ? accent : '#000000'}
            emissiveIntensity={r.glow ? 1.4 : 0}
            roughness={0.6}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
};

const CrystalCluster = ({ accent, seed }: { accent: string; seed: string }) => {
  const rand = useMemo(() => mulberry32(hashSeed(seed + ':crystal')), [seed]);
  const crystals = useMemo(
    () =>
      Array.from({ length: 4 }, () => ({
        x: (rand() - 0.5) * 3,
        z: (rand() - 0.5) * 3,
        h: 0.8 + rand() * 1.6,
        tilt: (rand() - 0.5) * 0.5,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed],
  );
  return (
    <group>
      {crystals.map((c, i) => (
        <mesh
          key={i}
          position={[c.x, 0.8 + c.h / 2, c.z]}
          rotation={[c.tilt, i * 1.3, c.tilt * 0.7]}
          scale={[1, c.h, 1]}
        >
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={1.1}
            roughness={0.25}
            metalness={0.1}
            transparent
            opacity={0.92}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
};

const FloatingIsland = ({
  position,
  radius = 8,
  accent = '#7adeff',
  seed = 'island',
  still = false,
  selected = false,
  onSelect,
  onHover,
  children,
}: FloatingIslandProps) => {
  const root = useRef<THREE.Group>(null);
  const rim = useRef<THREE.MeshStandardMaterial>(null);
  const [phase] = useState(() => mulberry32(hashSeed(seed))() * Math.PI * 2);
  const [hover, setHover] = useState(false);

  useFrame(({ clock }) => {
    const g = root.current;
    if (!g) return;
    if (!still) {
      const t = clock.elapsedTime;
      g.position.y = position[1] + Math.sin(t * 0.35 + phase) * 0.45;
    } else {
      g.position.y = position[1];
    }
    if (rim.current) {
      const target = selected ? 2.4 : hover ? 1.6 : 0.85;
      rim.current.emissiveIntensity += (target - rim.current.emissiveIntensity) * 0.08;
    }
  });

  return (
    <group position={[position[0], position[1], position[2]]}>
      <group
        ref={root}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          onHover?.(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHover(false);
          onHover?.(false);
          document.body.style.cursor = 'auto';
        }}
      >
        {/* Grass cap */}
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[radius, radius * 0.92, 1.1, 24]} />
          <meshStandardMaterial color={GRASS} roughness={0.95} flatShading />
        </mesh>
        {/* Pale meadow patches */}
        <mesh position={[0, 1.36, 0]}>
          <cylinderGeometry args={[radius * 0.96, radius * 0.96, 0.06, 24]} />
          <meshStandardMaterial color={GRASS_LIGHT} roughness={1} transparent opacity={0.35} />
        </mesh>
        {/* Tapered rock underside */}
        <mesh position={[0, -2.4, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[radius * 0.92, 6.5, 9, 3]} />
          <meshStandardMaterial color={ROCK} roughness={1} flatShading />
        </mesh>
        <mesh position={[0, -5.2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[radius * 0.34, 2.6, 7]} />
          <meshStandardMaterial color={ROCK_DARK} roughness={1} flatShading />
        </mesh>
        {/* Under-glow crystal tip */}
        <mesh position={[0, -6.4, 0]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2.2} roughness={0.3} />
        </mesh>
        {/* Glowing rim ring */}
        <mesh position={[0, 1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 0.99, 0.07, 8, 64]} />
          <meshStandardMaterial
            ref={rim}
            color={accent}
            emissive={accent}
            emissiveIntensity={0.85}
            roughness={0.4}
          />
        </mesh>
        {/* Invisible generous hit-disc for easy tapping on mobile */}
        <mesh position={[0, 1, 0]} visible={false}>
          <cylinderGeometry args={[radius * 1.15, radius * 1.15, 3, 12]} />
        </mesh>

        <Pines radius={radius} seed={seed} count={Math.round(radius * 1.6)} />
        <CrystalCluster accent={accent} seed={seed} />
        <Shards radius={radius} seed={seed} accent={accent} />

        {children}
      </group>
    </group>
  );
};

export default FloatingIsland;
