// Persistent world chrome: monogram home button, skip-flight control, ambient
// sound toggle, and keyboard shortcuts (1–6 travel, H home, Esc closes panels).
// Current position is shown by the left-side PositionBeacon, not a button map.

import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { NAV_ORDER } from '../../data/navigation';
import { useIslands } from '../../state/useIslands';
import { ambient } from '../../audio/ambient';

const SHORTCUTS: Record<string, number> = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5 };

const IslandNav = () => {
  const {
    traveling, requestTravel, returnHome, requestSkip, select,
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

  return (
    <header className="world-nav" role="banner">
      <button type="button" className="world-brand" onClick={() => requestTravel('overview')} aria-label="View all islands (overview)">
        <span className="world-brand-mark" aria-hidden="true">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
        </span>
        <span className="world-brand-text">Abhijeet Dhokne</span>
      </button>

      <span className="world-nav-spacer" aria-hidden="true" />

      {traveling && (
        <div className="world-status" role="status" aria-live="polite">
          <button type="button" className="world-skip" onClick={requestSkip}>
            Skip flight
          </button>
        </div>
      )}

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
