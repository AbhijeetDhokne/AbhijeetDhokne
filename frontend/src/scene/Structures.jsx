// DEVSLAYER Phase 2 — structures: original anime-inspired landmarks.
// Procedural primitives only. No copied motifs, symbols, or branded assets.

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const WOOD = '#6B4A3A';
const WOOD_DARK = '#4A3428';
const PLASTER = '#E8E0CE';
const TILE = '#334155';
const TORII_RED = '#B3402E';

export const ToriiGate = ({ position, scale = 1, color = TORII_RED }) => (
  <group position={position} scale={scale}>
    <mesh position={[-2.2, 2.2, 0]}>
      <cylinderGeometry args={[0.28, 0.34, 4.4, 6]} />
      <meshStandardMaterial color={color} roughness={0.9} flatShading />
    </mesh>
    <mesh position={[2.2, 2.2, 0]}>
      <cylinderGeometry args={[0.28, 0.34, 4.4, 6]} />
      <meshStandardMaterial color={color} roughness={0.9} flatShading />
    </mesh>
    <mesh position={[0, 4.7, 0]}>
      <boxGeometry args={[6.4, 0.55, 0.9]} />
      <meshStandardMaterial color={color} roughness={0.9} flatShading />
    </mesh>
    <mesh position={[0, 3.9, 0]}>
      <boxGeometry args={[5.2, 0.35, 0.6]} />
      <meshStandardMaterial color={WOOD_DARK} roughness={1} flatShading />
    </mesh>
  </group>
);

const Roof = ({ position, size = [7, 1.6, 6], color = TILE }) => (
  <group position={position}>
    <mesh position={[0, 0.8, 0]}>
      <coneGeometry args={[Math.max(size[0], size[2]) * 0.72, size[1], 4]} />
      <meshStandardMaterial color={color} roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
      <boxGeometry args={[size[0], 0.35, size[2]]} />
      <meshStandardMaterial color={color} roughness={1} flatShading />
    </mesh>
  </group>
);

export const Dojo = ({ position }) => (
  <group position={position}>
    {/* raised stone base */}
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[10, 1, 8]} />
      <meshStandardMaterial color="#7A7F87" roughness={1} flatShading />
    </mesh>
    {/* hall */}
    <mesh position={[0, 2.6, 0]}>
      <boxGeometry args={[8, 3.2, 6]} />
      <meshStandardMaterial color={PLASTER} roughness={1} flatShading />
    </mesh>
    {/* warm windows */}
    {[-2.4, 0, 2.4].map((x) => (
      <mesh key={x} position={[x, 2.6, 3.05]}>
        <planeGeometry args={[1.4, 1.6]} />
        <meshStandardMaterial color="#E6B566" emissive="#E6B566" emissiveIntensity={0.9} />
      </mesh>
    ))}
    <Roof position={[0, 4.2, 0]} size={[10, 2, 8]} />
    {/* training posts */}
    {[-3.5, -1.2, 1.2, 3.5].map((x) => (
      <mesh key={x} position={[x + 8, 1, 2]}>
        <cylinderGeometry args={[0.18, 0.22, 2, 5]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={1} flatShading />
      </mesh>
    ))}
    {/* stepping stones */}
    {[-6, -3.5, -1, 1.5].map((x, i) => (
      <mesh key={x} position={[x, 0.15, 6.5]} rotation={[0, i * 0.5, 0]}>
        <cylinderGeometry args={[1, 1.1, 0.3, 6]} />
        <meshStandardMaterial color="#C9BFA8" roughness={1} flatShading />
      </mesh>
    ))}
  </group>
);

