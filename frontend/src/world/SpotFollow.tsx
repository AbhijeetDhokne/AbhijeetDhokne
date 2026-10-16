// Spotlight that follows the current island: a soft theatrical beam tracks
// wherever the camera lands, tinted with that island's accent color.

import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useIslands } from '../state/useIslands';
import { OVERVIEW_CAMERA, islandById } from '../data/navigation';
import { useReducedMotion } from '../hooks/device';

const OFFSET = new THREE.Vector3(0, 22, 9);

const SpotFollow = () => {
  const { current } = useIslands();
  const reduced = useReducedMotion();
  const light = useRef<THREE.SpotLight>(null);
  const target = useMemo(() => new THREE.Object3D(), []);
  const goal = useRef(new THREE.Vector3(...OVERVIEW_CAMERA.target));

  useEffect(() => {
    const p = current === 'overview' ? OVERVIEW_CAMERA.target : islandById(current).position;
    goal.current.set(p[0], p[1], p[2]);
    const color = current === 'overview' ? '#9fd8ff' : islandById(current).accent;
    light.current?.color.set(color);
  }, [current]);

  useFrame(() => {
    const l = light.current;
    if (!l) return;
    const k = reduced ? 1 : 0.04;
    target.position.lerp(goal.current, k);
    l.position.lerp(goal.current.clone().add(OFFSET), k);
    target.updateMatrixWorld();
  });

  return (
    <>
      <primitive object={target} />
      <spotLight
        ref={light}
        intensity={900}
        distance={90}
        angle={0.42}
        penumbra={0.8}
        decay={2}
        color="#9fd8ff"
      />
    </>
  );
};

export default SpotFollow;
