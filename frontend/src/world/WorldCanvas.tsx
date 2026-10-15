// Lazy-loaded 3D canvas. Adaptive DPR (1.75 desktop / 1 mobile), no shadow
// maps, and a WebGL-failure path that falls back to accessible HTML.

import { Suspense, lazy, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useIslands } from '../state/useIslands';
import { useHighQuality } from '../hooks/device';

const World = lazy(() => import('./World'));

const WorldCanvas = ({ onReady }: { onReady: () => void }) => {
  const hq = useHighQuality();
  const { setWebglFailed } = useIslands();
  const [attemptKey] = useState(0);

  return (
    <Canvas
      key={attemptKey}
      dpr={hq ? [1, 1.75] : [1, 1]}
      camera={{ fov: 55, near: 0.1, far: 600, position: [0, 26, 44] }}
      gl={{ antialias: true, powerPreference: hq ? 'high-performance' : 'low-power', alpha: false }}
      onCreated={() => onReady()}
      onError={() => setWebglFailed(true)}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <World />
      </Suspense>
    </Canvas>
  );
};

export default WorldCanvas;
