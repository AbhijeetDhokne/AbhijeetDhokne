// Pointer + wheel interaction layer: click empty space to dismiss panels,
// mouse-wheel to glide between islands (with cooldown so travel stays
// cinematic), all passive to the page and inert under reduced motion.

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { NAV_ORDER } from '../data/navigation';
import { useIslands } from '../state/useIslands';
import { useReducedMotion } from '../hooks/device';

const InteractionManager = () => {
  const { gl } = useThree();
  const { current, requestTravel, select, traveling } = useIslands();
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = gl.domElement;
    let last = 0;

    const onWheel = (e: WheelEvent) => {
      // Let HTML overlays (panels, menus) scroll naturally.
      if ((e.target as HTMLElement).closest('[data-ui-scroll]')) return;
      if (Math.abs(e.deltaY) < 24) return;
      const now = performance.now();
      if (now - last < 2600) return;
      last = now;
      const order = NAV_ORDER;
      const idx = order.indexOf(current === 'overview' ? 'home' : current);
      const next =
        e.deltaY > 0 ? order[(idx + 1) % order.length] : order[(idx - 1 + order.length) % order.length];
      select(null);
      requestTravel(next);
    };

    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('[data-ui-scroll]')) return;
      // Empty-space clicks dismiss open panels (island clicks stopPropagation).
      select(null);
    };

    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('click', onClick);
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('click', onClick);
    };
  }, [gl, current, requestTravel, select, traveling, reduced]);

  return null;
};

export default InteractionManager;
