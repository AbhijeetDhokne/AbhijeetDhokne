// Island E — Experience. Archive monoliths for the verified roles in sorted
// (most-recent-first) array order. All copy renders from structured data.

import FloatingIsland from '../world/FloatingIsland';
import { BeaconLabel, Clickable, GlowGem, SelectionRing } from './parts';
import { islandById } from '../data/navigation';
import { experience } from '../data/experience';
import { useIslands } from '../state/useIslands';
import { useReducedMotion } from '../hooks/device';

const Monolith = ({
  id,
  index,
  spot,
  accent,
}: {
  id: string;
  index: number;
  spot: [number, number, number];
  accent: string;
}) => {
  const { select, selection } = useIslands();
  const active = selection?.type === 'experience' && selection.id === id;
  const h = 3.2 - index * 0.35;
  return (
    <Clickable position={spot} label="Open experience details" onPick={() => select({ type: 'experience', id })}>
      <mesh position={[0, 0.6 + h / 2, 0]}>
        <boxGeometry args={[1.5, h, 0.9]} />
        <meshStandardMaterial color="#1d2c3d" roughness={0.85} flatShading />
      </mesh>
      {/* glowing edge strip */}
      <mesh position={[0, 0.6 + h / 2, 0.47]}>
        <boxGeometry args={[0.16, h * 0.8, 0.04]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 2.8 : 1.4} />
      </mesh>
      <GlowGem position={[0, 1.4 + h, 0]} color={accent} size={0.3} />
      {active && <SelectionRing position={[0, 1.5, 0]} color={accent} radius={1.9} />}
    </Clickable>
  );
};

const SPOTS: Array<[number, number, number]> = [
  [-3.4, 1.4, -1.2],
  [0, 1.4, -2.2],
  [3.4, 1.4, -1.2],
];

const ROLE_COLORS = ['#f49df2', '#ffb35c', '#6fe3a5'];

const ExperienceIsland = () => {
  const def = islandById('experience');
  const { current, requestTravel } = useIslands();
  const reduced = useReducedMotion();
  return (
    <FloatingIsland
      position={def.position}
      radius={def.radius}
      accent={def.accent}
      seed="experience-roles"
      still={reduced}
      selected={current === 'experience'}
      onSelect={() => requestTravel('experience')}
    >
      {experience.map((e, i) => (
        <Monolith key={e.id} id={e.id} index={i} spot={SPOTS[i % SPOTS.length]} accent={ROLE_COLORS[i % ROLE_COLORS.length]} />
      ))}
      <BeaconLabel
        dest="experience"
        title="Experience"
        tagline={`${experience.length} roles · most recent first`}
        active={current === 'experience'}
        y={5.8}
      />
    </FloatingIsland>
  );
};

export default ExperienceIsland;
