// DEVSLAYER structures — original landmarks, procedural only.
// Mission halls and training stations are interactive (click → HTML panels).

import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGame } from '../state/useGame';
import { trainingStations } from '../data/destinations';

const WOOD = '#6B4A3A';
const WOOD_DARK = '#4A3428';
const PLASTER = '#E8E0CE';
const TILE = '#334155';
const TORII_RED = '#B3402E';
const STONE_GREY = '#6E7480';

export const ToriiGate = ({ position, scale = 1, color = TORII_RED }: {
  position: [number, number, number]; scale?: number; color?: string;
}) => (
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

const Roof = ({ position, size = [7, 1.6, 6], color = TILE }: {
  position: [number, number, number]; size?: [number, number, number]; color?: string;
}) => (
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

const BlobShadow = ({ position, r = 4 }: { position: [number, number, number]; r?: number }) => (
  <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
    <circleGeometry args={[r, 16]} />
    <meshBasicMaterial color="#000000" transparent opacity={0.28} depthWrite={false} />
  </mesh>
);

export const Dojo = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <BlobShadow position={[0, 0.02, 0]} r={7} />
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[10, 1, 8]} />
      <meshStandardMaterial color="#7A7F87" roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 2.6, 0]}>
      <boxGeometry args={[8, 3.2, 6]} />
      <meshStandardMaterial color={PLASTER} roughness={1} flatShading />
    </mesh>
    {[-2.4, 0, 2.4].map((x) => (
      <mesh key={x} position={[x, 2.6, 3.05]}>
        <planeGeometry args={[1.4, 1.6]} />
        <meshStandardMaterial color="#E6B566" emissive="#E6B566" emissiveIntensity={0.9} />
      </mesh>
    ))}
    <Roof position={[0, 4.2, 0]} size={[10, 2, 8]} />
    {[-6, -3.5, -1, 1.5].map((x, i) => (
      <mesh key={x} position={[x, 0.15, 6.5]} rotation={[0, i * 0.5, 0]}>
        <cylinderGeometry args={[1, 1.1, 0.3, 6]} />
        <meshStandardMaterial color="#C9BFA8" roughness={1} flatShading />
      </mesh>
    ))}
  </group>
);

