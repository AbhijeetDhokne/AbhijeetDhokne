// DEVSLAYER ambient audio — tiny generative WebAudio engine.
// Off by default; starts only after explicit user toggle. No audio files,
// no dependencies. A soft filtered-noise "night wind" + slow breathing pad.

interface AmbientHandle {
  start: () => void;
  stop: () => void;
}

export const createAmbient = (): AmbientHandle => {
  let ctx: AudioContext | null = null;
  let nodes: AudioNode[] = [];
  let running = false;

  const start = (): void => {
    if (running) return;
    const AC: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    const t = ctx.currentTime;

    // Night wind: looped noise buffer through a wandering lowpass.
    const len = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i += 1) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 320;
    windFilter.Q.value = 0.6;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.035;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 140;
    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);

    // Breathing pad: two detuned sines a fifth apart, very quiet.
    const padGain = ctx.createGain();
    padGain.gain.value = 0.0;
    padGain.gain.linearRampToValueAtTime(0.022, t + 4);
    const oscA = ctx.createOscillator();
    oscA.type = 'sine';
    oscA.frequency.value = 146.8; // D3
    const oscB = ctx.createOscillator();
    oscB.type = 'sine';
    oscB.frequency.value = 220; // A3

    noise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(ctx.destination);
    oscA.connect(padGain);
    oscB.connect(padGain);
    padGain.connect(ctx.destination);

    noise.start();
    lfo.start();
    oscA.start();
    oscB.start();
    nodes = [noise, lfo, oscA, oscB, windFilter, windGain, padGain];
    running = true;
  };

  const stop = (): void => {
    if (!running) return;
    try {
      nodes.forEach((n) => {
        if (n instanceof AudioScheduledSourceNode) (n as OscillatorNode).stop?.();
        n.disconnect();
      });
    } catch {
      /* already torn down */
    }
    nodes = [];
    if (ctx) {
      void ctx.close().catch(() => undefined);
      ctx = null;
    }
    running = false;
  };

  return { start, stop };
};

let singleton: AmbientHandle | null = null;
export const ambient = (): AmbientHandle => {
  if (!singleton) singleton = createAmbient();
  return singleton;
};
