// Island navigation context + hook. Kept in its own module (with no component
// exports) so Fast Refresh treats provider and consumers independently.

import { createContext, useContext } from 'react';
import type { IslandState } from '../data/types';

export const IslandContext = createContext<IslandState | null>(null);

export const useIslands = (): IslandState => {
  const ctx = useContext(IslandContext);
  if (!ctx) throw new Error('useIslands must be used inside IslandProvider');
  return ctx;
};