// Training stations — clickable practice posts around the dojo.
export const TrainingStations = () => {
  const { setPanel, trained } = useGame();
  const spots: Array<{ station: (typeof trainingStations)[number]; pos: [number, number, number] }> = [
    { station: trainingStations[0], pos: [-19, 0, 10] },
    { station: trainingStations[1], pos: [-26, 0, 12] },
    { station: trainingStations[2], pos: [-33, 0, 10] },
  ];
  return (
    <group>
      {spots.map(({ station, pos }) => {
        const done = trained.includes(station.id);
        return (
          <group
            key={station.id}
            position={pos}
            onClick={(e) => { e.stopPropagation(); setPanel({ type: 'station', stationId: station.id }); }}
            onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { document.body.style.cursor = 'auto'; }}
          >
            <mesh position={[0, 1, 0]}>
              <cylinderGeometry args={[0.22, 0.28, 2, 5]} />
              <meshStandardMaterial color={done ? '#5DADE2' : WOOD_DARK} emissive={done ? '#5DADE2' : '#000000'} emissiveIntensity={done ? 0.8 : 0} roughness={1} flatShading />
            </mesh>
            <mesh position={[0, 2.3, 0]}>
              <octahedronGeometry args={[0.42, 0]} />
              <meshStandardMaterial color="#5DADE2" emissive="#5DADE2" emissiveIntensity={1.4} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export const Waterfall = ({ position }: { position: [number, number, number] }) => {
  const veil = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const mat = veil.current?.material as THREE.MeshStandardMaterial | undefined;
    if (mat) mat.opacity = 0.55 + Math.sin(clock.elapsedTime * 2.2) * 0.12;
  });
  return (
    <group position={position}>
      <BlobShadow position={[0, 0.02, 1]} r={5} />
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

// Mission hall — clicking opens the project briefing panel.
export const MissionHall = ({ position, projectId, bodyColor, signColor, rotation = 0 }: {
  position: [number, number, number]; projectId: string; bodyColor: string; signColor: string; rotation?: number;
}) => {
  const { setPanel } = useGame();
  return (
    <group
      position={position}
      rotation={[0, rotation, 0]}
      onClick={(e) => { e.stopPropagation(); setPanel({ type: 'mission', projectId }); }}
      onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      <BlobShadow position={[0, 0.02, 0]} r={4.6} />
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[5.5, 3.2, 4.5]} />
        <meshStandardMaterial color={bodyColor} roughness={1} flatShading />
      </mesh>
      <Roof position={[0, 3.2, 0]} size={[7, 1.8, 6]} color={TILE} />
      {[-1.4, 1.4].map((x) => (
        <mesh key={x} position={[x, 1.6, 2.28]}>
          <planeGeometry args={[1.2, 1.2]} />
          <meshStandardMaterial color={signColor} emissive={signColor} emissiveIntensity={1} />
        </mesh>
      ))}
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
};

export const Bridge = ({ position }: { position: [number, number, number] }) => (
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
    <mesh position={[0, 2.05, -1.3]}>
      <boxGeometry args={[8.4, 0.12, 0.12]} />
      <meshStandardMaterial color={WOOD_DARK} roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 2.05, 1.3]}>
      <boxGeometry args={[8.4, 0.12, 0.12]} />
      <meshStandardMaterial color={WOOD_DARK} roughness={1} flatShading />
    </mesh>
  </group>
);

export const TrialGate = ({ position, color = '#8A5A6B' }: {
  position: [number, number, number]; color?: string;
}) => (
  <group position={position}>
    <mesh position={[-1.8, 1.8, 0]}>
      <boxGeometry args={[0.5, 3.6, 0.5]} />
      <meshStandardMaterial color={STONE_GREY} roughness={1} flatShading />
    </mesh>
    <mesh position={[1.8, 1.8, 0]}>
      <boxGeometry args={[0.5, 3.6, 0.5]} />
      <meshStandardMaterial color={STONE_GREY} roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 3.7, 0]}>
      <boxGeometry args={[4.6, 0.5, 0.7]} />
      <meshStandardMaterial color={color} roughness={1} flatShading />
    </mesh>
  </group>
);

export const SummitShrine = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <BlobShadow position={[0, 0.02, 0]} r={5.5} />
    <mesh position={[0, 1.2, 0]}>
      <boxGeometry args={[6, 2.4, 5]} />
      <meshStandardMaterial color={PLASTER} roughness={1} flatShading />
    </mesh>
    <Roof position={[0, 2.4, 0]} size={[8, 2, 7]} color="#8A5A3B" />
    <mesh position={[0, 0.15, 5.5]}>
      <cylinderGeometry args={[2.6, 2.6, 0.3, 12]} />
      <meshStandardMaterial color="#F4D47C" emissive="#F4D47C" emissiveIntensity={0.35} roughness={0.2} />
    </mesh>
    {[-3.4, 3.4].map((x) => (
      <mesh key={x} position={[x, 0.6, 2]}>
        <dodecahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial color="#8A8D91" roughness={1} flatShading />
      </mesh>
    ))}
  </group>
);

const Structures = () => (
  <group>
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

    <Dojo position={[-26, 0, 2]} />
    <TrainingStations />
    <Waterfall position={[-36, 0, -2]} />

    <MissionHall position={[23.5, 0, 2]} projectId="hostelresolve" bodyColor="#D9C9A8" signColor="#E6B566" rotation={0.25} />
    <MissionHall position={[30.5, 0, 7.5]} projectId="hostmate" bodyColor="#C9D4D8" signColor="#5DADE2" rotation={-0.35} />
    <mesh position={[27, 0.4, 11]}>
      <cylinderGeometry args={[2.6, 3, 0.8, 8]} />
      <meshStandardMaterial color="#8A8D91" roughness={1} flatShading />
    </mesh>

    <TrialGate position={[0, 0, -11]} />
    <Bridge position={[0, 0.4, -6]} />
    <TrialGate position={[-4, 0, -20]} color="#5A6B8A" />
    <TrialGate position={[4, 0, -20]} color="#5A6B8A" />

    <ToriiGate position={[0, 9.6, -33]} scale={1.2} color="#8A5A3B" />
    <SummitShrine position={[0, 9.6, -40]} />
  </group>
);

export default Structures;
