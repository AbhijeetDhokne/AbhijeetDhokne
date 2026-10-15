// Loading veil with staged progress feedback. Resolves when the 3D world
// signals ready (or after a bounded timeout so visitors are never stranded).

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingScreen = ({ ready }: { ready: boolean }) => {
  const [progress, setProgress] = useState(4);

  useEffect(() => {
    if (ready) return;
    const t = window.setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 9, 88));
    }, 320);
    return () => window.clearInterval(t);
  }, [ready]);

  const width = ready ? 100 : progress;

  return (
    <motion.div
      className="loading-veil"
      role="status"
      aria-label="Loading the floating islands universe"
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      <div className="loading-card">
        <Loader2 className="loading-spin" size={22} aria-hidden="true" />
        <p className="meta-label">Charting the archipelago</p>
        <div
          className="loading-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(width)}
          aria-label="World loading progress"
        >
          <div className="loading-fill" style={{ width: `${width}%` }} />
        </div>
        <p className="loading-hint">Raising islands · lighting portals · waking crystals</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
