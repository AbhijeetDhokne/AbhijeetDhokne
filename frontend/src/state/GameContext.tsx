import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { GameContext, type GameState, type Mode, type PanelState, type TravelRequest } from './useGame';
import type { DestinationId } from '../data/types';

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

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<Mode>(() => read<Mode>('devslayer:mode', 'adventure'));
  const [introSeen, setIntroSeen] = useState<boolean>(() => read<boolean>('devslayer:intro', false));
  const [current, setCurrent] = useState<DestinationId | 'overview'>('overview');
  const [travelRequest, setTravelRequest] = useState<TravelRequest>({ dest: 'overview', nonce: 0 });
  const [traveling, setTraveling] = useState(false);
  const [skipNonce, setSkipNonce] = useState(0);
  const [panel, setPanel] = useState<PanelState>(null);
  const [collected, setCollected] = useState<string[]>(() => read<string[]>('devslayer:scrolls', []));
  const [trained, setTrained] = useState<string[]>(() => read<string[]>('devslayer:trained', []));
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => write('devslayer:mode', mode), [mode]);
  useEffect(() => {
    document.body.dataset.devslayerMode = mode;
  }, [mode]);

  const setMode = useCallback((m: Mode) => setModeState(m), []);
  const dismissIntro = useCallback(() => {
    setIntroSeen(true);
    write('devslayer:intro', true);
  }, []);
  const replayIntro = useCallback(() => setIntroSeen(false), []);

  const requestTravel = useCallback((dest: DestinationId | 'overview') => {
    setPanel(null);
    setTravelRequest((prev) => ({ dest, nonce: prev.nonce + 1 }));
  }, []);

  const markArrived = useCallback((dest: DestinationId | 'overview') => {
    setCurrent(dest);
    setTraveling(false);
  }, []);

  const requestSkip = useCallback(() => {
    setSkipNonce((n) => n + 1);
  }, []);

  const collect = useCallback((id: string) => {
    setCollected((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      write('devslayer:scrolls', next);
      return next;
    });
  }, []);

  const markTrained = useCallback((id: string) => {
    setTrained((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      write('devslayer:trained', next);
      return next;
    });
  }, []);

  const value = useMemo<GameState>(
    () => ({
      mode, setMode, introSeen, dismissIntro, replayIntro,
      current, travelRequest, requestTravel, markArrived,
      traveling, setTraveling, skipNonce, requestSkip, panel, setPanel,
      collected, collect, trained, markTrained, soundOn, setSoundOn,
    }),
    [mode, introSeen, current, travelRequest, traveling, skipNonce, panel, collected, trained, soundOn,
      setMode, dismissIntro, replayIntro, requestTravel, markArrived, requestSkip, collect, markTrained],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
