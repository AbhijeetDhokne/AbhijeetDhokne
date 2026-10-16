// Floating-islands ambient audio — looped owner-provided space ambience.
// Off by default; starts only after explicit user toggle via the nav sound button.

interface AmbientHandle {
  start: () => void;
  stop: () => void;
}

const TRACK = `${import.meta.env.BASE_URL}audio/space-ambience.wav`;

export const createAmbient = (): AmbientHandle => {
  let el: HTMLAudioElement | null = null;

  const start = (): void => {
    if (el && !el.paused) return;
    if (!el) {
      el = new Audio(TRACK);
      el.loop = true;
      el.preload = 'auto';
      el.volume = 0.6;
      // Invisible in layout (no controls); attached so state stays inspectable.
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
    }
    void el.play().catch(() => undefined);
  };

  const stop = (): void => {
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  };

  return { start, stop };
};

let singleton: AmbientHandle | null = null;
export const ambient = (): AmbientHandle => {
  if (!singleton) singleton = createAmbient();
  return singleton;
};
