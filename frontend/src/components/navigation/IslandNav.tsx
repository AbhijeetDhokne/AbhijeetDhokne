// Persistent world chrome: monogram home button, island-map menu with a
// visible current-destination indicator, skip-flight control, text-version
// toggle, and keyboard shortcuts (1–6 travel, H home, Esc closes panels).

import { useEffect, useState } from 'react';
import { Compass, Volume2, VolumeX } from 'lucide-react';
import { islands, NAV_ORDER } from '../../data/navigation';
import { useIslands } from '../../state/useIslands';
import { ambient } from '../../audio/ambient';

const SHORTCUTS: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5 };

const IslandNav = () => {
  const {
    current, requestTravel, returnHome, traveling, requestSkip, select,
  } = useIslands();
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    try {
      if (next) ambient().start();
      else ambient().stop();
    } catch {
      setSoundOn(false);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'Escape') {
        select(null);
        return;
      }
      if (e.key.toLowerCase() === 'h') {
        returnHome();
        return;
      }
      const idx = SHORTCUTS[e.key];
      if (idx !== undefined) requestTravel(NAV_ORDER[idx]);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [requestTravel, returnHome, select]);

  const currentLabel =
    current === 'overview' ? 'Overlook' : islands.find((i) => i.id === current)?.label ?? 'Overlook';

  return (
    <header className="world-nav" role="banner">
      <button type="button" className="world-brand" onClick={returnHome} aria-label="Return to Home island">
        <span className="world-brand-mark" aria-hidden="true">AD</span>
        <span className="world-brand-text">Abhijeet Dhokne</span>
      </button>

      <nav aria-label="Island map" className="world-map">
        {islands.map((isl, i) => {
          const active = current === isl.id;
          return (
            <button
              key={isl.id}
              type="button"
              onClick={() => requestTravel(isl.id)}
              aria-current={active ? 'location' : undefined}
              title={`${isl.label} (press ${i + 1})`}
              className={`world-map-btn${active ? ' is-active' : ''}`}
            >
              <span className="world-map-dot" style={{ background: isl.accent }} aria-hidden="true" />
              {isl.label}
            </button>
          );
        })}
      </nav>

      <div className="world-status" role="status" aria-live="polite">
        <Compass size={14} aria-hidden="true" />
        <span>
          {traveling ? 'Travelling…' : currentLabel}
        </span>
        {traveling && (
          <button type="button" className="world-skip" onClick={requestSkip}>
            Skip flight
          </button>
        )}
      </div>

      <div className="world-actions">
        <button
          type="button"
          className="world-icon-btn"
          onClick={toggleSound}
          aria-label={soundOn ? 'Mute ambient sound' : 'Play ambient sound'}
          aria-pressed={soundOn}
          title="Generative ambient sound (off by default)"
        >
          {soundOn ? <Volume2 size={16} aria-hidden="true" /> : <VolumeX size={16} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
};

export default IslandNav;
