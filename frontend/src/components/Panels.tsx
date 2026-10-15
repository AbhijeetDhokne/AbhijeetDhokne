// DEVSLAYER content panels — accessible HTML briefings, never canvas text.
// Mission case studies, training stations, destination briefings.

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, MapPin } from 'lucide-react';
import { useGame } from '../state/useGame';
import { projectById } from '../data/projects';
import { trainingStations, destinationById, destinations } from '../data/destinations';
import { profile } from '../data/profile';
import type { DestinationId } from '../data/types';

const Shell = ({ title, eyebrow, accent, children, onClose }: {
  title: string; eyebrow: string; accent: string; children: React.ReactNode; onClose: () => void;
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <motion.aside
      role="dialog"
      aria-modal="false"
      aria-label={title}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className="fixed z-40 overflow-y-auto rounded-2xl border border-parchment/15 bg-ink-2/95 shadow-2xl backdrop-blur
        inset-x-3 bottom-3 max-h-[62vh] p-6
        sm:inset-x-auto sm:top-1/2 sm:right-5 sm:bottom-auto sm:w-[400px] sm:-translate-y-1/2 sm:p-7"
    >
      <div className="mb-1 h-1 w-12 rounded-full" style={{ background: accent }} aria-hidden="true" />
      <p className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: accent }}>{eyebrow}</p>
      <h2 className="font-display mt-2 text-2xl font-black text-parchment">{title}</h2>
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label={`Close ${title}`}
        className="absolute top-4 right-4 rounded-full border border-parchment/20 p-2 text-parchment/70 transition hover:text-lantern"
      >
        <X size={16} />
      </button>
      <div className="mt-4">{children}</div>
    </motion.aside>
  );
};

const StackChips = ({ stack }: { stack: string[] }) => (
  <div className="flex flex-wrap gap-1.5">
    {stack.map((t) => (
      <span key={t} className="rounded-full border border-parchment/15 bg-parchment/5 px-2.5 py-1 text-xs font-semibold text-parchment/90">
        {t}
      </span>
    ))}
  </div>
);

const MissionPanel = ({ projectId, onClose }: { projectId: string; onClose: () => void }) => {
  const { setMode } = useGame();
  const project = projectById(projectId);
  if (!project) return null;
  return (
    <Shell title={project.title} eyebrow={`Mission briefing · ${project.role}`} accent="#E6B566" onClose={onClose}>
      <p className="text-sm leading-relaxed text-slate-dim">{project.summary}</p>
      <div className="mt-4 space-y-3 text-sm leading-relaxed">
        <p><strong className="text-parchment">Problem — </strong><span className="text-slate-dim">{project.problem}</span></p>
        <p><strong className="text-parchment">Solution — </strong><span className="text-slate-dim">{project.solution}</span></p>
      </div>
      <ul className="mt-4 space-y-2">
        {project.features.map((f) => (
          <li key={f} className="flex gap-2 text-sm text-parchment/90">
            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-lantern" /> {f}
          </li>
        ))}
      </ul>
      <div className="mt-4"><StackChips stack={project.techStack} /></div>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.links.live && (
          <a href={project.links.live} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-lantern px-4 py-2 text-sm font-bold text-ink-2 hover:brightness-110">
            <ExternalLink size={14} /> Live Demo
          </a>
        )}
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-parchment/25 px-4 py-2 text-sm font-semibold text-parchment hover:border-lantern hover:text-lantern">
            <Github size={14} /> Source
          </a>
        )}
        <button type="button" onClick={() => { onClose(); setMode('portfolio'); }}
          className="rounded-lg border border-parchment/25 px-4 py-2 text-sm font-semibold text-parchment hover:border-lantern hover:text-lantern">
          Full case study
        </button>
      </div>
    </Shell>
  );
};

const StationPanel = ({ stationId, onClose }: { stationId: string; onClose: () => void }) => {
  const { markTrained, trained } = useGame();
  const station = trainingStations.find((s) => s.id === stationId);
  if (!station) return null;
  const done = trained.includes(station.id);
  return (
    <Shell title={station.title} eyebrow="Training station" accent="#5DADE2" onClose={onClose}>
      <p className="text-sm font-semibold text-parchment/80">{station.area}</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-dim">{station.description}</p>
      <p className="mt-4 text-xs font-bold tracking-widest text-slate-dim uppercase">Drills draw on</p>
      <div className="mt-2"><StackChips stack={station.relatedSkills} /></div>
      <button
        type="button"
        onClick={() => markTrained(station.id)}
        disabled={done}
        className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition ${
          done ? 'cursor-default bg-parchment/10 text-parchment/60' : 'bg-lantern text-ink-2 hover:brightness-110'
        }`}
      >
        <CheckCircle2 size={15} /> {done ? 'Drill complete — well trained' : 'Complete the drill'}
      </button>
      <p className="mt-3 text-xs text-slate-dim">Training flavor only — it never locks content.</p>
    </Shell>
  );
};

const DestinationPanel = ({ destId, onClose }: { destId: DestinationId; onClose: () => void }) => {
  const { setPanel, setMode } = useGame();
  const dest = destinationById(destId);
  if (!dest) return null;
  return (
    <Shell title={dest.arc} eyebrow={dest.tagline} accent={dest.accent} onClose={onClose}>
      <p className="text-sm leading-relaxed text-slate-dim">{dest.description}</p>
      {dest.id === 'missions' && (
        <div className="mt-4 space-y-2">
          <button type="button" onClick={() => setPanel({ type: 'mission', projectId: 'hostelresolve' })}
            className="flex w-full items-center gap-2 rounded-lg border border-parchment/20 px-4 py-2.5 text-sm font-semibold text-parchment transition hover:border-lantern hover:text-lantern">
            <MapPin size={14} /> Briefing: HostelResolve
          </button>
          <button type="button" onClick={() => setPanel({ type: 'mission', projectId: 'hostmate' })}
            className="flex w-full items-center gap-2 rounded-lg border border-parchment/20 px-4 py-2.5 text-sm font-semibold text-parchment transition hover:border-lantern hover:text-lantern">
            <MapPin size={14} /> Briefing: Hostmate
          </button>
        </div>
      )}
      {dest.id === 'summit' && (
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={profile.resumePath} target="_blank" rel="noopener noreferrer"
            className="rounded-lg bg-lantern px-4 py-2 text-sm font-bold text-ink-2 hover:brightness-110">Resume (PDF)</a>
          <button type="button" onClick={() => { onClose(); setMode('portfolio'); }}
            className="rounded-lg border border-parchment/25 px-4 py-2 text-sm font-semibold text-parchment hover:border-lantern hover:text-lantern">
            Contact details
          </button>
        </div>
      )}
      {dest.id !== 'missions' && dest.id !== 'summit' && (
        <p className="mt-4 text-xs text-slate-dim">
          Counterpart in Portfolio mode: {destinations.find((d) => d.id === dest.id)?.sectionId} section.
        </p>
      )}
    </Shell>
  );
};

const Panels = () => {
  const { panel, setPanel } = useGame();
  if (!panel) return null;
  const close = (): void => setPanel(null);
  if (panel.type === 'mission') return <MissionPanel projectId={panel.projectId} onClose={close} />;
  if (panel.type === 'station') return <StationPanel stationId={panel.stationId} onClose={close} />;
  return <DestinationPanel destId={panel.destId} onClose={close} />;
};

export default Panels;
