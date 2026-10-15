import { createContext, useContext } from 'react';
import type { DestinationId } from '../data/types';

export type Mode = 'adventure' | 'portfolio';
export type PanelState =
  | { type: 'mission'; projectId: string }
  | { type: 'station'; stationId: string }
  | { type: 'destination'; destId: DestinationId }
  | null;

export interface TravelRequest {
  dest: DestinationId | 'overview';
  nonce: number;
}

export interface GameState {
  mode: Mode;
  setMode: (m: Mode) => void;
  introSeen: boolean;
  dismissIntro: () => void;
  replayIntro: () => void;
  current: DestinationId | 'overview';
  travelRequest: TravelRequest;
  requestTravel: (dest: DestinationId | 'overview') => void;
  markArrived: (dest: DestinationId | 'overview') => void;
  traveling: boolean;
  setTraveling: (t: boolean) => void;
  skipNonce: number;
  requestSkip: () => void;
  panel: PanelState;
  setPanel: (p: PanelState) => void;
  collected: string[];
  collect: (id: string) => void;
  trained: string[];
  markTrained: (id: string) => void;
  soundOn: boolean;
  setSoundOn: (on: boolean) => void;
}

export const GameContext = createContext<GameState | null>(null);

export const useGame = (): GameState => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
};

export default useGame;
