// DEVSLAYER adventure view — fullscreen 3D world + HUD + panels.
// No-WebGL devices get the journey map: same destinations, zero gating.

import { Suspense, lazy, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hud from '../Hud';
import Panels from '../Panels';
import TitleScreen from '../TitleScreen';
import ErrorBoundary from '../shell/ErrorBoundary';
import { LoadingFallback } from '../shell/LoadingFallback';
import { destinations } from '../../data/destinations';
import { useGame } from '../../state/useGame';
import { isWebGLAvailable } from '../../hooks/device';

const WorldCanvas = lazy(() => import('../../scene/WorldCanvas'));

const NoWebGLFallback = () => {
  const { setMode } = useGame();
  const go = (sectionId: string): void => {
    setMode('portfolio');
    // Let portfolio mount before scrolling to the matching section.
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 80);
  };
  return (
    <div className="flex min-h-full items-center justify-center bg-ink px-4 py-16">
      <div className="w-full max-w-3xl">
        <p className="text-xs font-bold tracking-[0.3em] text-lantern uppercase">DEVSLAYER — journey map</p>
        <h1 className="font-display mt-2 text-4xl font-black text-parchment">The Path to Code Hashira</h1>
        <p className="mt-3 text-slate-dim" role="status">
          WebGL is unavailable here — this map carries every destination. Nothing is hidden.
        </p>
        <ol className="mt-8 space-y-3">
          {destinations.map((d, i) => (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => go(d.sectionId)}
                className="flex w-full items-center gap-4 rounded-2xl border border-parchment/15 bg-ink-2 p-5 text-left transition hover:border-lantern"
              >
                <span className="font-display text-2xl font-black" style={{ color: d.accent }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block font-bold text-parchment">{d.arc}</span>
                  <span className="block text-sm text-slate-dim">{d.description}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

const AdventureView = () => {
  const [webgl] = useState<boolean>(() => isWebGLAvailable());
  const { introSeen } = useGame();

  if (!webgl) return <NoWebGLFallback />;

  return (
    <div className="fixed inset-0 bg-ink">
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback label="Summoning the world…" />}>
          <WorldCanvas />
        </Suspense>
      </ErrorBoundary>
      <Hud />
      <Panels />
      <AnimatePresence>{!introSeen && <TitleScreen />}</AnimatePresence>
    </div>
  );
};

export default AdventureView;
