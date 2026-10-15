import { destinations, scrollToSection } from '../../data/destinations';
import { profile } from '../../data/profile';
import useMode from '../../mode/useMode';
import { WebGLNote } from '../shell/LoadingFallback';

// DEVSLAYER Phase 1 — non-3D adventure map (the no-WebGL path AND the
// Adventure-mode hero until the Phase 2 3D world lands).
// Every card scrolls to a real portfolio section; resume/contact are one click away.

const AdventurePlaceholder = ({ onEnterSection }) => {
  const { setMode } = useMode();

  const go = (sectionId) => {
    if (onEnterSection) onEnterSection(sectionId);
    scrollToSection(sectionId);
  };

  return (
    <section id="journey" aria-label="DEVSLAYER journey map" className="journey-map">
      <p className="journey-kicker">DEVSLAYER — The Path to Code Hashira</p>
      <h2 className="journey-title">
        {profile.name} <span aria-hidden="true">⚔️</span>
      </h2>
      <p className="journey-sub">{profile.tagline}</p>

      <ol className="journey-grid">
        {destinations.map((d, i) => (
          <li key={d.id} className="journey-card" style={{ '--accent': d.accent }}>
            <span className="journey-step" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3>{d.arc}</h3>
            <p>{d.description}</p>
            <button type="button" className="journey-btn" onClick={() => go(d.sectionId)}>
              Travel to {d.label} →
            </button>
          </li>
        ))}
      </ol>

      <div className="journey-actions">
        <a
          className="btn-primary"
          href={profile.resumePath}
          target="_blank"
          rel="noopener noreferrer"
        >
          See my resume
        </a>
        <button type="button" className="journey-btn ghost" onClick={() => go('projects')}>
          Explore projects
        </button>
        <button type="button" className="journey-btn ghost" onClick={() => setMode('portfolio')}>
          Switch to Portfolio mode
        </button>
      </div>

      <WebGLNote />
    </section>
  );
};

export default AdventurePlaceholder;
