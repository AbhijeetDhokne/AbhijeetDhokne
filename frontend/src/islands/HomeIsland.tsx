// Island A — Home. Central starting island with an origin beacon:
// arrival dais, lantern posts, and a slow-turning holographic core.

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import FloatingIsland from '../world/FloatingIsland';
import { BeaconLabel } from './parts';
import { islandById } from '../data/navigation';
import { useIslands } from '../state/useIslands';
import { useReducedMotion } from '../hooks/device';

const HoloCore = ({ still }: { still: boolean }) => {
  const spin = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!spin.current || still) return;
    spin.current.rotation.y = clock.elapsedTime * 0.4;
  });
  return (
    <group position={[0, 1.4, -1.5]}>
      {/* dais */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[2.2, 2.6, 0.7, 8]} />
        <meshStandardMaterial color="#22344a" roughness={0.85} flatShading />
      </mesh>
      <group ref={spin}>
        <mesh position={[0, 2.6, 0]}>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial color="#7adeff" emissive="#7adeff" emissiveIntensity={0.9} wireframe transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 2.6, 0]}>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshStandardMaterial color="#dff3ff" emissive="#9fe4ff" emissiveIntensity={1.6} roughness={0.3} flatShading />
        </mesh>
        <mesh position={[0, 2.6, 0]} rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.7, 0.05, 8, 48]} />
          <meshStandardMaterial color="#7adeff" emissive="#7adeff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, 2.6, 0]} rotation={[Math.PI / 1.8, 0.6, 0]}>
          <torusGeometry args={[2.1, 0.04, 8, 48]} />
          <meshStandardMaterial color="#b9c2ff" emissive="#b9c2ff" emissiveIntensity={1.6} transparent opacity={0.8} />
        </mesh>
      </group>
      {/* light column */}
      <mesh position={[0, 2.4, 0]}>
        <cylinderGeometry args={[0.5, 0.9, 3.4, 12, 1, true]} />
        <meshBasicMaterial color="#7adeff" transparent opacity={0.14} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
};

const LanternPosts = ({ accent }: { accent: string }) => (
  <group>
    {[
      [4.6, 3.4],
      [-4.6, 3.4],
      [4.6, -4.2],
      [-4.6, -4.2],
    ].map(([x, z], i) => (
      <group key={i} position={[x, 1.4, z]}>
        <mesh position={[0, 0.9, 0]}>
          <cylinderGeometry args={[0.09, 0.13, 1.8, 6]} />
          <meshStandardMaterial color="#1d2c3d" roughness={0.9} />
        </mesh>
        <mesh position={[0, 1.95, 0]}>
          <sphereGeometry args={[0.24, 12, 12]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={2.6} />
        </mesh>
        <pointLight position={[0, 2, 0]} intensity={6} distance={9} color={accent} decay={2} />
      </group>
    ))}
  </group>
);

const HomeIsland = () => {
  const def = islandById('home');
  const { current, requestTravel } = useIslands();
  const reduced = useReducedMotion();
  return (
    <FloatingIsland
      position={def.position}
      radius={def.radius}
      accent={def.accent}
      seed="home"
      still={reduced}
      selected={current === 'home'}
      onSelect={() => requestTravel('home')}
    >
      <HoloCore still={reduced} />
      <LanternPosts accent={def.accent} />
      <BeaconLabel dest="home" title="Home" tagline={def.tagline} active={current === 'home'} y={8} />
    </FloatingIsland>
  );
};

export default HomeIsland;
