// DEVSLAYER nature — instanced low-poly forest (3 draw calls for 60 trees),
// instanced rocks + grass, and a handful of glowing stone lanterns.

import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { scatter, type ScatterPoint } from './rng';

const PATH_CLEAR: Array<[number, number, number]> = [
  [0, 14, 4], [0, 2, 4], [0, -6, 5], [0, -14, 4],
  [-14, 6, 5], [14, 6, 5], [-27, 5, 7], [27, 5, 7], [0, 24, 8],
];

interface Placed extends ScatterPoint {
  color: string;
}

const usePlacements = (): { trees: Placed[]; rocks: ScatterPoint[]; grass: ScatterPoint[] } =>
  useMemo(() => {
    const trees: Placed[] = [
      ...scatter(11, 26, 0, 24, 8, 17, PATH_CLEAR).map((p) => ({ ...p, color: '#2F6B4F' })),
      ...scatter(22, 14, -27, 5, 8, 15, [[-27, 5, 7], [-33, 2, 6]]).map((p) => ({ ...p, color: '#3E7D6B' })),
      ...scatter(33, 12, 27, 5, 8, 15, [[27, 5, 7]]).map((p) => ({ ...p, color: '#C98F9A' })),
      ...scatter(44, 8, 0, -17, 8, 14, [[0, -14, 5], [0, -6, 5]]).map((p) => ({ ...p, color: '#2C3A55' })),
    ];
    return {
      trees,
      rocks: scatter(55, 16, 0, -8, 12, 30, PATH_CLEAR),
      grass: scatter(66, 140, 0, 0, 6, 34, PATH_CLEAR),
    };
  }, []);

const dummy = new THREE.Object3D();

const InstancedTrees = ({ trees }: { trees: Placed[] }) => {
  const trunk = useRef<THREE.InstancedMesh>(null);
  const lower = useRef<THREE.InstancedMesh>(null);
  const upper = useRef<THREE.InstancedMesh>(null);

  // Unit-tree offsets baked into geometry so one matrix places all parts.
  const geos = useMemo(() => {
    const trunkGeo = new THREE.CylinderGeometry(0.22, 0.32, 1.8, 5);
    trunkGeo.translate(0, 0.9, 0);
    const lowerGeo = new THREE.ConeGeometry(1.5, 2.6, 6);
    lowerGeo.translate(0, 2.4, 0);
    const upperGeo = new THREE.ConeGeometry(1.0, 1.8, 6);
    upperGeo.translate(0, 3.7, 0);
    return { trunkGeo, lowerGeo, upperGeo };
  }, []);

  useLayoutEffect(() => {
    const color = new THREE.Color();
    trees.forEach((p, i) => {
      dummy.position.set(p.x, 0, p.z);
      dummy.rotation.set(0, p.rot, 0);
      dummy.scale.setScalar(p.s);
      dummy.updateMatrix();
      trunk.current?.setMatrixAt(i, dummy.matrix);
      lower.current?.setMatrixAt(i, dummy.matrix);
      upper.current?.setMatrixAt(i, dummy.matrix);
      lower.current?.setColorAt(i, color.set(p.color));
      upper.current?.setColorAt(i, color.set(p.color).multiplyScalar(1.12));
    });
    for (const ref of [trunk, lower, upper]) {
      if (ref.current) {
        ref.current.instanceMatrix.needsUpdate = true;
        if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
      }
    }
  }, [trees]);

  const n = trees.length;
  return (
    <group>
      <instancedMesh ref={trunk} args={[geos.trunkGeo, undefined, n]} frustumCulled={false}>
        <meshStandardMaterial color="#5A4632" roughness={1} flatShading />
      </instancedMesh>
      <instancedMesh ref={lower} args={[geos.lowerGeo, undefined, n]} frustumCulled={false}>
        <meshStandardMaterial roughness={1} flatShading />
      </instancedMesh>
      <instancedMesh ref={upper} args={[geos.upperGeo, undefined, n]} frustumCulled={false}>
        <meshStandardMaterial roughness={1} flatShading />
      </instancedMesh>
    </group>
  );
};

const InstancedRocks = ({ rocks }: { rocks: ScatterPoint[] }) => {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    rocks.forEach((p, i) => {
      dummy.position.set(p.x, 0.2, p.z);
      dummy.rotation.set(0, p.rot, 0);
      dummy.scale.setScalar(p.s * 1.2);
      dummy.updateMatrix();
      ref.current?.setMatrixAt(i, dummy.matrix);
    });
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  }, [rocks]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, rocks.length]} frustumCulled={false}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#6E7480" roughness={1} flatShading />
    </instancedMesh>
  );
};

const InstancedGrass = ({ grass }: { grass: ScatterPoint[] }) => {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    grass.forEach((p, i) => {
      dummy.position.set(p.x, 0.25, p.z);
      dummy.rotation.set(0, p.rot, 0);
      dummy.scale.setScalar(p.s * 0.55);
      dummy.updateMatrix();
      ref.current?.setMatrixAt(i, dummy.matrix);
    });
    if (ref.current) ref.current.instanceMatrix.needsUpdate = true;
  }, [grass]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, grass.length]} frustumCulled={false}>
      <coneGeometry args={[0.35, 0.9, 4]} />
      <meshStandardMaterial color="#3B7A5E" roughness={1} flatShading />
    </instancedMesh>
  );
};

const Lantern = ({ position, glow = '#E6B566' }: { position: [number, number, number]; glow?: string }) => (
  <group position={position}>
    <mesh position={[0, 0.5, 0]}>
      <cylinderGeometry args={[0.12, 0.16, 1, 5]} />
      <meshStandardMaterial color="#3A3F45" roughness={1} flatShading />
    </mesh>
    <mesh position={[0, 1.25, 0]}>
      <boxGeometry args={[0.55, 0.6, 0.55]} />
      <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={1.6} />
    </mesh>
    <mesh position={[0, 1.7, 0]}>
      <coneGeometry args={[0.5, 0.35, 4]} />
      <meshStandardMaterial color="#3A3F45" roughness={1} flatShading />
    </mesh>
  </group>
);

const LANTERNS: Array<[number, number, number]> = [
  [-3.4, 0, 20.5], [3.4, 0, 20.5], [-3.4, 0, 26.5], [3.4, 0, 26.5],
  [-24, 0, 9], [-30, 0, 9], [24, 0, 9], [30, 0, 9],
  [-3, 0, -10], [3, 0, -10], [-3, 0, -14], [3, 0, -14],
  [-5, 9.6, -34], [5, 9.6, -34], [0, 9.6, -43],
];

const Nature = () => {
  const { trees, rocks, grass } = usePlacements();
  return (
    <group>
      <InstancedTrees trees={trees} />
      <InstancedRocks rocks={rocks} />
      <InstancedGrass grass={grass} />
      {LANTERNS.map((p, i) => (
        <Lantern key={`lan-${i}`} position={p} glow={p[1] > 5 || i > 11 ? '#F4D47C' : '#E6B566'} />
      ))}
    </group>
  );
};

export default Nature;
