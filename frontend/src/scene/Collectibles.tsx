// DEVSLAYER collectibles — five hidden technique scrolls.
// Optional flavor only: collecting changes nothing but the HUD counter.
// Persisted in localStorage; never gates content.

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { collectibles } from '../data/destinations';
import { useGame } from '../state/useGame';
import { useReducedMotion } from '../hooks/device';

const Scroll = ({ id, position, color }: {
  id: string; position: [number, number, number]; color: string;
}) => {
  const { collected, collect } = useGame();
  const reduced = useReducedMotion();
  const ref = useRef<THREE.Mesh>(null);
  const taken = collected.includes(id);

  useFrame(({ clock }) => {
    if (ref.current && !reduced && !taken) {
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 2 + position[0]) * 0.3;
      ref.current.rotation.y = clock.elapsedTime * 1.2;
    }
  });

  if (taken) return null;

  return (
    <mesh
      ref={ref}
      position={position}
      onClick={(e) => { e.stopPropagation(); collect(id); }}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      <octahedronGeometry args={[0.45, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.2} />
    </mesh>
  );
};

const Collectibles = () => (
  <group>
    {collectibles.map((c) => (
      <Scroll key={c.id} id={c.id} position={c.position} color={c.color} />
    ))}
  </group>
);

export default Collectibles;
