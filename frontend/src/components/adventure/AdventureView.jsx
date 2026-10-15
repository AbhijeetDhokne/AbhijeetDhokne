import { Suspense, lazy, useState } from 'react';
import AdventurePlaceholder from './AdventurePlaceholder';
import ErrorBoundary from '../shell/ErrorBoundary';
import { LoadingFallback } from '../shell/LoadingFallback';
import { isWebGLAvailable } from '../../scene/webgl';

// three.js is code-split: this import becomes a separate chunk that only
// loads when Adventure mode renders on a WebGL-capable device.
const WorldCanvas = lazy(() => import('../../scene/WorldCanvas'));

// DEVSLAYER Phase 2 — Adventure view: live 3D world on top, accessible
// destination cards below (keyboard/touch equivalents, no-WebGL path).
// Portfolio content is never gated behind the canvas.

const AdventureView = () => {
  const [webgl] = useState(() => isWebGLAvailable());

  return (
    <>
      {webgl ? (
        <ErrorBoundary
          fallback={
            <div className="world-fallback-note" role="status">
              <p>The 3D world could not start here — the journey map below has every destination.</p>
            </div>
          }
        >
          <Suspense fallback={<LoadingFallback label="Summoning the world…" />}>
            <WorldCanvas />
          </Suspense>
        </ErrorBoundary>
      ) : (
        <div className="world-fallback-note" role="status">
          <p>Your device or browser has WebGL disabled — showing the journey map instead. Nothing is hidden.</p>
        </div>
      )}
      <AdventurePlaceholder />
    </>
  );
};

export default AdventureView;
