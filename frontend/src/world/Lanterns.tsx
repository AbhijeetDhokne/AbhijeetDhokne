// Floating lanterns: cozy glowing paper lanterns rising slowly between the
// islands, swaying as they climb, looping forever. Warm gold with cyan accents.

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { mulberry32 } from './rng';

const COUNT = 9;

interface Lantern {
  x: number;
  z: number;
  y0: number;
  rise: number;
  sway: number;
  phase: number;
  s: number;
  color: string;
}

const Lanterns = ({ still = false }: { still?: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const lanterns = useMemo<Lantern[]>(() => {
    const rand = mulberry32(424242);
    return Array.from({ length: COUNT }, (_, i) => ({
      x: (rand() - 0.5) * 64,
      z: -48 + rand() * 56,
      y0: -6 + rand() * 28,
      rise: 0.35 + rand() * 0.3,
      sway: 0.6 + rand() * 0.8,
      phase: rand() * Math.PI * 2,
      s: 0.7 + rand() * 0.7,
      color: i % 4 === 3 ? '#7adeff' : i % 4 === 1 ? '#d9b8ff' : '#ffd9a0',
    }));
  }, []);

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g || still) return;
    const t = clock.elapsedTime;
    g.children.forEach((child, i) => {
      const l = lanterns[i];
      const y = -6 + (((l.y0 + 6 + t * l.rise) % 34) + 34) % 34;
      child.position.set(l.x + Math.sin(t * 0.3 + l.phase) * l.sway, y, l.z);
    });
  });

  return (
    <group ref={group}>
      {lanterns.map((l, i) => (
        <group key={i} position={[l.x, l.y0, l.z]} scale={l.s}>
          <mesh>
            <sphereGeometry args={[0.42, 14, 12]} />
            <meshStandardMaterial
              color={l.color}
              emissive={l.color}
              emissiveIntensity={2.1}
              roughness={0.5}
              transparent
              opacity={0.95}
            />
          </mesh>
          <mesh position={[0, 0.42, 0]} scale={[1, 0.5, 1]}>
            <cylinderGeometry args={[0.16, 0.2, 0.18, 8]} />
            <meshStandardMaterial color="#3a2c1c" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default Lanterns;
