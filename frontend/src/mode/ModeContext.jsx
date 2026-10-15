// DEVSLAYER Phase 1 — Adventure / Portfolio mode state.
// Persisted to localStorage; defaults to "adventure" (the product vision)
// while keeping every section reachable in both modes (never gated).

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'devslayer-mode';

const ModeContext = createContext({ mode: 'adventure', setMode: () => {}, isAdventure: true });

const readInitialMode = () => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'adventure' || saved === 'portfolio') return saved;
  } catch {
    // private mode / unavailable storage — fall through to default
  }
  return 'adventure';
};

export const ModeProvider = ({ children }) => {
  const [mode, setModeState] = useState(readInitialMode);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // storage unavailable — mode still works for the session
    }
    document.body.dataset.devslayerMode = mode;
  }, [mode]);

  const setMode = useCallback((next) => {
    setModeState(next === 'portfolio' ? 'portfolio' : 'adventure');
  }, []);

  const value = useMemo(
    () => ({ mode, setMode, isAdventure: mode === 'adventure' }),
    [mode, setMode],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

export default ModeContext;