export const Waterfall = ({ position }) => {
  const veil = useRef();
  useFrame(({ clock }) => {
    if (veil.current) {
      veil.current.material.opacity = 0.55 + Math.sin(clock.elapsedTime * 2.2) * 0.12;
    }
  });
  return (
    <group position={position}>
      <mesh position={[0, 5, -1]}>
        <boxGeometry args={[7, 10, 3]} />
        <meshStandardMaterial color="#5B6066" roughness={1} flatShading />
      </mesh>
      <mesh position={[-1.5, 5, 0.6]} ref={veil}>
        <planeGeometry args={[2.4, 9]} />
        <meshStandardMaterial color="#9FD4E8" transparent opacity={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.3, 2.5]}>
        <cylinderGeometry args={[3, 3.6, 0.6, 10]} />
        <meshStandardMaterial color="#3E7CB1" transparent opacity={0.85} roughness={0.3} />
      </mesh>
    </group>
  );
};

export const House = ({ position, bodyColor = '#D9C9A8', signColor = '#E6B566', rotation = 0 }) => (
  <group position={position} rotation={[0, rotation, 0]}>
    <mesh position={[0, 1.6, 0]}>
      <boxGeometry args={[5.5, 3.2, 4.5]} />
      <meshStandardMaterial color={bodyColor} roughness={1} flatShading />
    </mesh>
    <Roof position={[0, 3.2, 0]} size={[7, 1.8, 6]} color={TILE} />
    {/* lit windows */}
    {[-1.4, 1.4].map((x) => (
      <mesh key={x} position={[x, 1.6, 2.28]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshStandardMaterial color={signColor} emissive={signColor} emissiveIntensity={1} />
      </mesh>
    ))}
    {/* signboard post */}
    <mesh position={[3.6, 1.1, 1.5]}>
      <cylinderGeometry args={[0.12, 0.12, 2.2, 5]} />
      <meshStandardMaterial color={WOOD_DARK} roughness={1} flatShading />
    </mesh>
    <mesh position={[3.6, 2, 1.5]}>
      <boxGeometry args={[1.6, 0.9, 0.15]} />
      <meshStandardMaterial color={WOOD} emissive={signColor} emissiveIntensity={0.25} roughness={1} />
    </mesh>
  </group>
);

export const Bridge = ({ position }) => (
  <group position={position}>
    {[-3.5, -2.1, -0.7, 0.7, 2.1, 3.5].map((x) => (
      <mesh key={x} position={[x, 0.55 + Math.cos((x / 7) * Math.PI) * 0.5, 0]}>
        <boxGeometry args={[1.3, 0.18, 3]} />
        <meshStandardMaterial color={TORII_RED} roughness={1} flatShading />
      </mesh>
    ))}
    {[-3.5, 3.5].map((x) =>
      [-1.3, 1.3].map((z) => (
        <mesh key={`${x}-${z}`} position={[x, 1.3, z]}>
          <cylinderGeometry args={[0.12, 0.12, 1.8, 5]} />
          <meshStandardMaterial color={WOOD_DARK} roughness={1} flatShading />
        </mesh>
      )),
    )}
    <mesh position={[0, 2.05, -1.3]} rotation={[0, 0, 0]}>
      <boxGeometry args={[8.4, 0.12, 0.12]} />
      <meshStandardMaterial color={WOOD_DARK} roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 2.05, 1.3]}>
      <boxGeometry args={[8.4, 0.12, 0.12]} />
      <meshStandardMaterial color={WOOD_DARK} roughness={1} flatShading />
    </mesh>
  </group>
);

export const TrialGate = ({ position, color = '#8A5A6B' }) => (
  <group position={position}>
    <mesh position={[-1.8, 1.8, 0]}>
      <boxGeometry args={[0.5, 3.6, 0.5]} />
      <meshStandardMaterial color={STONE_FALLBACK} roughness={1} flatShading />
    </mesh>
    <mesh position={[1.8, 1.8, 0]}>
      <boxGeometry args={[0.5, 3.6, 0.5]} />
      <meshStandardMaterial color={STONE_FALLBACK} roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 3.7, 0]}>
      <boxGeometry args={[4.6, 0.5, 0.7]} />
      <meshStandardMaterial color={color} roughness={1} flatShading />
    </mesh>
  </group>
);
const STONE_FALLBACK = '#6E7480';

