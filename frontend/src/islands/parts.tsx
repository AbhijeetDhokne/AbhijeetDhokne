// Shared set-dressing for the five islands: accessible beacon labels,
// glowing selection markers, and small architectural primitives.
// Labels are real HTML buttons so every destination stays keyboard-reachable.

import { Html } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useIslands } from '../state/useIslands';
import type { IslandDestination } from '../data/types';

export const BeaconLabel = ({
  dest,
  title,
  tagline,
  active,
  y = 6.5,
}: {
  dest: IslandDestination;
  title: string;
  tagline: string;
  active: boolean;
  y?: number;
}) => {
  const { requestTravel } = useIslands();
  return (
    <Html position={[0, y, 0]} center distanceFactor={28} zIndexRange={[20, 0]}>
      <button
        type="button"
        onClick={() => requestTravel(dest)}
        aria-current={active ? 'location' : undefined}
        className={`island-beacon${active ? ' is-active' : ''}`}
      >
        <span className="island-beacon-title">{title}</span>
        <span className="island-beacon-tag">{tagline}</span>
      </button>
    </Html>
  );
};

/** Slow-spinning glow gem marking an interactive structure. */
export const GlowGem = ({
  position,
  color,
  size = 0.45,
  still = false,
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  still?: boolean;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const m = ref.current;
    if (!m || still) return;
    m.rotation.y = clock.elapsedTime * 1.2;
    m.position.y = position[1] + Math.sin(clock.elapsedTime * 1.6) * 0.15;
  });
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.4} roughness={0.25} flatShading />
    </mesh>
  );
};

/** Pulsing ground ring marking the selected structure. */
export const SelectionRing = ({ position, color, radius = 1.6 }: { position: [number, number, number]; color: string; radius?: number }) => {
  const ref = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.emissiveIntensity = 1.6 + Math.sin(clock.elapsedTime * 3) * 0.7;
  });
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.18, radius, 40]} />
      <meshStandardMaterial
        ref={ref}
        color={color}
        emissive={color}
        emissiveIntensity={1.6}
        transparent
        opacity={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

interface ClickableProps {
  position: [number, number, number];
  onPick: () => void;
  label: string;
  children: React.ReactNode;
}

/** Invisible generous hit-volume + focusable behaviour for 3D structures. */
export const Clickable = ({ position, onPick, label, children }: ClickableProps) => (
  <group position={position}>
    {children}
    <mesh
      visible={false}
      onClick={(e) => {
        e.stopPropagation();
        onPick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
      aria-label={label}
    >
      <sphereGeometry args={[2.2, 8, 8]} />
    </mesh>
  </group>
);

export const HallBase = ({ color = '#16222f' }: { color?: string }) => (
  <group>
    <mesh position={[0, 2, 0]}>
      <boxGeometry args={[3.4, 2.4, 3.4]} />
      <meshStandardMaterial color={color} roughness={0.85} flatShading />
    </mesh>
    <mesh position={[0, 3.7, 0]} rotation={[0, Math.PI / 4, 0]}>
      <coneGeometry args={[2.9, 1.6, 4]} />
      <meshStandardMaterial color="#22344a" roughness={0.8} flatShading />
    </mesh>
  </group>
);
