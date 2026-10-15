// Island B — Projects. One hall per verified project: two flagship halls
// (HostelResolve, Hostmate) and three smaller pavilions. Selecting a hall
// glides the camera in and opens its HTML case panel.

import FloatingIsland from '../world/FloatingIsland';
import { BeaconLabel, Clickable, GlowGem, HallBase, SelectionRing } from './parts';
import { islandById } from '../data/navigation';
import { projects } from '../data/projects';
import { useIslands } from '../state/useIslands';
import { useReducedMotion } from '../hooks/device';

const SPOTS: Record<string, [number, number, number]> = {
  hostelresolve: [-3, 1.4, -1.5],
  hostmate: [3, 1.4, -1.5],
  weatherapp: [-4.2, 1.4, 3],
  framepro: [0, 1.4, 3.6],
  'spotify-clone': [4.2, 1.4, 3],
};

const ProjectHall = ({
  id,
  title,
  flagship,
  spot,
  accent,
}: {
  id: string;
  title: string;
  flagship: boolean;
  spot: [number, number, number];
  accent: string;
}) => {
  const { select, selection } = useIslands();
  const active = selection?.type === 'project' && selection.id === id;
  const s = flagship ? 1 : 0.72;
  return (
    <Clickable position={spot} label={`Open ${title} details`} onPick={() => select({ type: 'project', id })}>
      <group scale={s}>
        <HallBase />
        {/* glowing doorway */}
        <mesh position={[0, 1.7, 1.72]}>
          <planeGeometry args={[1.5, 1.9]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={active ? 2.6 : 1.2}
            transparent
            opacity={0.92}
          />
        </mesh>
        <GlowGem position={[0, 5.1, 0]} color={accent} size={flagship ? 0.5 : 0.36} />
      </group>
      {active && <SelectionRing position={[0, 1.55, 0]} color={accent} radius={2.6 * s} />}
    </Clickable>
  );
};

const ProjectsIsland = () => {
  const def = islandById('projects');
  const { current, requestTravel } = useIslands();
  const reduced = useReducedMotion();
  return (
    <FloatingIsland
      position={def.position}
      radius={def.radius}
      accent={def.accent}
      seed="projects"
      still={reduced}
      selected={current === 'projects'}
      onSelect={() => requestTravel('projects')}
    >
      {projects.map((p) => (
        <ProjectHall
          key={p.id}
          id={p.id}
          title={p.title}
          flagship={p.category === 'flagship'}
          spot={SPOTS[p.id] ?? [0, 1.4, 0]}
          accent={p.category === 'flagship' ? def.accent : '#8ac7ff'}
        />
      ))}
      <BeaconLabel dest="projects" title="Projects" tagline={def.tagline} active={current === 'projects'} y={7.5} />
    </FloatingIsland>
  );
};

export default ProjectsIsland;
