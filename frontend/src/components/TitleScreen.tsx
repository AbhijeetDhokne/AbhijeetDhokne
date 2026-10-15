// DEVSLAYER title screen — original opening, always skippable.
// Nothing here gates content: every button has a direct path to portfolio info.

import { motion } from 'framer-motion';
import { Swords, Map, FileText, ChevronRight } from 'lucide-react';
import { useGame } from '../state/useGame';

const TitleScreen = () => {
  const { dismissIntro, setMode, requestTravel } = useGame();

  const begin = (): void => {
    dismissIntro();
    requestTravel('origins');
  };
  const explore = (): void => {
    dismissIntro();
  };
  const portfolio = (): void => {
    dismissIntro();
    setMode('portfolio');
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 px-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="DEVSLAYER opening"
    >
      <div className="max-w-2xl text-center">
        <motion.p
          className="mb-4 text-xs font-bold tracking-[0.35em] text-lantern uppercase"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          An adventure portfolio
        </motion.p>
        <motion.h1
          className="font-display text-5xl font-black tracking-wide text-parchment sm:text-7xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          DEVSLAYER
        </motion.h1>
        <motion.p
          className="font-display mt-3 text-lg tracking-[0.2em] text-slate-dim uppercase sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          The Path to Code Hashira
        </motion.p>
        <motion.p
          className="mx-auto mt-6 max-w-xl leading-relaxed text-slate-dim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          Five destinations. Two project missions. One developer&apos;s journey from
          forest village to summit shrine — told in React, Node.js, and MongoDB.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <button
            type="button"
            onClick={begin}
            className="group flex items-center gap-2 rounded-xl bg-lantern px-7 py-3.5 font-bold text-ink-2 transition hover:brightness-110"
          >
            <Swords size={18} /> Begin the Journey
          </button>
          <button
            type="button"
            onClick={explore}
            className="flex items-center gap-2 rounded-xl border border-parchment/25 px-7 py-3.5 font-semibold text-parchment transition hover:border-lantern hover:text-lantern"
          >
            <Map size={18} /> Explore Freely
          </button>
          <button
            type="button"
            onClick={portfolio}
            className="flex items-center gap-2 rounded-xl border border-parchment/25 px-7 py-3.5 font-semibold text-parchment transition hover:border-lantern hover:text-lantern"
          >
            <FileText size={18} /> View Portfolio
          </button>
        </motion.div>
        <motion.button
          type="button"
          onClick={explore}
          className="mt-6 inline-flex items-center gap-1 text-sm text-slate-dim underline-offset-4 hover:text-lantern hover:underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Skip intro <ChevronRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default TitleScreen;
