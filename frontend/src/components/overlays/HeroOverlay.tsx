// Cinematic entry gate: name, concise intro, world instructions, and the
// immediately accessible Enter Universe action. Framer Motion entrance only —
// camera motion is owned by the GSAP director.

import { motion } from 'framer-motion';
import { Compass, MousePointerClick, Move3d, Rocket, Keyboard } from 'lucide-react';
import { profile } from '../../data/profile';
import { useIslands } from '../../state/useIslands';

const HeroOverlay = () => {
  const { enter, requestTravel } = useIslands();

  const begin = () => {
    enter();
    requestTravel('home');
  };

  return (
    <motion.div
      className="hero-veil"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      role="dialog"
      aria-modal="false"
      aria-labelledby="hero-title"
    >
      <motion.div
        className="hero-card no-scrollbar"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="meta-label">A navigable portfolio universe</p>
        <h1 id="hero-title" className="headline-display hero-title">
          {profile.name}
        </h1>
        <p className="hero-subtitle">{profile.title} · {profile.location}</p>
        <p className="hero-lede">{profile.tagline}</p>

        <ul className="hero-how" aria-label="How to explore">
          <li><MousePointerClick size={15} aria-hidden="true" /> Click islands and glowing structures</li>
          <li><Move3d size={15} aria-hidden="true" /> Scroll or use keys 1–6 to glide between islands</li>
          <li><Keyboard size={15} aria-hidden="true" /> H returns home · Esc closes panels</li>
          <li><Compass size={15} aria-hidden="true" /> The island map above is always available</li>
        </ul>

        <div className="hero-cta-row">
          <button type="button" className="primary-button hero-cta" onClick={begin} autoFocus>
            <Rocket size={16} aria-hidden="true" /> Enter Universe
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroOverlay;
