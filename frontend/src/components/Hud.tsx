// DEVSLAYER HUD — persistent game-inspired navigation chrome.
// Destinations, resume, sound, mode, progress. Never gates content.

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Volume2, VolumeX, FileText, Layers, ScrollText, X, FastForward } from 'lucide-react';
import { destinations, destinationById, collectibles } from '../data/destinations';
import { profile } from '../data/profile';
import { useGame } from '../state/useGame';
import { ambient } from '../audio/ambient';

const Hud = () => {
  const {
    current, requestTravel, traveling, requestSkip, panel, setPanel,
    collected, soundOn, setSoundOn, setMode,
  } = useGame();

  useEffect(() => {
    if (soundOn) ambient().start();
    else ambient().stop();
  }, [soundOn]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape' && panel) setPanel(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [panel, setPanel]);

  const arrived = current !== 'overview' ? destinationById(current) : undefined;

  return (
    <>
      <div className={`letterbox top${traveling ? ' on' : ''}`} aria-hidden="true" />
      <div className={`letterbox bottom${traveling ? ' on' : ''}`} aria-hidden="true" />

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-3 pt-3 sm:px-5">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-parchment/15 bg-ink-2/80 py-1.5 pr-4 pl-4 backdrop-blur">
            <span className="font-display text-sm font-black tracking-widest text-lantern">DEVSLAYER</span>
          </div>

          <nav aria-label="Destinations" className="pointer-events-auto min-w-0 flex-1">
            <div className="flex gap-1.5 overflow-x-auto rounded-full border border-parchment/15 bg-ink-2/80 p-1.5 backdrop-blur">
              {destinations.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => requestTravel(d.id)}
                  aria-current={current === d.id ? 'location' : undefined}
                  title={d.arc}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
                    current === d.id
                      ? 'bg-lantern text-ink-2'
                      : 'text-parchment/85 hover:bg-parchment/10 hover:text-lantern'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="pointer-events-auto flex items-center gap-1.5">
            <span
              className="hidden items-center gap-1.5 rounded-full border border-parchment/15 bg-ink-2/80 px-3 py-2 text-xs font-semibold text-parchment/85 backdrop-blur sm:flex"
              title={collected.map((id) => collectibles.find((c) => c.id === id)?.name ?? id).join(', ') || 'Find the five hidden technique scrolls'}
            >
              <ScrollText size={14} className="text-lantern" />
              {collected.length}/{collectibles.length}
            </span>
            <button
              type="button"
              onClick={() => setSoundOn(!soundOn)}
              aria-pressed={soundOn}
              aria-label={soundOn ? 'Mute ambient sound' : 'Enable ambient sound'}
              title="Ambient sound (off by default)"
              className="rounded-full border border-parchment/15 bg-ink-2/80 p-2.5 text-parchment/85 backdrop-blur transition hover:text-lantern"
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-parchment/15 bg-ink-2/80 p-2.5 text-parchment/85 backdrop-blur transition hover:text-lantern"
              title="Open resume (PDF)"
              aria-label="Open resume PDF"
            >
              <FileText size={16} />
            </a>
            <button
              type="button"
              onClick={() => setMode('portfolio')}
              className="flex items-center gap-1.5 rounded-full bg-lantern px-3.5 py-2 text-sm font-bold text-ink-2 transition hover:brightness-110"
            >
              <Layers size={15} /> Portfolio
            </button>
          </div>
        </div>
      </header>

      {/* Current location chip + travel controls */}
      <div className="pointer-events-none fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
        <AnimatePresence mode="wait">
          {traveling ? (
            <motion.div
              key="traveling"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="pointer-events-auto flex items-center gap-3 rounded-full border border-lantern/40 bg-ink-2/90 py-2 pr-2 pl-5 backdrop-blur"
              role="status"
            >
              <span className="text-sm font-semibold text-lantern">Traveling…</span>
              <button
                type="button"
                onClick={requestSkip}
                className="flex items-center gap-1.5 rounded-full bg-lantern px-4 py-1.5 text-sm font-bold text-ink-2"
              >
                <FastForward size={14} /> Skip
              </button>
            </motion.div>
          ) : (
            arrived && (
              <motion.div
                key={arrived.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                className="pointer-events-auto flex max-w-[92vw] items-center gap-3 rounded-2xl border border-parchment/15 bg-ink-2/90 py-2.5 pr-2.5 pl-5 backdrop-blur"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: arrived.accent }} aria-hidden="true" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-parchment">{arrived.arc}</p>
                  <p className="truncate text-xs text-slate-dim">{arrived.tagline}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setPanel({ type: 'destination', destId: arrived.id })}
                  className="shrink-0 rounded-full border border-lantern/50 px-3.5 py-1.5 text-xs font-bold text-lantern transition hover:bg-lantern hover:text-ink-2"
                >
                  Briefing
                </button>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* Panel close affordance hint (panels render their own Escape handling) */}
      {panel && (
        <button
          type="button"
          onClick={() => setPanel(null)}
          aria-label="Close panel"
          className="fixed top-20 right-4 z-50 rounded-full border border-parchment/20 bg-ink-2/90 p-2 text-parchment/80 backdrop-blur hover:text-lantern"
        >
          <X size={16} />
        </button>
      )}
    </>
  );
};

export default Hud;
