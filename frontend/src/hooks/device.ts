import { useEffect, useState } from 'react';

export const useReducedMotion = (): boolean => {
  const [reduced, setReduced] = useState<boolean>(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent): void => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
};

/** Desktop-class device with room for bloom + full pixel ratio. */
export const useHighQuality = (): boolean => {
  const [hq, setHq] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    return !coarse && window.innerWidth >= 768;
  });

  useEffect(() => {
    const onResize = (): void => {
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      setHq(!coarse && window.innerWidth >= 768);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return hq;
};

export const isWebGLAvailable = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(gl && typeof (gl as WebGLRenderingContext).getParameter === 'function');
  } catch {
    return false;
  }
};
