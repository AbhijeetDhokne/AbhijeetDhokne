// DEVSLAYER Phase 2 — world assembly: sky, fog, lighting, camera rig.
// Lighting budget: ambient + hemisphere + 1 directional + 3 short-range
// points. No shadow maps, no post-processing (perf budget, Phase 5 audit).

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Terrain from './Terrain';
import Nature from './Nature';
import Structures from './Structures';
import Effects from './Effects';
import { WORLD } from './config';
import { prefersReducedMotion } from './webgl';

const CENTER = [0, 3, -6];

// Slow cinematic overview drift. Phase 3 replaces this with the
// click-to-travel camera director (poses live in config.js).
const CameraRig = () => {
  const angle = useRef(0.6);
  const settled = useRef(false);
  useFrame(({ camera, clock }, delta) => {
    if (prefersReducedMotion()) {
      if (!settled.current) {
        settled.current = true;
        camera.position.set(0, 30, 58);
        camera.lookAt(...CENTER);
      }
      return;
    }
    angle.current += delta * 0.035;
    const r = 58;
    camera.position.set(
      Math.sin(angle.current) * r,
      29 + Math.sin(clock.elapsedTime * 0.1) * 1.5,
      -6 + Math.cos(angle.current) * r,
    );
    camera.lookAt(...CENTER);
  });
  return null;
};

const World = () => (
  <>
    <color attach="background" args={[WORLD.sky]} />
    <fog attach="fog" args={[WORLD.fog.color, WORLD.fog.near, WORLD.fog.far]} />

    <ambientLight intensity={0.55} />
    <hemisphereLight args={['#DCE5EB', '#284B46', 0.5]} />
    <directionalLight position={[30, 40, 20]} intensity={1.1} color="#FFF2D9" />

    {/* Warm lantern pools: origins plaza, missions plaza, summit shrine */}
    <pointLight position={[0, 4, 23]} intensity={60} distance={22} color="#E6B566" decay={2} />
    <pointLight position={[27, 4, 6]} intensity={50} distance={20} color="#E6B566" decay={2} />
    <pointLight position={[0, 14, -39]} intensity={80} distance={26} color="#F4D47C" decay={2} />

    <CameraRig />
    <Terrain />
    <Nature />
    <Structures />
    <Effects />
  </>
);

export default World;
