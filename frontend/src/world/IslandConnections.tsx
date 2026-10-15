// Glowing pathways connecting the archipelago: catenary light-bridges with
// slow energy pulses travelling along them. Pure procedural geometry.

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { islands } from '../data/navigation';

const bridgeCurve = (a: [number, number, number], b: [number, number, number], sag = 2.5) => {
  const va = new THREE.Vector3(...a);
  const vb = new THREE.Vector3(...b);
  const mid = va.clone().lerp(vb, 0.5);
  mid.y = Math.min(va.y, vb.y) - sag;
  return new THREE.CatmullRomCurve3([va, mid, vb]);
};

/**
 * Journey-only underside attach: the tube plugs into the island's rock
 * underside (tapered cone below the grass cap) on the Home-facing side,
 * embedded deep enough that the ±0.45 island bob never opens the seam.
 * Gentle sag keeps the approach smooth. Computed from island data — all
 * other pathways keep their existing endpoints untouched.
 */
const journeyBottomAttach = (
  home: [number, number, number],
  isl: { position: [number, number, number]; radius: number },
): [number, number, number] => {
  const dx = isl.position[0] - home[0];
  const dz = isl.position[2] - home[2];
  const len = Math.hypot(dx, dz) || 1;
  const inset = isl.radius * 0.4;
  return [
    isl.position[0] - (dx / len) * inset,
    isl.position[1] - 2.5,
    isl.position[2] - (dz / len) * inset,
  ];
};

const Pulses = ({ curve, color, still }: { curve: THREE.CatmullRomCurve3; color: string; still?: boolean }) => {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const u = still ? (i + 1) / 4 : ((t * 0.06 + i / 3) % 1);
      curve.getPointAt(u, m.position);
    });
  });
  return (
    <group>
      {[0, 1, 2].map((i) => (
        <mesh key={i} ref={(m) => { refs.current[i] = m; }}>
          <sphereGeometry args={[0.28, 12, 12]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
        </mesh>
      ))}
    </group>
  );
};

const IslandConnections = ({ still = false }: { still?: boolean }) => {
  const home = islands[0];
  const homeTop: [number, number, number] = [home.position[0], home.position[1] + 1, home.position[2]];
  const links = useMemo(
    () =>
      islands.slice(1).map((isl) => {
        const isJourney = isl.id === 'journey';
        return {
          id: isl.id,
          curve: bridgeCurve(
            homeTop,
            isJourney
              ? journeyBottomAttach(home.position, isl)
              : [isl.position[0], isl.position[1] + 1, isl.position[2]],
            isJourney ? 1.2 : 2.5,
          ),
          color: isl.accent,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <group>
      {links.map((l) => (
        <group key={l.id}>
          <mesh>
            <tubeGeometry args={[l.curve, 48, 0.12, 6, false]} />
            <meshStandardMaterial
              color={l.color}
              emissive={l.color}
              emissiveIntensity={1.5}
              transparent
              opacity={0.85}
              roughness={0.4}
            />
          </mesh>
          {/* faint wider halo tube */}
          <mesh>
            <tubeGeometry args={[l.curve, 32, 0.34, 6, false]} />
            <meshBasicMaterial color={l.color} transparent opacity={0.12} depthWrite={false} />
          </mesh>
          <Pulses curve={l.curve} color={l.color} still={still} />
        </group>
      ))}
    </group>
  );
};

export default IslandConnections;
