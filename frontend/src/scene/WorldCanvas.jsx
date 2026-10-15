// DEVSLAYER Phase 2 — Canvas wrapper (imported lazily so `three`
// never lands in the initial bundle). Capped pixel ratio, no shadows.

import { Canvas } from '@react-three/fiber';
import World from './World';

const WorldCanvas = () => (
  <div
    className="world-canvas-wrap"
    role="img"
    aria-label="Stylized low-poly 3D preview of the five DEVSLAYER destinations: forest village, mountain dojo, developer village, mountain trials, and summit shrine."
  >
    <Canvas
      dpr={[1, 1.75]}
      shadows={false}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 30, 58], fov: 45, near: 0.5, far: 400 }}
      style={{ height: '100%' }}
    >
      <World />
    </Canvas>
  </div>
);

export default WorldCanvas;
