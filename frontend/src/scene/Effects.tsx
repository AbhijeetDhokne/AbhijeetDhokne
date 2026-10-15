// DEVSLAYER atmosphere — stars, fireflies, drifting clouds, mist,
// sunrise glow. Motion halts under prefers-reduced-motion.

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useReducedMotion } from '../hooks/device';
import { mulberry32 } from './rng';

const makePoints = (seed: number, count: number, area: {
  x: [number, number]; y: [number, number]; z: [number, number];
}): THREE.BufferGeometry => {
  const rand = mulberry32(seed);
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    arr[i * 3] = area.x[0] + rand() * (area.x[1] - area.x[0]);
    arr[i * 3 + 1] = area.y[0] + rand() * (area.y[1] - area.y[0]);
    arr[i * 3 + 2] = area.z[0] + rand() * (area.z[1] - area.z[0]);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  return geo;
};

const Fireflies = () => {
  const reduced = useReducedMotion();
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => makePoints(7, 90, { x: [-32, 32], y: [0.8, 5], z: [-20, 28] }), []);
  useFrame(({ clock }) => {
    if (ref.current && !reduced) {
      ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.05) * 0.08;
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.25;
    }
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#E6B566" size={0.32} sizeAttenuation transparent opacity={0.9} depthWrite={false} />
    </points>
  );
};

const Stars = () => {
  const geo = useMemo(() => makePoints(21, 220, { x: [-160, 160], y: [30, 120], z: [-180, -40] }), []);
  return (
    <points geometry={geo}>
      <pointsMaterial color="#DCE5EB" size={0.7} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
    </points>
  );
};

const Cloud = ({ position, scale = 1, speed = 0.3, opacity = 0.85 }: {
  position: [number, number, number]; scale?: number; speed?: number; opacity?: number;
}) => {
  const reduced = useReducedMotion();
  const ref = useRef<THREE.Group>(null);
  const seed = position[0] + position[2];
  useFrame((_, delta) => {
    if (ref.current && !reduced) {
      const clamped = Math.min(delta, 0.05);
      ref.current.position.x += clamped * speed;
      if (ref.current.position.x > 60) ref.current.position.x = -60;
    }
  });
  return (
    <group ref={ref} position={position} scale={scale}>
      {[
        [0, 0, 0, 3.2], [3, -0.4, 0.5, 2.4], [-3, -0.4, -0.5, 2.6], [0.5, 0.9, -0.5, 2.1],
      ].map(([x, y, z, r], i) => (
        <mesh key={`${seed}-${i}`} position={[x, y, z]} scale={[1.4, 0.55, 1]}>
          <sphereGeometry args={[r, 7, 6]} />
          <meshStandardMaterial color="#E8EDF2" roughness={1} flatShading transparent opacity={opacity} />
        </mesh>
      ))}
    </group>
  );
};

const Mist = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
  const reduced = useReducedMotion();
  const ref = useRef<THREE.Mesh>(null);
  const seed = position[0] * 3 + position[2];
  useFrame(({ clock }) => {
    if (ref.current && !reduced) {
      ref.current.position.x = position[0] + Math.sin(clock.elapsedTime * 0.12 + seed) * 2;
    }
  });
  return (
    <mesh ref={ref} position={position} scale={scale} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[26, 12]} />
      <meshBasicMaterial color="#B8C2CC" transparent opacity={0.1} depthWrite={false} />
    </mesh>
  );
};

const Effects = () => (
  <group>
    <Stars />
    <Fireflies />
    <mesh position={[0, 16, -75]}>
      <circleGeometry args={[16, 24]} />
      <meshBasicMaterial color="#F4D47C" transparent opacity={0.55} fog={false} />
    </mesh>
    <mesh position={[0, 12, -74]}>
      <circleGeometry args={[26, 24]} />
      <meshBasicMaterial color="#C98F9A" transparent opacity={0.22} fog={false} />
    </mesh>
    <Cloud position={[-25, 5, -40]} scale={1.6} speed={0.4} />
    <Cloud position={[20, 6, -45]} scale={2} speed={0.25} />
    <Cloud position={[0, 4, -30]} scale={1.3} speed={0.5} opacity={0.7} />
    <Cloud position={[-40, 7, -20]} scale={1.1} speed={0.3} opacity={0.6} />
    <Mist position={[0, 1.5, -17]} />
    <Mist position={[0, 1.2, 24]} scale={0.8} />
  </group>
);

export default Effects;
