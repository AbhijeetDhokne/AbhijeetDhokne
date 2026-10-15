// Island D — Journey (education only). A graduation arch plus one archive
// stone per school; selecting them opens the education panel with schools
// and certificates.

import FloatingIsland from '../world/FloatingIsland';
import { BeaconLabel, Clickable, GlowGem, SelectionRing } from './parts';
import { islandById } from '../data/navigation';
import { education } from '../data/education';
import { useIslands } from '../state/useIslands';
import { useReducedMotion } from '../hooks/device';

const GraduationArch = ({ accent }: { accent: string }) => (
  <group position={[0, 1.4, -1.6]}>
    {[-1.4, 1.4].map((x) => (
      <mesh key={x} position={[x, 1.4, 0]}>
        <boxGeometry args={[0.4, 2.8, 0.4]} />
        <meshStandardMaterial color="#22344a" roughness={0.85} />
      </mesh>
    ))}
    <mesh position={[0, 2.9, 0]}>
      <boxGeometry args={[3.4, 0.4, 0.5]} />
      <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.1} roughness={0.5} />
    </mesh>
  </group>
);

const SchoolStone = ({
  index,
  spot,
  accent,
}: {
  index: number;
  spot: [number, number, number];
  accent: string;
}) => {
  const { select, selection } = useIslands();
  const active = selection?.type === 'education';
  const h = 2.2 - index * 0.25;
  return (
    <Clickable position={spot} label="Open education details" onPick={() => select({ type: 'education' })}>
      <mesh position={[0, 0.5 + h / 2, 0]}>
        <boxGeometry args={[1.3, h, 0.8]} />
        <meshStandardMaterial color="#22344a" roughness={0.85} flatShading />
      </mesh>
      <mesh position={[0, 0.5 + h / 2, 0.42]}>
        <boxGeometry args={[0.14, h * 0.75, 0.04]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 2.6 : 1.3} />
      </mesh>
      <GlowGem position={[0, 1.1 + h, 0]} color={accent} size={0.26} />
      {active && <SelectionRing position={[0, 1.4, 0]} color={accent} radius={1.7} />}
    </Clickable>
  );
};

const SPOTS: Array<[number, number, number]> = [
  [-3.4, 1.4, 2.2],
  [0, 1.4, 3],
  [3.4, 1.4, 2.2],
];

const JourneyIsland = () => {
  const def = islandById('journey');
  const { current, requestTravel } = useIslands();
  const reduced = useReducedMotion();
  return (
    <FloatingIsland
      position={def.position}
      radius={def.radius}
      accent={def.accent}
      seed="journey-schools"
      still={reduced}
      selected={current === 'journey'}
      onSelect={() => requestTravel('journey')}
    >
      <GraduationArch accent="#b9c2ff" />
      {education.map((e, i) => (
        <SchoolStone key={e.id} index={i} spot={SPOTS[i % SPOTS.length]} accent={def.accent} />
      ))}
      <BeaconLabel
        dest="journey"
        title="Journey"
        tagline={`${education.length} schools · certificates`}
        active={current === 'journey'}
        y={7.2}
      />
    </FloatingIsland>
  );
};

export default JourneyIsland;
