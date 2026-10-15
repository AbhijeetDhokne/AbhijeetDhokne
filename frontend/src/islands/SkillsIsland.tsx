// Island C — Skills. Three crystal clusters group the verified catalogue:
// interface craft, service foundations, data & platforms. Selecting a cluster
// reveals its HTML skill panel. No proficiency percentages anywhere.

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import FloatingIsland from '../world/FloatingIsland';
import { BeaconLabel, Clickable, SelectionRing } from './parts';
import { islandById } from '../data/navigation';
import { skillNodes } from '../data/skills';
import { useIslands } from '../state/useIslands';
import { useReducedMotion } from '../hooks/device';

const COLORS = ['#7adeff', '#b9c2ff', '#8ac7ff'];

const Cluster = ({
  nodeId,
  spot,
  color,
  tall,
  still,
}: {
  nodeId: string;
  spot: [number, number, number];
  color: string;
  tall: number;
  still: boolean;
}) => {
  const { select, selection } = useIslands();
  const active = selection?.type === 'skill-node' && selection.id === nodeId;
  const spin = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (spin.current && !still) spin.current.rotation.y = clock.elapsedTime * 0.25;
  });
  return (
    <Clickable
      position={spot}
      label={`Open skill group`}
      onPick={() => select({ type: 'skill-node', id: nodeId })}
    >
      {/* stone plinth */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[1.5, 1.8, 0.9, 7]} />
        <meshStandardMaterial color="#22344a" roughness={0.9} flatShading />
      </mesh>
      <group ref={spin} position={[0, 1.3, 0]}>
        {[0, 1, 2, 3].map((i) => {
          const h = tall * (0.7 + (i % 3) * 0.35);
          const a = (i / 4) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.7, h / 2, Math.sin(a) * 0.7]}
              rotation={[0.12 * (i - 1.5), a, 0.14 * (1 - i / 2)]}
              scale={[1, h, 1]}
            >
              <octahedronGeometry args={[0.5, 0]} />
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={active ? 2.2 : 1.15}
                roughness={0.22}
                metalness={0.15}
                transparent
                opacity={0.94}
                flatShading
              />
            </mesh>
          );
        })}
      </group>
      <pointLight position={[0, 3, 0]} intensity={active ? 20 : 8} distance={10} color={color} decay={2} />
      {active && <SelectionRing position={[0, 1.45, 0]} color={color} radius={2.4} />}
    </Clickable>
  );
};

const SPOTS: Record<string, [number, number, number]> = {
  'node-frontend': [-3.4, 1.4, -0.5],
  'node-backend': [3.4, 1.4, -0.5],
  'node-data': [0, 1.4, 3.2],
};

const SkillsIsland = () => {
  const def = islandById('skills');
  const { current, requestTravel } = useIslands();
  const reduced = useReducedMotion();
  return (
    <FloatingIsland
      position={def.position}
      radius={def.radius}
      accent={def.accent}
      seed="skills"
      still={reduced}
      selected={current === 'skills'}
      onSelect={() => requestTravel('skills')}
    >
      {skillNodes.map((n, i) => (
        <Cluster
          key={n.id}
          nodeId={n.id}
          spot={SPOTS[n.id] ?? [0, 1.4, 0]}
          color={COLORS[i % COLORS.length]}
          tall={1.6 + (i % 2) * 0.7}
          still={reduced}
        />
      ))}
      <BeaconLabel dest="skills" title="Skills" tagline={def.tagline} active={current === 'skills'} y={7.5} />
    </FloatingIsland>
  );
};

export default SkillsIsland;
