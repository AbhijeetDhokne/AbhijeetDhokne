// Floating Islands — the navigable 3D portfolio universe of Abhijeet Dhokne.
// 3D only: fullscreen Three.js archipelago with cinematic travel. If WebGL is
// unavailable, visitors get a short notice instead of a blank page.

import { Suspense, lazy, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IslandProvider } from './state/islands';
import { useIslands } from './state/useIslands';
import { isWebGLAvailable } from './hooks/device';
import IslandNav from './components/navigation/IslandNav';
import PositionBeacon from './components/navigation/PositionBeacon';
import DestinationActions from './components/navigation/DestinationActions';
import HeroOverlay from './components/overlays/HeroOverlay';
import InfoPanel from './components/overlays/InfoPanel';
import ResumeViewer from './components/overlays/ResumeViewer';
import LoadingScreen from './components/overlays/LoadingScreen';
import ErrorBoundary from './components/shell/ErrorBoundary';

const WorldCanvas = lazy(() => import('./world/WorldCanvas'));

const focusIslandActions = () => {
  const first = document.querySelector<HTMLButtonElement>('.dest-action');
  first?.focus();
};

const UniverseView = () => {
  const { entered, webglFailed, setWebglFailed } = useIslands();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebglFailed(true);
      return;
    }
    // Never strand visitors on the veil: bound loading time.
    const t = window.setTimeout(() => setReady(true), 15000);
    return () => window.clearTimeout(t);
  }, [setWebglFailed]);

  if (webglFailed) {
    return (
      <div className="world-root">
        <p className="webgl-note" role="status">
          This portfolio is a 3D universe and needs WebGL, which is unavailable
          on this device or browser. Please visit on a WebGL-enabled browser —
          or reach Abhijeet directly at abhijeetdhokne1474@gmail.com.
        </p>
      </div>
    );
  }

  return (
    <div className="world-root">
      <a
        href="#island-actions"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          focusIslandActions();
        }}
      >
        Skip to island actions
      </a>

      <div className="world-canvas-wrap" aria-hidden={!entered}>
        <Suspense fallback={null}>
          <WorldCanvas onReady={() => setReady(true)} />
        </Suspense>
      </div>

      <div id="island-nav">
        <IslandNav />
      </div>

      {entered && <PositionBeacon />}

      <AnimatePresence>{!entered && ready && <HeroOverlay />}</AnimatePresence>
      <AnimatePresence>{!ready && <LoadingScreen ready={ready} />}</AnimatePresence>

      {entered && <InfoPanel />}

      <ResumeViewer />

      {entered && <DestinationActions />}

      {entered && (
        <footer className="world-hint" aria-hidden="true">
          Scroll to glide · Click islands to visit · Keys 1–6 travel · H returns home
        </footer>
      )}
    </div>
  );
};

const App = () => (
  <ErrorBoundary>
    <IslandProvider>
      <UniverseView />
    </IslandProvider>
  </ErrorBoundary>
);

export default App;
