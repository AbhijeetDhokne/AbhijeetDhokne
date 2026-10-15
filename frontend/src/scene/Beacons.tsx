// DEVSLAYER beacons — floating destination markers.
// Clicking travels; the drei Html label is a real keyboard-focusable button,
// so every landmark has an accessible equivalent by construction.

import { useRef, type CSSProperties } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { destinations } from '../data/destinations';
import type { Destination } from '../data/types';
import { useGame } from '../state/useGame';
import { useReducedMotion } from '../hooks/device';

// Labels fade out beyond ~48 units so distant destinations don't clutter
// the frame. Direct DOM writes — no react re-renders in the loop.
const LABEL_FADE_START = 34;
const LABEL_FADE_END = 50;

const Beacon = ({ dest }: { dest: Destination }) => {
  const { requestTravel, current } = useGame();
  const reduced = useReducedMotion();
  const camera = useThree((s) => s.camera);
  const marker = useRef<THREE.Mesh>(null);
  const label = useRef<HTMLButtonElement>(null);
  const [x, y, z] = dest.beacon ?? dest.position;
  const active = current === dest.id;
  const anchor = useRef(new THREE.Vector3(x, y + 7, z));

  useFrame(({ clock }) => {
    if (marker.current && !reduced) {
      marker.current.position.y = y + 7 + Math.sin(clock.elapsedTime * 1.4 + x) * 0.5;
      marker.current.rotation.y = clock.elapsedTime * 0.8;
    }
    if (label.current) {
      const d = camera.position.distanceTo(anchor.current);
      const t = Math.min(1, Math.max(0, (d - LABEL_FADE_START) / (LABEL_FADE_END - LABEL_FADE_START)));
      label.current.style.opacity = String(1 - t);
      label.current.style.visibility = t >= 1 ? 'hidden' : 'visible';
    }
  });

  return (
    <group>
      <mesh position={[x, y + 3.4, z]}>
        <cylinderGeometry args={[0.18, 0.3, 6.8, 5]} />
        <meshStandardMaterial
          color={dest.accent}
          emissive={dest.accent}
          emissiveIntensity={active ? 2 : 1.2}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh
        ref={marker}
        position={[x, y + 7, z]}
        onClick={(e) => { e.stopPropagation(); requestTravel(dest.id); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <octahedronGeometry args={[active ? 1 : 0.8, 0]} />
        <meshStandardMaterial color={dest.accent} emissive={dest.accent} emissiveIntensity={1.8} />
      </mesh>
      <Html position={[x, y + 8.6, z]} center distanceFactor={40}>
        <button
          ref={label}
          type="button"
          onClick={() => requestTravel(dest.id)}
          aria-label={`Travel to ${dest.arc}`}
          className="beacon-label"
          style={{ '--accent': dest.accent } as CSSProperties}
        >
          {dest.label}
        </button>
      </Html>
    </group>
  );
};

const Beacons = () => (
  <group>
    {destinations.map((d) => (
      <Beacon key={d.id} dest={d} />
    ))}
  </group>
);

export default Beacons;
