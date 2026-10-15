// DEVSLAYER Phase 2 — capability probe (no WebGL => 2D journey map).

export const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    // Some browsers return a context object that immediately fails; treat
    // a falsy context or missing getParameter as unavailable.
    return Boolean(gl && typeof gl.getParameter === 'function');
  } catch {
    return false;
  }
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default isWebGLAvailable;
