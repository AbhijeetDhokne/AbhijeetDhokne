// DEVSLAYER canvas — fullscreen adventure viewport.
// Imported lazily: three.js never enters the initial bundle.

import { Canvas } from '@react-three/fiber';
import { WorldWithQuality } from './World';
import { useHighQuality } from '../hooks/device';

const WorldCanvas = () => {
  const hq = useHighQuality();
  return (
    <div
      className="absolute inset-0"
      role="img"
      aria-label="Stylized low-poly 3D world with five destinations: forest village, mountain dojo, developer village, mountain trials, and summit shrine."
    >
      <Canvas
        dpr={hq ? [1, 1.75] : [1, 1]}
        shadows={false}
        gl={{ antialias: hq, powerPreference: hq ? 'high-performance' : 'low-power' }}
        camera={{ position: [0, 30, 58], fov: 45, near: 0.5, far: 400 }}
      >
        <WorldWithQuality />
      </Canvas>
    </div>
  );
};

export default WorldCanvas;
