// Central navigation state for the floating-islands universe.
// One travel-request channel drives the GSAP camera director; HTML overlays
// and 3D beacons both dispatch through `requestTravel`, so keyboard users and
// pointer users share the same cinematic transitions.

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { IslandDestination, IslandState, Selection, TravelRequest } from '../data/types';
import { IslandContext } from './useIslands';

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — session-only state */
  }
};

export const IslandProvider = ({ children }: { children: ReactNode }) => {
  const [entered, setEntered] = useState<boolean>(() => read<boolean>('islands:entered', false));
  const [current, setCurrent] = useState<IslandDestination>(() => read<IslandDestination>('islands:current', 'overview'));
  const [travelRequest, setTravelRequest] = useState<TravelRequest>({ dest: 'overview', nonce: 0 });
  const [traveling, setTraveling] = useState(false);
  const [skipNonce, setSkipNonce] = useState(0);
  const [selection, setSelection] = useState<Selection>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => write('islands:entered', entered), [entered]);
  useEffect(() => write('islands:current', current), [current]);

  const enter = useCallback(() => setEntered(true), []);

  const requestTravel = useCallback((dest: IslandDestination) => {
    setSelection(null);
    setTravelRequest((prev) => ({ dest, nonce: prev.nonce + 1 }));
  }, []);

  const returnHome = useCallback(() => {
    setSelection(null);
    setTravelRequest((prev) => ({ dest: 'home', nonce: prev.nonce + 1 }));
  }, []);

  const markArrived = useCallback((dest: IslandDestination) => {
    setCurrent(dest);
    setTraveling(false);
  }, []);

  const requestSkip = useCallback(() => setSkipNonce((n) => n + 1), []);
  const select = useCallback((s: Selection) => setSelection(s), []);

  const value = useMemo<IslandState>(
    () => ({
      entered, enter, returnHome,
      current, travelRequest, requestTravel, markArrived,
      traveling, setTraveling, skipNonce, requestSkip,
      selection, select, webglFailed, setWebglFailed,
    }),
    [entered, current, travelRequest, traveling, skipNonce, selection,
      enter, returnHome, requestTravel, markArrived, requestSkip, select, webglFailed],
  );

  return <IslandContext.Provider value={value}>{children}</IslandContext.Provider>;
};
