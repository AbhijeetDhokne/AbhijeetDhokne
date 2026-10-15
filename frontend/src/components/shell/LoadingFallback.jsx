// DEVSLAYER Phase 1 — loading + no-content fallback states.

export const LoadingFallback = ({ label = 'Loading…' }) => (
  <div
    role="status"
    aria-live="polite"
    className="shell-loading"
    style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}
  >
    <span className="shell-spinner" aria-hidden="true" />
    <p style={{ marginTop: '1rem' }}>{label}</p>
  </div>
);

export const WebGLNote = () => (
  <p className="webgl-note" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
    No WebGL needed — this map works everywhere. The full 3D world arrives in Phase 2
    with the same destinations and links.
  </p>
);

export default LoadingFallback;
