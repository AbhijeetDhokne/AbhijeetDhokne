// Left-side "you are here" indicator: a compact square chip that always shows
// which island the camera is on. Display-only — travel happens via 3D beacons,
// destination buttons, or keys 1–6 / H.

import { islands } from '../../data/navigation';
import { useIslands } from '../../state/useIslands';

const PositionBeacon = () => {
  const { current, traveling, entered } = useIslands();
  if (!entered) return null;

  const active = islands.find((i) => i.id === current);
  const label = traveling ? 'Travelling' : active?.label ?? 'Overlook';
  const accent = active?.accent ?? '#7adeff';

  return (
    <div
      className="position-beacon"
      role="status"
      aria-live="polite"
      aria-label={`Current position: ${label}`}
    >
      <span
        className={`position-dot${traveling ? ' is-traveling' : ''}`}
        style={{ background: accent, color: accent }}
        aria-hidden="true"
      />
      <span className="position-label">{label}</span>
      <span className="position-caption">You are here</span>
    </div>
  );
};

export default PositionBeacon;