export const SummitShrine = ({ position }) => (
  <group position={position}>
    <mesh position={[0, 1.2, 0]}>
      <boxGeometry args={[6, 2.4, 5]} />
      <meshStandardMaterial color={PLASTER} roughness={1} flatShading />
    </mesh>
    <Roof position={[0, 2.4, 0]} size={[8, 2, 7]} color="#8A5A3B" />
    {/* sunrise mirror pool */}
    <mesh position={[0, 0.15, 5.5]}>
      <cylinderGeometry args={[2.6, 2.6, 0.3, 12]} />
      <meshStandardMaterial color="#F4D47C" emissive="#F4D47C" emissiveIntensity={0.35} roughness={0.2} />
    </mesh>
    {/* offering stones */}
    {[-3.4, 3.4].map((x) => (
      <mesh key={x} position={[x, 0.6, 2]}>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#8A8D91" roughness={1} flatShading />
      </mesh>
    ))}
  </group>
);

// Floating marker above each destination (click-to-travel target in Phase 3).
export const Beacon = ({ position, color }) => {
  const marker = useRef();
  useFrame(({ clock }) => {
    if (marker.current) {
      marker.current.position.y = position[1] + 7 + Math.sin(clock.elapsedTime * 1.4 + position[0]) * 0.5;
      marker.current.rotation.y = clock.elapsedTime * 0.8;
    }
  });
  return (
    <group>
      <mesh position={[position[0], position[1] + 3.4, position[2]]}>
        <cylinderGeometry args={[0.18, 0.3, 6.8, 5]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} transparent opacity={0.85} />
      </mesh>
      <mesh ref={marker} position={[position[0], position[1] + 7, position[2]]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} />
      </mesh>
    </group>
  );
};

const Structures = () => (
  <group>
    {/* ORIGINS — forest village entrance */}
    <ToriiGate position={[0, 0, 17]} />
    <group position={[4.5, 0, 26]}>
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[1.6, 1.8, 1.2]} />
        <meshStandardMaterial color="#7A7F87" roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <coneGeometry args={[1.3, 1, 4]} />
        <meshStandardMaterial color="#4A4F57" roughness={1} flatShading />
      </mesh>
    </group>

    {/* TRAINING — mountain dojo + waterfall */}
    <Dojo position={[-26, 0, 2]} />
    <Waterfall position={[-36, 0, -2]} />

    {/* MISSIONS — developer village: HostelResolve + Hostmate halls */}
    <House position={[23.5, 0, 2]} bodyColor="#D9C9A8" signColor="#E6B566" rotation={0.25} />
    <House position={[30.5, 0, 7.5]} bodyColor="#C9D4D8" signColor="#5DADE2" rotation={-0.35} />
    <mesh position={[27, 0.4, 11]}>
      <cylinderGeometry args={[2.6, 3, 0.8, 8]} />
      <meshStandardMaterial color="#8A8D91" roughness={1} flatShading />
    </mesh>

    {/* TRIALS — gates + bridge */}
    <TrialGate position={[0, 0, -11]} />
    <Bridge position={[0, 0.4, -6]} />
    <TrialGate position={[-4, 0, -20]} color="#5A6B8A" />
    <TrialGate position={[4, 0, -20]} color="#5A6B8A" />

    {/* SUMMIT — shrine above clouds */}
    <ToriiGate position={[0, 9.6, -33]} scale={1.2} color="#8A5A3B" />
    <SummitShrine position={[0, 9.6, -40]} />

    {/* Destination beacons */}
    <Beacon position={[0, 0, 24]} color="#E6B566" />
    <Beacon position={[-27, 0, 5]} color="#5DADE2" />
    <Beacon position={[27, 0, 5]} color="#E6B566" />
    <Beacon position={[0, 0, -17]} color="#C98F9A" />
    <Beacon position={[0, 9.6, -38]} color="#F4D47C" />
  </group>
);

export default Structures;
