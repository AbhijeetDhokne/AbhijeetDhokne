// Island E — Contact. A standing signal portal: concentric glowing rings,
// a translucent event-horizon disc, and orbiting rune shards. Clicking the
// portal opens the contact panel with verified links.

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import FloatingIsland from '../world/FloatingIsland';
import { BeaconLabel, Clickable } from './parts';
import { islandById } from '../data/navigation';
import { useIslands } from '../state/useIslands';
import { useReducedMotion } from '../hooks/device';

const Portal = ({ accent, still }: { accent: string; still: boolean }) => {
  const rings = useRef<THREE.Group>(null);
  const disc = useRef<THREE.Mesh>(null);
  const secondary = '#c77dff';
  useFrame(({ clock }) => {
    if (still) return;
    const t = clock.elapsedTime;
    if (rings.current) rings.current.rotation.z = t * 0.3;
    if (disc.current) {
      const m = disc.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 1.4 + Math.sin(t * 2) * 0.5;
    }
  });
  return (
    <group position={[0, 1.4, -1]}>
      {/* plinth steps */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2.4, 2.9, 0.6, 8]} />
        <meshStandardMaterial color="#22344a" roughness={0.85} flatShading />
      </mesh>
      {[2.6, 3.1].map((r, i) => (
        <mesh key={r} position={[0, 1.2 + r, 0]}>
          <torusGeometry args={[r, i === 0 ? 0.16 : 0.08, 10, 64]} />
          <meshStandardMaterial
            color={i === 0 ? accent : secondary}
            emissive={i === 0 ? accent : secondary}
            emissiveIntensity={i === 0 ? 2.2 : 1.4}
            roughness={0.35}
          />
        </mesh>
      ))}
      <group ref={rings}>
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const orbColor = i % 2 === 0 ? accent : secondary;
          return (
            <mesh key={i} position={[Math.cos(a) * 2.6, 1.2 + 2.6 + Math.sin(a) * 2.6, 0.1]}>
              <sphereGeometry args={[0.14, 16, 16]} />
              <meshStandardMaterial
                color={orbColor}
                emissive={orbColor}
                emissiveIntensity={2}
                roughness={0.3}
                transparent
                opacity={0.95}
              />
            </mesh>
          );
        })}
      </group>
      {/* event horizon */}
      <mesh ref={disc} position={[0, 1.2 + 2.6, 0]}>
        <circleGeometry args={[2.3, 48]} />
        <meshStandardMaterial
          color="#0a1626"
          emissive={accent}
          emissiveIntensity={1.4}
          transparent
          opacity={0.85}
          side={THREE.DoubleSide}
        />
      </mesh>
      <pointLight position={[0, 4, 1]} intensity={40} distance={20} color={accent} decay={2} />
    </group>
  );
};

const ContactIsland = () => {
  const def = islandById('contact');
  const { current, requestTravel, select } = useIslands();
  const reduced = useReducedMotion();
  return (
    <FloatingIsland
      position={def.position}
      radius={def.radius}
      accent={def.accent}
      seed="contact"
      still={reduced}
      selected={current === 'contact'}
      onSelect={() => requestTravel('contact')}
    >
      <Clickable
        position={[0, 0, 0]}
        label="Open contact links"
        onPick={() => select({ type: 'contact' })}
      >
        <Portal accent={def.accent} still={reduced} />
      </Clickable>
      <BeaconLabel dest="contact" title="Contact" tagline={def.tagline} active={current === 'contact'} y={9} />
    </FloatingIsland>
  );
};

export default ContactIsland;
