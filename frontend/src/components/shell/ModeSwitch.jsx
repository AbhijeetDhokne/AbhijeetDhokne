import useMode from '../../mode/useMode';

// DEVSLAYER Phase 1 — persistent Adventure / Portfolio switch.
// Real buttons, keyboard-operable, announced via aria-pressed.

const ModeSwitch = () => {
  const { mode, setMode } = useMode();

  return (
    <div
      role="group"
      aria-label="Site mode"
      className="mode-switch"
      title="Adventure shows the journey map; Portfolio shows the classic layout"
    >
      <button
        type="button"
        aria-pressed={mode === 'adventure'}
        className={mode === 'adventure' ? 'mode-btn active' : 'mode-btn'}
        onClick={() => setMode('adventure')}
      >
        <span aria-hidden="true">🗺️</span> Adventure
      </button>
      <button
        type="button"
        aria-pressed={mode === 'portfolio'}
        className={mode === 'portfolio' ? 'mode-btn active' : 'mode-btn'}
        onClick={() => setMode('portfolio')}
      >
        <span aria-hidden="true">📄</span> Portfolio
      </button>
    </div>
  );
};

export default ModeSwitch;
