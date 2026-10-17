// Floating-islands ambient audio — looped owner-provided space ambience.
// Off by default; starts only after explicit user toggle via the nav sound
// button. Volume always ramps: a gentle fade-in on start and a fade-out on
// mute, so toggling never cuts the track abruptly. A new toggle cancels any
// fade in flight and ramps from the current volume, so rapid clicks stay smooth.

interface AmbientHandle {
  start: () => void;
  stop: () => void;
}

const TRACK = `${import.meta.env.BASE_URL}audio/space-ambience.wav`;
const TARGET_VOLUME = 0.6;
const FADE_IN_MS = 1200;
const FADE_OUT_MS = 900;
const FADE_TICK_MS = 30;

export const createAmbient = (): AmbientHandle => {
  let el: HTMLAudioElement | null = null;
  let fadeTimer: number | null = null;
  let fadeToken = 0;

  const clearFade = (): void => {
    if (fadeTimer !== null) {
      window.clearInterval(fadeTimer);
      fadeTimer = null;
    }
  };

  const fadeTo = (to: number, duration: number, onDone?: () => void): void => {
    if (!el) return;
    const audio = el;
    const from = audio.volume;
    const token = ++fadeToken;
    clearFade();

    if (Math.abs(to - from) < 0.01) {
      audio.volume = to;
      onDone?.();
      return;
    }

    const startedAt = performance.now();
    fadeTimer = window.setInterval(() => {
      // A newer fade owns the timer from here; leave it alone.
      if (token !== fadeToken) return;
      const t = Math.min((performance.now() - startedAt) / duration, 1);
      audio.volume = from + (to - from) * t;
      if (t >= 1) {
        clearFade();
        onDone?.();
      }
    }, FADE_TICK_MS);
  };

  const start = (): void => {
    if (!el) {
      el = new Audio(TRACK);
      el.loop = true;
      el.preload = 'auto';
      el.volume = 0;
      // Invisible in layout (no controls); attached so state stays inspectable.
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
    }
    const audio = el;
    if (audio.paused) {
      void audio.play().catch(() => undefined);
    }
    fadeTo(TARGET_VOLUME, FADE_IN_MS);
  };

  const stop = (): void => {
    if (!el) return;
    const audio = el;
    if (audio.paused && audio.volume === 0) return;
    fadeTo(0, FADE_OUT_MS, () => {
      audio.pause();
      audio.currentTime = 0;
    });
  };

  return { start, stop };
};

let singleton: AmbientHandle | null = null;
export const ambient = (): AmbientHandle => {
  if (!singleton) singleton = createAmbient();
  return singleton;
};
